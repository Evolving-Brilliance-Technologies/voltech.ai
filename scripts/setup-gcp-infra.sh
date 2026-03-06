#!/bin/bash
# =============================================================================
# GCP Infrastructure Setup Script for voltech.ai
# =============================================================================
# Run ONCE to provision all required GCP resources for dev + staging.
#
# Usage:
#   chmod +x scripts/setup-gcp-infra.sh
#   ./scripts/setup-gcp-infra.sh
#
# Prerequisites:
#   - gcloud CLI installed and authenticated (`gcloud auth login`)
#   - A GCP project already created
#   - Billing enabled on the project
# =============================================================================

set -euo pipefail

# =============================================================================
# ── CONFIGURATION  ────────────────────────────────────────────────────────────
# Edit these values before running the script.
# =============================================================================
PROJECT_ID="voltechai"           # Your GCP project ID
REGION="asia-southeast1"          # Primary region (Singapore — close to MY/ID)
GITHUB_OWNER="Evolving-Brilliance-Technologies"
GITHUB_REPO="voltech.ai"

# Random suffix added to globally-unique resource names (bucket, SQL instance)
# Use a short fixed hash so the names stay stable across re-runs.
SUFFIX=$(echo -n "$PROJECT_ID" | md5sum | cut -c1-7)

# Cloud SQL instance names (one per env)
SQL_INSTANCE_DEV="voltech-sql-dev-${SUFFIX}"
SQL_INSTANCE_STAGING="voltech-sql-staging-${SUFFIX}"

# Cloud Storage bucket names
BUCKET_DEV="voltech-storage-dev-${SUFFIX}"
BUCKET_STAGING="voltech-storage-staging-${SUFFIX}"

# Artifact Registry repositories (one per env)
REPO_DEV="app-services-dev"
REPO_STAGING="app-services-staging"

# Service account names
SA_BACKEND_DEV="backend-sa-dev"
SA_BACKEND_STAGING="backend-sa-staging"
SA_CLOUDBUILD="cloudbuild-deployer"

ENVS=("dev" "staging")

# =============================================================================
# ── HELPERS  ──────────────────────────────────────────────────────────────────
# =============================================================================
log()  { echo -e "\n\033[1;34m[INFO]\033[0m $*"; }
ok()   { echo -e "\033[1;32m[OK]\033[0m $*"; }
warn() { echo -e "\033[1;33m[WARN]\033[0m $*"; }

# =============================================================================
# ── STEP 0: Set project  ──────────────────────────────────────────────────────
# =============================================================================
log "Setting active project to: $PROJECT_ID"
gcloud config set project "$PROJECT_ID"

PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format="value(projectNumber)")
log "Project number: $PROJECT_NUMBER"

# =============================================================================
# ── STEP 1: Enable required APIs  ─────────────────────────────────────────────
# =============================================================================
log "Step 1 — Enabling required GCP APIs..."
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  artifactregistry.googleapis.com \
  storage.googleapis.com \
  iam.googleapis.com \
  cloudresourcemanager.googleapis.com \
  --project="$PROJECT_ID"
ok "APIs enabled."

# =============================================================================
# ── STEP 2: Artifact Registry Repositories  ───────────────────────────────────
# =============================================================================
log "Step 2 — Creating Artifact Registry Docker repositories..."
for REPO in "$REPO_DEV" "$REPO_STAGING"; do
  if gcloud artifacts repositories describe "$REPO" \
      --location="$REGION" --project="$PROJECT_ID" &>/dev/null; then
    warn "Repository '$REPO' already exists — skipping."
  else
    gcloud artifacts repositories create "$REPO" \
      --repository-format=docker \
      --location="$REGION" \
      --description="voltech.ai Docker images — ${REPO}" \
      --project="$PROJECT_ID"
    ok "Created repository: $REPO"
  fi
done

# =============================================================================
# ── STEP 3: Cloud SQL Instances (PostgreSQL 16)  ──────────────────────────────
# =============================================================================
log "Step 3 — Creating Cloud SQL instances..."

