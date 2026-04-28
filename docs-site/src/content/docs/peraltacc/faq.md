---
title: PeraltaCC FAQ & Troubleshooting
description: Frequently asked questions and troubleshooting guide for PeraltaCC
---

# PeraltaCC FAQ & Troubleshooting

Common questions about PeraltaCC installation, usage, and development.

## General Questions

### What is PeraltaCC?
PeraltaCC is a comprehensive platform for managing Peralta Community College redistricting initiatives and ERP automation, built with Claude Flow v3 for functional alignment across the district.

### What does PeraltaCC do?
PeraltaCC provides:
- Redistricting tools for district boundary planning
- ERP automation for business process workflows
- Proposal management for bid and deliverable tracking
- GitBook integration for professional documentation
- Quality gates and governance enforcement

### Is PeraltaCC open source?
PeraltaCC is maintained by Fused Gaming on GitHub. Check the LICENSE file for usage terms and restrictions.

### What are the main components?
- **Redistricting Engine** - Boundary planning and optimization
- **ERP Automation** - Workflow orchestration
- **Proposal Manager** - Bid and deliverable tracking
- **GitBook Sync** - Automated documentation
- **Workflow Orchestrator** - Claude Flow v3 automation

## Prerequisites & Setup

### Q: What tools do I need?
**A:** Required:
- Node.js >= 18.0.0
- npm >= 8.0.0
- Git
- Text editor or IDE

Optional:
- GitHub Desktop (for git operations)
- GitBook account (for documentation editing)
- Vercel account (for static hosting)

### Q: How do I install Node.js?

**macOS:**
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

**Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Windows:**
- Download from https://nodejs.org/
- Run the installer
- Restart your terminal

### Q: I get "command not found: node"
**A:** 
1. Verify installation: `node --version`
2. Add Node to PATH (check installation guide)
3. Restart terminal/IDE
4. Reinstall if needed

### Q: What's the difference between npm and Node.js?
**A:** 
- **Node.js** - JavaScript runtime that executes code
- **npm** - Package manager that installs dependencies
- Both are needed for PeraltaCC

## Installation & Setup

### Q: How long does installation take?
**A:** About 5-10 minutes depending on internet speed and system performance.

### Q: Do I need Docker to run PeraltaCC?
**A:** No. Docker is optional for advanced deployment scenarios. Standard npm installation works fine.

### Q: Can I run PeraltaCC on Windows?
**A:** Yes! Windows 10+ with WSL2 is recommended for best compatibility.

### Q: How much disk space does PeraltaCC need?
**A:** About 500MB after installation (depending on proposal artifacts).

## Development & Usage

### Q: How do I start development?

```bash
# 1. Clone repository
git clone https://github.com/Fused-Gaming/PeraltaCC.git
cd PeraltaCC

# 2. Install dependencies
npm install

# 3. Create feature branch
git checkout -b feature/my-proposal

# 4. Start development
npm start
```

