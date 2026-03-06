#!/bin/bash
# =============================================================================
# Populate GCP Secret Manager with real values for voltech.ai
# =============================================================================
# Run AFTER setup-gcp-infra.sh.
# Generates strong random secrets for both dev and staging environments.
#
# Cloud Storage: On Cloud Run, the backend service account authenticates to
# GCS automatically via Application Default Credentials (ADC). No keys needed.
# MinIO is only used for local/VM deployments.
#
# Usage:
#   chmod +x scripts/populate-secrets.sh
#   ./scripts/populate-secrets.sh
# =============================================================================

set -euo pipefail

PROJECT_ID="voltechai"
REGION="asia-southeast1"

log()  { echo -e "\n\033[1;34m[INFO]\033[0m $*"; }
ok()   { echo -e "\033[1;32m[OK]\033[0m $*"; }
warn() { echo -e "\033[1;33m[WARN]\033[0m $*"; }

gcloud config set project "$PROJECT_ID" --quiet

# Helper: add a secret version
add_secret() {
  local SECRET_NAME="$1"
  local VALUE="$2"
  echo -n "$VALUE" | gcloud secrets versions add "$SECRET_NAME" \
    --data-file=- --project="$PROJECT_ID" --quiet
  ok "Populated: $SECRET_NAME"
}

# =============================================================================
# Generate random values
# =============================================================================
log "Generating random secrets..."

DEV_POSTGRES_PASS=$(openssl rand -base64 32 | tr -dc 'a-zA-Z0-9' | head -c 32)
DEV_SECRET_KEY=$(openssl rand -hex 32)
DEV_SUPERUSER_PASS=$(openssl rand -base64 24 | tr -dc 'a-zA-Z0-9' | head -c 24)

STAGING_POSTGRES_PASS=$(openssl rand -base64 32 | tr -dc 'a-zA-Z0-9' | head -c 32)
STAGING_SECRET_KEY=$(openssl rand -hex 32)
STAGING_SUPERUSER_PASS=$(openssl rand -base64 24 | tr -dc 'a-zA-Z0-9' | head -c 24)

ok "Random values generated."

# =============================================================================
# Set Postgres user passwords on the Cloud SQL instances
# =============================================================================
log "Setting Postgres user passwords on Cloud SQL instances..."

SUFFIX=$(echo -n "$PROJECT_ID" | md5sum | cut -c1-7)

gcloud sql users set-password postgres \
  --instance="voltech-sql-dev-${SUFFIX}" \
  --password="$DEV_POSTGRES_PASS" \
  --project="$PROJECT_ID"
ok "Set postgres password on voltech-sql-dev-${SUFFIX}"

gcloud sql users set-password postgres \
  --instance="voltech-sql-staging-${SUFFIX}" \
  --password="$STAGING_POSTGRES_PASS" \
  --project="$PROJECT_ID"
ok "Set postgres password on voltech-sql-staging-${SUFFIX}"

# =============================================================================
# Populate DEV secrets
# NOTE: No storage keys needed — backend-sa-dev uses ADC on Cloud Run.
# =============================================================================
log "Populating DEV secrets in Secret Manager..."

add_secret "dev-postgres-password"        "$DEV_POSTGRES_PASS"
add_secret "dev-secret-key"               "$DEV_SECRET_KEY"
add_secret "dev-first-superuser-password" "$DEV_SUPERUSER_PASS"
add_secret "dev-smtp-user"                "update-me@voltech.ai"
add_secret "dev-smtp-password"            "update-me-smtp-password"

# =============================================================================
# Populate STAGING secrets
# =============================================================================
log "Populating STAGING secrets in Secret Manager..."

add_secret "staging-postgres-password"        "$STAGING_POSTGRES_PASS"
add_secret "staging-secret-key"               "$STAGING_SECRET_KEY"
add_secret "staging-first-superuser-password" "$STAGING_SUPERUSER_PASS"
add_secret "staging-smtp-user"                "update-me@voltech.ai"
add_secret "staging-smtp-password"            "update-me-smtp-password"

# =============================================================================
# Save generated values locally for reference — gitignored, keep private
# =============================================================================
CREDS_FILE=".gcp-secrets-reference.local"
cat > "$CREDS_FILE" << CREDSEOF
# =============================================================================
# GENERATED SECRETS REFERENCE — voltech.ai
# Generated: $(date)
# ❌ DO NOT COMMIT THIS FILE — it is gitignored
# =============================================================================

## DEV
dev-postgres-password:        ${DEV_POSTGRES_PASS}
dev-secret-key:               ${DEV_SECRET_KEY}
dev-first-superuser-password: ${DEV_SUPERUSER_PASS}

## STAGING
staging-postgres-password:        ${STAGING_POSTGRES_PASS}
staging-secret-key:               ${STAGING_SECRET_KEY}
staging-first-superuser-password: ${STAGING_SUPERUSER_PASS}

## Admin login (first superuser)
Email:          admin@voltech.ai
DEV password:   ${DEV_SUPERUSER_PASS}
STAGING password: ${STAGING_SUPERUSER_PASS}

## Cloud Storage
# No credentials needed — backend uses Application Default Credentials (ADC)
# on Cloud Run via the assigned service account:
#   DEV:     backend-sa-dev@voltechai.iam.gserviceaccount.com
#   STAGING: backend-sa-staging@voltechai.iam.gserviceaccount.com
CREDSEOF

ok "Saved credentials reference to: $CREDS_FILE (gitignored — keep private)"

# =============================================================================
# Summary
# =============================================================================
echo ""
echo "════════════════════════════════════════════════════════════════"
echo "  ✅  Secrets Populated Successfully!"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "  DEV admin login:"
echo "    Email:    admin@voltech.ai"
echo "    Password: ${DEV_SUPERUSER_PASS}"
echo ""
echo "  STAGING admin login:"
echo "    Email:    admin@voltech.ai"
echo "    Password: ${STAGING_SUPERUSER_PASS}"
echo ""
echo "  🗂  Cloud Storage: No credentials needed."
echo "     backend-sa-dev / backend-sa-staging authenticate automatically via ADC."
echo ""
echo "  ⚠  Update SMTP secrets when you have real credentials:"
echo "     echo -n 'real-user'     | gcloud secrets versions add dev-smtp-user --data-file=-"
echo "     echo -n 'real-password' | gcloud secrets versions add dev-smtp-password --data-file=-"
echo ""
echo "  Next: ./scripts/setup-cloudbuild-triggers.sh"
echo "════════════════════════════════════════════════════════════════"
