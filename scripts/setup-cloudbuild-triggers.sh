#!/bin/bash
# =============================================================================
# Cloud Build Triggers Setup Script for voltech.ai
# =============================================================================
# Run AFTER setup-gcp-infra.sh.
# Creates two Cloud Build triggers — one for 'dev', one for 'staging' branch.
#
# Usage:
#   chmod +x scripts/setup-cloudbuild-triggers.sh
#   ./scripts/setup-cloudbuild-triggers.sh
#
# Prerequisites:
#   - GitHub repository already connected to Cloud Build in the GCP Console:
#     https://console.cloud.google.com/cloud-build/triggers/connect
# =============================================================================

set -euo pipefail

# =============================================================================
# ── CONFIGURATION  ────────────────────────────────────────────────────────────
# =============================================================================
PROJECT_ID="voltechai"
REGION="asia-southeast1"
GITHUB_OWNER="Evolving-Brilliance-Technologies"
GITHUB_REPO="voltech.ai"

# =============================================================================
# ── HELPERS  ──────────────────────────────────────────────────────────────────
# =============================================================================
log()  { echo -e "\n\033[1;34m[INFO]\033[0m $*"; }
ok()   { echo -e "\033[1;32m[OK]\033[0m $*"; }
warn() { echo -e "\033[1;33m[WARN]\033[0m $*"; }

gcloud config set project "$PROJECT_ID"

# =============================================================================
# ── STEP 1: Verify GitHub Connection  ─────────────────────────────────────────
# =============================================================================
log "Step 1 — Verifying GitHub connection to Cloud Build..."
echo ""
echo "  ⚠  MANUAL STEP REQUIRED (first time only):"
echo "     If you haven't connected GitHub yet, open the URL below in your browser:"
echo "     https://console.cloud.google.com/cloud-build/triggers/connect?project=${PROJECT_ID}"
echo "     → Choose 'GitHub (Cloud Build GitHub App)'"
echo "     → Authorize and select repo: ${GITHUB_OWNER}/${GITHUB_REPO}"
echo ""
read -rp "  Have you connected GitHub to Cloud Build? (y/n): " github_connected
if [[ "$github_connected" != "y" ]]; then
  echo "  Please connect GitHub first, then re-run this script."
  exit 1
fi

# =============================================================================
# ── STEP 2: Delete existing triggers (idempotent re-run)  ─────────────────────
# =============================================================================
log "Step 2 — Cleaning up any pre-existing triggers with the same name..."

for TRIGGER_NAME in "voltech-dev-deploy" "voltech-staging-deploy"; do
  if gcloud builds triggers describe "$TRIGGER_NAME" \
      --region="$REGION" --project="$PROJECT_ID" &>/dev/null; then
    gcloud builds triggers delete "$TRIGGER_NAME" \
      --region="$REGION" --project="$PROJECT_ID" --quiet
    warn "Deleted existing trigger: $TRIGGER_NAME"
  fi
done

# =============================================================================
# ── STEP 3: Create Trigger — DEV branch  ──────────────────────────────────────
# =============================================================================
log "Step 3 — Creating Cloud Build trigger for DEV branch ('dev')..."
gcloud builds triggers create github \
  --name="voltech-dev-deploy" \
  --description="voltech.ai — Build & Deploy to DEV on push to 'dev' branch" \
  --repo-owner="$GITHUB_OWNER" \
  --repo-name="$GITHUB_REPO" \
  --branch-pattern="^dev$" \
  --build-config="cloudbuild.yaml" \
  --substitutions="_ENV=dev" \
  --region="$REGION" \
  --project="$PROJECT_ID"
ok "Created trigger: voltech-dev-deploy  (branch: dev)"

# =============================================================================
# ── STEP 4: Create Trigger — STAGING branch  ──────────────────────────────────
# =============================================================================
log "Step 4 — Creating Cloud Build trigger for STAGING branch ('staging')..."
gcloud builds triggers create github \
  --name="voltech-staging-deploy" \
  --description="voltech.ai — Build & Deploy to STAGING on push to 'staging' branch" \
  --repo-owner="$GITHUB_OWNER" \
  --repo-name="$GITHUB_REPO" \
  --branch-pattern="^staging$" \
  --build-config="cloudbuild.yaml" \
  --substitutions="_ENV=staging" \
  --region="$REGION" \
  --project="$PROJECT_ID"
ok "Created trigger: voltech-staging-deploy  (branch: staging)"

# =============================================================================
# ── STEP 5: Verify  ───────────────────────────────────────────────────────────
# =============================================================================
log "Step 5 — Listing triggers..."
gcloud builds triggers list --region="$REGION" --project="$PROJECT_ID"

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "  ✅  Cloud Build Triggers Setup Complete!"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "  Triggers created:"
echo "    voltech-dev-deploy     → triggers on push to 'dev'     branch"
echo "    voltech-staging-deploy → triggers on push to 'staging' branch"
echo ""
echo "  Both triggers use: cloudbuild.yaml at the repo root."
echo ""
echo "  View and manage triggers:"
echo "    https://console.cloud.google.com/cloud-build/triggers?project=${PROJECT_ID}"
echo "════════════════════════════════════════════════════════════════"