### Q: How do I run tests?

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage
```

### Q: What's the difference between `main` and `feature/gitbook`?

**main branch:**
- Production-ready proposals
- Requires PR + approval
- Quality gates enforced
- Final deliverables

**feature/gitbook:**
- Documentation staging
- GitBook Git Sync target
- Allows direct editing
- Testing environment

**Feature branches:**
- Development work (`feature/*`, `fix/*`)
- Temporary branches
- Merged to main via PR

### Q: How do I create a proposal?

1. Create feature branch: `git checkout -b feature/proposal-name`
2. Add proposal artifacts in `docs/addendum-bid/`
3. Update documentation in `docs/gitbook/`
4. Run tests: `npm test`
5. Commit changes: `git add . && git commit -m "feat: proposal description"`
6. Create PR: `git push -u origin feature/proposal-name`
7. Request review
8. Merge to main when approved

### Q: Where do I put bid documents?
**A:** 
- `docs/addendum-bid/` - Addendum deliverables (Tasks 1-6)
- `docs/gitbook/` - Documentation and proposals
- `docs/proposals/` - Reference materials

### Q: How do I generate the PDF?
**A:** 
If using GitBook:
1. Go to GitBook space
2. Share → PDF Export
3. Download and distribute

If using Vercel:
1. Vercel generates preview URLs
2. Use Lighthouse or similar to create PDF

## Quality Gates & Governance

### Q: What quality gates are enforced?
**A:** 
- Linting checks (code style)
- Unit tests (functionality)
- Documentation validation (markdown)
- Governance requirements (tasks, certifications)

View results in GitHub Actions.

### Q: What are the Task 1-6 requirements?
**A:** 
Tasks are organized in `docs/addendum-bid/`:
1. Task 1 - Foundation deliverables
2. Task 2 - Analysis and planning
3. Task 3 - Implementation approach
4. Task 4 - Timeline and resources
5. Task 5 - First report and findings
6. Task 6 - Certifications and compliance

Each task has specific requirements and checklists.

### Q: How do I submit a complete proposal?
**A:** 
Ensure all tasks completed:
- [ ] All 6 tasks in `docs/addendum-bid/`
- [ ] Tests passing: `npm test`
- [ ] Linting passing: `npm run lint`
- [ ] Documentation complete
- [ ] Certifications attached
- [ ] PR approved by reviewers

Then merge to main.

### Q: Can I have partial submissions?
**A:** 
Yes. Feature branches can have partial work. Only main branch requires all quality gates passing.

## GitBook Integration

### Q: How do GitBook and the repository work together?
**A:** 
1. **Primary source:** `docs/gitbook/` in repository
2. **Git Sync:** Bidirectional sync with GitBook space
3. **Editing:** Can edit in GitBook web UI or repository
4. **Publishing:** GitBook generates web pages and PDF

### Q: Do I need a GitBook account?
**A:** 
Optional. You can:
- Just use GitHub for all work
- Use GitBook for web-based editing (requires account)
- Both simultaneously with Git Sync

### Q: How do I enable Git Sync?
**A:** 
1. Create GitBook workspace/space
2. Go to Share Settings
3. Enable Git Sync
4. Connect to GitHub repository
5. Select target branch (usually `feature/gitbook`)
6. Authorize connection

### Q: How do I make documentation public?
**A:** 
In GitBook:
1. Go to Share → Invite
2. Select "Public link"
3. Share the link
4. Anyone can view (no login required)

## Troubleshooting

### Common Issues

#### npm install fails
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Tests won't run
```bash
# Check Node version
node --version

# Should be >= 18.0.0
# If not, upgrade Node.js

# Try running tests with verbose output
npm test -- --verbose
```

#### Git push fails
```bash
# Make sure you're on correct branch
git branch

# Pull latest changes
git pull origin your-branch

# Try push again
git push origin your-branch
```

#### GitBook sync not working
```bash
# Check Git status
git status

# Make sure branch is correct
git branch -a

# Reset if needed
git fetch origin
git reset --hard origin/your-branch
```

#### Linting errors
```bash
# See what linter complains about
npm run lint

# Auto-fix issues
npm run lint:fix

# Or manually fix and retry
npm run lint
```

#### Port already in use
```bash
# If port 3000 is taken by another process
npm start -- --port 3001

# Or kill process using the port
# macOS/Linux:
lsof -i :3000
kill -9 <PID>

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Performance & Optimization

### Q: How can I speed up npm install?
**A:** 
```bash
# Use npm ci instead of npm install
npm ci

# Use offline mode if packages cached
npm install --prefer-offline
```

### Q: How do I reduce repository size?
**A:** 
```bash
# Remove node_modules before pushing
rm -rf node_modules

# Use .gitignore to exclude:
node_modules/
.env
*.log
dist/
coverage/
```

### Q: How do I clean up old branches?
**A:** 
```bash
# List all branches
git branch -a

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name
```

## Advanced Topics

### Q: Can I use custom GitHub Actions?
**A:** 
Yes. Modify `.github/workflows/` files to add custom automation.

### Q: Can I integrate with CI/CD systems?
**A:** 
Yes. GitHub Actions automatically runs on push. You can also integrate with:
- Jenkins
- GitLab CI
- CircleCI
- TravisCI

### Q: How do I add environment variables?
**A:** 
```bash
# Local development
Create .env file in root
(Add to .gitignore to keep private)

# GitHub Actions
Settings → Secrets → Add environment variables
Reference in workflow files
```

### Q: Can I use Vercel for hosting?
**A:** 
Yes, for static documentation/preview hosting:
```bash
npm i -g vercel
vercel
```

## Support & Contact

### Getting Help

1. **Documentation:** Check this FAQ and guides
2. **GitHub Issues:** Report bugs or request features
3. **GitHub Discussions:** Ask questions and discuss
4. **Email:** Contact maintainers for urgent issues

### Providing Feedback

Found a bug? Have a suggestion?
1. Go to GitHub Issues
2. Search for existing issues
3. Create new issue if needed
4. Provide detailed description and steps to reproduce

### Contributing

Want to contribute? See `CONTRIBUTING.md` for guidelines.