create_sql_instance() {
  local INSTANCE_NAME="$1"
  local ENV="$2"

  if gcloud sql instances describe "$INSTANCE_NAME" --project="$PROJECT_ID" &>/dev/null; then
    warn "SQL instance '$INSTANCE_NAME' already exists — skipping."
  else
    log "Creating SQL instance: $INSTANCE_NAME (this may take ~5 minutes)..."
    gcloud sql instances create "$INSTANCE_NAME" \
      --database-version=POSTGRES_16 \
      --edition=ENTERPRISE \
      --tier=db-custom-1-3840 \
      --region="$REGION" \
      --storage-type=SSD \
      --storage-size=10GB \
      --storage-auto-increase \
      --no-backup \
      --project="$PROJECT_ID"
    ok "Created SQL instance: $INSTANCE_NAME"
  fi

  # Create the application database
  if gcloud sql databases describe "app_${ENV}" \
      --instance="$INSTANCE_NAME" --project="$PROJECT_ID" &>/dev/null; then
    warn "Database 'app_${ENV}' already exists — skipping."
  else
    gcloud sql databases create "app_${ENV}" \
      --instance="$INSTANCE_NAME" \
      --project="$PROJECT_ID"
    ok "Created database: app_${ENV} on $INSTANCE_NAME"
  fi
}

create_sql_instance "$SQL_INSTANCE_DEV"     "dev"
create_sql_instance "$SQL_INSTANCE_STAGING" "staging"

# =============================================================================
# ── STEP 4: Cloud Storage Buckets  ────────────────────────────────────────────
# =============================================================================
log "Step 4 — Creating Cloud Storage buckets..."
for ENV in "${ENVS[@]}"; do
  if [ "$ENV" == "dev" ]; then
    BUCKET_NAME="$BUCKET_DEV"
  else
    BUCKET_NAME="$BUCKET_STAGING"
  fi

  if gsutil ls -b "gs://$BUCKET_NAME" &>/dev/null; then
    warn "Bucket 'gs://$BUCKET_NAME' already exists — skipping."
  else
    gsutil mb -p "$PROJECT_ID" -l "$REGION" "gs://$BUCKET_NAME"
    # Enable uniform bucket-level access
    gsutil uniformbucketlevelaccess set on "gs://$BUCKET_NAME"
    ok "Created bucket: gs://$BUCKET_NAME"
  fi
done

# =============================================================================
# ── STEP 5: Secret Manager — create secret stubs  ─────────────────────────────
# =============================================================================
log "Step 5 — Creating Secret Manager secrets..."

# Secrets to create per environment
create_secret() {
  local SECRET_NAME="$1"
  if gcloud secrets describe "$SECRET_NAME" --project="$PROJECT_ID" &>/dev/null; then
    warn "Secret '$SECRET_NAME' already exists — skipping."
  else
    gcloud secrets create "$SECRET_NAME" \
      --replication-policy=user-managed \
      --locations="$REGION" \
      --project="$PROJECT_ID"
    ok "Created secret: $SECRET_NAME"
    warn "⚠  SECRET '$SECRET_NAME' has no version yet — add a value with:"
    echo "    echo -n 'YOUR_VALUE' | gcloud secrets versions add $SECRET_NAME --data-file=-"
  fi
}

for ENV in "${ENVS[@]}"; do
  log "  Creating secrets for ENV=$ENV ..."
  create_secret "${ENV}-postgres-password"
  create_secret "${ENV}-secret-key"
  create_secret "${ENV}-first-superuser-password"
  create_secret "${ENV}-smtp-user"
  create_secret "${ENV}-smtp-password"
done

# =============================================================================
# ── STEP 6: Service Accounts  ─────────────────────────────────────────────────
# =============================================================================
log "Step 6 — Creating service accounts..."

create_sa() {
  local SA_NAME="$1"
  local DISPLAY_NAME="$2"
  local SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

  if gcloud iam service-accounts describe "$SA_EMAIL" --project="$PROJECT_ID" &>/dev/null; then
    warn "Service account '$SA_NAME' already exists — skipping."
  else
    gcloud iam service-accounts create "$SA_NAME" \
      --display-name="$DISPLAY_NAME" \
      --project="$PROJECT_ID"
    ok "Created service account: $SA_EMAIL"
  fi
}

create_sa "$SA_BACKEND_DEV"     "voltech Backend — Dev"
create_sa "$SA_BACKEND_STAGING" "voltech Backend — Staging"
create_sa "$SA_CLOUDBUILD"      "Cloud Build Deployment SA"

