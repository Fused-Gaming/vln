# Claude Code Session Configuration

This directory manages Claude Code session settings and local documentation.

## Subdirectories

- **sessions/** - Session state and context (git-ignored)
- **local-docs/** - Local document repository for VLN documentation
- **configs/** - Configuration files for Claude sessions

## Local Documents

Place the following documents in `local-docs/` for Claude to reference:

- VLN-SYSTEM-PROMPT.md
- VLN-MASTER-SUMMARY.md
- VLN-IMPLEMENTATION-GUIDE.md
- VLN-QUICK-REFERENCE.txt
- vln-deploy.sh
- README.md

These will be available for Claude to read while working on the project.
