# VLN Documentation Webhook Integration

This guide explains how to use the VLN Documentation Webhook API to trigger automatic documentation updates and deployments.

## Overview

The documentation webhook system allows external repositories (like PeraltaCC) to send versioned documentation updates to VLN. The webhook:

1. Receives documentation metadata from an external source
2. Triggers a GitHub Actions workflow to fetch content from the source repository
3. Updates the appropriate documentation section (e.g., `/peralta`)
4. Automatically builds and deploys the updated documentation

## Webhook Endpoint

**URL:** `POST https://vln.gg/api/webhooks/docs`

**Purpose:** Trigger documentation section updates with version control

### Authentication

```
Authorization: Bearer <DOCS_WEBHOOK_TOKEN>
Content-Type: application/json
```

The `DOCS_WEBHOOK_TOKEN` is a secure Bearer token that must be included in every request.

## Request Payload

```json
{
  "title": "PeraltaCC Documentation v1.2.0",
  "message": "New version of PeraltaCC documentation released",
  "type": "success",
  "metadata": {
    "version": "1.2.0",
    "component": "peraltacc",
    "github_repo": "Fused-Gaming/PeraltaCC",
    "github_ref": "refs/tags/v1.2.0",
    "docs_path": "docs/guides",
    "target_section": "peralta"
  }
}
```

### Payload Fields

**Required Fields:**
- `title` (string): Human-readable title for the notification
- `message` (string): Detailed message about the update
- `type` (string): Type of notification (`success`, `error`, `warning`, `info`)
- `metadata` (object): Update metadata with the following required subfields:
  - `version` (string): Semantic version number (e.g., `1.2.0`, `v1.0.0`)
  - `component` (string): Component identifier (e.g., `peraltacc`, `audit-sdk`)
  - `github_repo` (string): Source GitHub repository (e.g., `Fused-Gaming/PeraltaCC`)
  - `github_ref` (string): Git ref to fetch from (e.g., `refs/tags/v1.2.0`, `main`, `develop`)
  - `docs_path` (string): Path within repo containing documentation (e.g., `docs/guides`, `docs/addendum`)
  - `target_section` (string): Target section in VLN docs (e.g., `peralta`, `addendum`, `audit-guide`)

## Response

### Success (200 OK)

```json
{
  "success": true,
  "message": "Docs build triggered",
  "version": "1.2.0",
  "section": "peralta",
  "component": "peraltacc"
}
```

### Errors

| Status | Error | Cause |
|--------|-------|-------|
| 400 | Missing required metadata fields | Invalid or incomplete payload |
| 401 | Missing or invalid Authorization header | No Bearer token provided |
| 403 | Invalid API token | Incorrect DOCS_WEBHOOK_TOKEN |
| 500 | Failed to trigger docs build | GitHub Actions workflow error |
| 503 | Docs webhook not configured | Missing DOCS_WEBHOOK_TOKEN env var |

## Workflow Behavior

When a successful webhook is received, the `update-docs-section.yml` GitHub Actions workflow is triggered with the following process:

1. **Checkout VLN Repository** - Prepares the target repository
2. **Checkout Source Repository** - Fetches the source documentation from the specified repository and ref
3. **Verify Source Directory** - Ensures the specified `docs_path` exists in the source repository
4. **Prepare Target Directory** - Creates the target section directory in VLN docs
5. **Copy Documentation Files** - Copies all markdown files from source to target section
6. **Generate Metadata** - Creates version and source metadata files
7. **Validate Documentation** - Ensures markdown files were copied successfully
8. **Commit Changes** - Commits the documentation update to `integration/vln` branch
9. **Push Changes** - Pushes to the integration branch to trigger the build
10. **Send Notification** - Sends a Telegram notification with deployment status

## Usage Examples

### From PeraltaCC

When PeraltaCC releases a new version, send:

```bash
curl -X POST https://vln.gg/api/webhooks/docs \
  -H "Authorization: Bearer $DOCS_WEBHOOK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "PeraltaCC Documentation v1.2.0",
    "message": "Updated guides and API documentation",
    "type": "success",
    "metadata": {
      "version": "1.2.0",
      "component": "peraltacc",
      "github_repo": "Fused-Gaming/PeraltaCC",
      "github_ref": "refs/tags/v1.2.0",
      "docs_path": "docs/guides",
      "target_section": "peralta"
    }
  }'
```