# =============================================================================
# ── STEP 7: IAM Bindings for Backend Service Accounts  ────────────────────────
# =============================================================================
log "Step 7 — Granting IAM roles to backend service accounts..."

grant_role() {
  local MEMBER="$1"
  local ROLE="$2"
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="$MEMBER" \
    --role="$ROLE" \
    --quiet
}

for ENV in "${ENVS[@]}"; do
  if [ "$ENV" == "dev" ]; then
    SA_NAME="$SA_BACKEND_DEV"
  else
    SA_NAME="$SA_BACKEND_STAGING"
  fi
  SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
  MEMBER="serviceAccount:$SA_EMAIL"

  log "  Granting roles to $SA_EMAIL ..."
  grant_role "$MEMBER" "roles/cloudsql.client"
  grant_role "$MEMBER" "roles/secretmanager.secretAccessor"
  grant_role "$MEMBER" "roles/storage.objectAdmin"
done

# =============================================================================
# ── STEP 8: IAM Bindings for the Cloud Build SA  ──────────────────────────────
# =============================================================================
log "Step 8 — Granting IAM roles to Cloud Build service accounts..."

CLOUDBUILD_SA_EMAIL="${SA_CLOUDBUILD}@${PROJECT_ID}.iam.gserviceaccount.com"
DEFAULT_CLOUDBUILD_SA="${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com"

# Custom Cloud Build deployer SA
for ROLE in \
  "roles/run.admin" \
  "roles/iam.serviceAccountUser" \
  "roles/secretmanager.secretAccessor" \
  "roles/artifactregistry.writer" \
  "roles/storage.admin"; do
  grant_role "serviceAccount:$CLOUDBUILD_SA_EMAIL" "$ROLE"
done

# Default Cloud Build SA also needs access to push images
for ROLE in \
  "roles/run.admin" \
  "roles/iam.serviceAccountUser" \
  "roles/secretmanager.secretAccessor" \
  "roles/artifactregistry.writer"; do
  grant_role "serviceAccount:$DEFAULT_CLOUDBUILD_SA" "$ROLE"
done

ok "IAM bindings applied."

# =============================================================================
# ── STEP 9: Configure Docker auth for Artifact Registry  ──────────────────────
# =============================================================================
log "Step 9 — Configuring Docker auth for Artifact Registry..."
gcloud auth configure-docker "${REGION}-docker.pkg.dev" --quiet
ok "Docker auth configured."

# =============================================================================
# ── STEP 10: Print Summary  ───────────────────────────────────────────────────
# =============================================================================
echo ""
echo "════════════════════════════════════════════════════════════════"
echo "  ✅  GCP Infrastructure Setup Complete for: $PROJECT_ID"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "  Artifact Registry:"
echo "    DEV     → ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_DEV}"
echo "    STAGING → ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_STAGING}"
echo ""
echo "  Cloud SQL Instances:"
echo "    DEV     → ${PROJECT_ID}:${REGION}:${SQL_INSTANCE_DEV}"
echo "    STAGING → ${PROJECT_ID}:${REGION}:${SQL_INSTANCE_STAGING}"
echo ""
echo "  Cloud Storage Buckets:"
echo "    DEV     → gs://${BUCKET_DEV}"
echo "    STAGING → gs://${BUCKET_STAGING}"
echo ""
echo "  Service Accounts:"
echo "    Backend DEV     → ${SA_BACKEND_DEV}@${PROJECT_ID}.iam.gserviceaccount.com"
echo "    Backend STAGING → ${SA_BACKEND_STAGING}@${PROJECT_ID}.iam.gserviceaccount.com"
echo ""
echo "  ⚠  IMPORTANT — Next Steps:"
echo "    1. Populate secrets in Secret Manager (postgres-password, secret-key, etc.)"
echo "    2. Set the postgres user password on each SQL instance:"
echo "       gcloud sql users set-password postgres --instance=${SQL_INSTANCE_DEV} \\"
echo "         --password=YOUR_PASS --project=${PROJECT_ID}"
echo "    3. Run: ./scripts/setup-cloudbuild-triggers.sh"
echo "════════════════════════════════════════════════════════════════"
