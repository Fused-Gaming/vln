---
title: PeraltaCC Deployment Guide
description: Installation, setup, and deployment procedures for PeraltaCC
---

# PeraltaCC Deployment Guide

Complete guide to installing, configuring, and deploying PeraltaCC for development, staging, and production environments.

## Deployment Paths

Choose your deployment environment:

### 1. Local Development
**Best for:** Feature development, testing, debugging  
**Time:** 5 minutes  
**Complexity:** Low

### 2. Feature Branch (Staging)
**Best for:** Proposal development, GitBook integration testing  
**Time:** 10 minutes  
**Complexity:** Low

### 3. Production (Main)
**Best for:** Final proposal submission, distribution  
**Time:** 15 minutes  
**Complexity:** Medium

## Pre-Deployment Checklist

Before starting deployment, verify:

### System Requirements
- [ ] Node.js 18.0.0 or higher installed
- [ ] npm 8.0.0 or higher installed
- [ ] Git installed and configured
- [ ] GitHub access configured
- [ ] 500MB free disk space

### Access & Permissions
- [ ] Repository clone access
- [ ] GitHub branch creation permission
- [ ] GitBook workspace access (if using documentation)
- [ ] npm package permissions

### Configuration
- [ ] `.npmignore` configured correctly
- [ ] Environment variables defined
- [ ] GitHub Actions workflows configured
- [ ] GitBook Git Sync settings ready

## Installation Steps

### Step 1: Clone Repository

```bash
# Clone the PeraltaCC repository
git clone https://github.com/Fused-Gaming/PeraltaCC.git
cd PeraltaCC

# Verify you're on the correct branch
git branch -a
```

### Step 2: Install Dependencies

```bash
# Install npm packages
npm install

# Verify installation
npm list --depth=0
```

### Step 3: Development Setup

```bash
# Create feature branch for your work
git checkout -b feature/your-feature-name

# Verify development setup
npm test
npm run lint
```

## Development Workflow

### Start Development Server

```bash
# Start the application
npm start

# Expected output:
# > PeraltaCC@1.0.0 start
# > node src/index.js
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Staging Deployment (Feature Branch)

### Feature Branch Workflow

```bash
# Create and switch to feature branch
git checkout -b feature/your-proposal

# Make your changes
git add .
git commit -m "feat: your proposal description"

# Push to remote
git push -u origin feature/your-proposal
```

### GitHub Actions Validation

The repository automatically runs:
1. Linting checks
2. Unit tests
3. Documentation validation
4. Quality gates

**View results:**
- GitHub Actions tab → Select your workflow
- Review test results and logs

### GitBook Integration (Optional)

```bash
# If using GitBook Git Sync:
# 1. Push changes to feature/gitbook branch
git checkout -b feature/gitbook
git push -u origin feature/gitbook

# 2. GitBook automatically syncs
# 3. Review at: https://your-gitbook-space.gitbook.io

# 4. Make edits in GitBook web editor
# 5. Sync back to repository (automatic)
```

## Production Deployment

### Merge to Main

```bash
# Switch to main branch
git checkout main
git pull origin main

# Merge feature branch (via PR recommended)
git merge feature/your-proposal

# Push to production
git push origin main
```

### Quality Gate Validation

Before production merge, ensure:
- ✅ All tests passing
- ✅ Linting checks passed
- ✅ Documentation complete
- ✅ All tasks (1-6) completed
- ✅ Certifications attached
- ✅ Review approvals received

### PDF Generation & Distribution

```bash
# Generate PDF export (if GitBook connected)
# 1. Go to GitBook space
# 2. Share menu → PDF export
# 3. Download and distribute

# Or use Vercel (if configured)
# Preview URL: https://your-vercel-domain.vercel.app
```

## Environment Configuration

### Environment Variables

Create `.env` file in project root:

```bash
# Development
NODE_ENV=development
DEBUG=true
LOG_LEVEL=debug

# Production
NODE_ENV=production
DEBUG=false
LOG_LEVEL=error

# Claude Flow (if using API)
CLAUDE_FLOW_API_KEY=your_api_key
CLAUDE_FLOW_ENDPOINT=https://api.claude-flow.example.com

# GitBook (optional)
GITBOOK_SPACE_ID=your_space_id
GITBOOK_API_KEY=your_gitbook_api_key
```

### Package Configuration

Edit `package.json` scripts as needed:

```json
{
  "scripts": {
    "start": "node src/index.js",
    "test": "jest",
    "lint": "eslint .",
    "format": "prettier --write .",
    "build": "npm run lint && npm run test",
    "pretest": "npm run lint",
    "posttest": "npm run format"
  }
}
```

## Post-Deployment Validation

### Verify Installation

```bash
# Check all dependencies installed
npm list --depth=0

# Verify key files present
ls -la docs/addendum-bid/
ls -la docs/gitbook/

# Check configuration
cat package.json | grep version
```

### Test Functionality

```bash
# Run tests
npm test

# Check documentation builds
npm run docs:build

# Verify quality gates
npm run validate
```

### Manual Verification

- [ ] Application starts without errors
- [ ] All tests pass
- [ ] Linting issues resolved
- [ ] Documentation accessible
- [ ] GitBook sync working (if configured)
- [ ] GitHub Actions passing
- [ ] Proposal artifacts present

## Troubleshooting

### Dependency Issues

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Permission Errors

```bash
# Fix permission issues on macOS/Linux
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER .

# Or use npm ci instead of npm install
npm ci
```

### Git Sync Issues (GitBook)

```bash
# Check Git status
git status
git log --oneline -5

# If sync is stuck, reset to remote
git fetch origin
git reset --hard origin/feature/gitbook
```

### Test Failures

```bash
# Run tests with verbose output
npm test -- --verbose

# Run specific test file
npm test -- path/to/test.js

# Update snapshots if needed
npm test -- -u
```

## Scaling & Advanced Deployment

### Docker Deployment (Optional)

If you need containerization:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t peraltacc:latest .
docker run -p 3000:3000 peraltacc:latest
```

### Vercel Deployment (Optional)

If using Vercel for static docs:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Continuous Deployment

GitHub Actions automatically:
- Runs tests on every push
- Generates documentation
- Creates preview builds
- Validates quality gates
- Updates GitBook (if configured)

## Rollback Procedures

### Quick Rollback

```bash
# If something breaks on main
git revert HEAD
git push origin main
```

### Full Rollback to Previous Version

```bash
# Find previous commit
git log --oneline -10

# Reset to previous state
git reset --hard commit-hash
git push origin main --force-with-lease
```

## Next Steps

1. **Complete Installation** - Follow the Installation Steps above
2. **Create Feature Branch** - Start your proposal work
3. **Run Tests** - Ensure everything works: `npm test`
4. **Make Changes** - Develop your proposals and deliverables
5. **Submit PR** - Create pull request with quality gates passing
6. **Merge to Main** - Final submission to production

## Support

For deployment issues:
- Check GitHub Actions logs
- Review error messages carefully
- Verify all prerequisites met
- Check documentation
- Open a GitHub issue with details