### From Release Event

In GitHub Actions (`.github/workflows/release.yml`):

```yaml
- name: Notify VLN Documentation Webhook
  run: |
    curl -X POST https://vln.gg/api/webhooks/docs \
      -H "Authorization: Bearer ${{ secrets.VLN_DOCS_WEBHOOK_TOKEN }}" \
      -H "Content-Type: application/json" \
      -d '{
        "title": "Release ${{ github.event.release.tag_name }}",
        "message": "${{ github.event.release.body }}",
        "type": "success",
        "metadata": {
          "version": "${{ github.event.release.tag_name }}",
          "component": "my-component",
          "github_repo": "${{ github.repository }}",
          "github_ref": "${{ github.ref }}",
          "docs_path": "docs",
          "target_section": "my-section"
        }
      }'
```

## Health Check

**Endpoint:** `GET https://vln.gg/api/webhooks/docs`

**Response:**

```json
{
  "status": "ok",
  "service": "docs-webhook",
  "configured": true,
  "timestamp": "2026-05-11T16:44:00Z"
}
```

The `configured` field indicates whether the webhook service has the required environment variables set.

## Environment Configuration

### On VLN Server

```bash
# Required environment variable
DOCS_WEBHOOK_TOKEN=<secure-random-token>

# GitHub token (already exists)
GITHUB_TOKEN=<github-pat-token>

# Telegram notification (optional)
TELEGRAM_API_TOKEN=<telegram-api-token>
TELEGRAM_NOTIFICATION_API_URL=https://vln.gg/api/notifications/telegram
```

### On Source Repository (PeraltaCC)

```bash
# Store in repository secrets
VLN_DOCS_WEBHOOK_URL=https://vln.gg/api/webhooks/docs
VLN_DOCS_WEBHOOK_TOKEN=<obtained-from-vln-team>
```

## Best Practices

### Version Management

- Use semantic versioning (e.g., `1.2.0`, `1.0.0-beta`)
- Use git tags in the `github_ref` field (e.g., `refs/tags/v1.2.0`)
- Ensure docs are consistent with released version

### Documentation Structure

- Place all documentation in a single directory (`docs_path`)
- Use descriptive filenames (e.g., `getting-started.md`, `api-reference.md`)
- Include a `README.md` or `index.md` as the entry point

### Security

- Treat `DOCS_WEBHOOK_TOKEN` as a sensitive credential
- Store in CI/CD secrets manager
- Rotate token every 90 days
- Use HTTPS for all requests
- Verify webhook signatures when possible (future enhancement)

### Error Handling

When sending from CI/CD, use `continue-on-error: true` to prevent build failures:

```yaml
- name: Notify VLN Documentation
  run: curl ...
  continue-on-error: true
```

## Monitoring

View webhook activity and deployments:

1. Check GitHub Actions workflow runs: https://github.com/fused-gaming/vln/actions/workflows/update-docs-section.yml
2. Monitor Telegram notifications in the VLN notification channel
3. Verify documentation updates at https://docs.vln.gg/peralta

## Support

For issues or questions:

1. **Verify Configuration:** Check that `DOCS_WEBHOOK_TOKEN` is set on VLN server
2. **Test Endpoint:** Call the health check endpoint to verify service status
3. **Check Logs:** Review GitHub Actions workflow logs for detailed error messages
4. **Contact:** Reach out to the VLN security team with request and response details

## Integration Checklist

- [ ] Obtain `DOCS_WEBHOOK_TOKEN` from VLN security team
- [ ] Store in source repository secrets (as `VLN_DOCS_WEBHOOK_TOKEN`)
- [ ] Create release workflow that calls the webhook
- [ ] Test webhook with manual dispatch first
- [ ] Monitor first few automatic deployments
- [ ] Verify documentation appears at correct section URL
- [ ] Set up Telegram notifications for deployment status
