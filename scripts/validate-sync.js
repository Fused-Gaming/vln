#!/usr/bin/env node

/**
 * Sync Validation & Divergence Detection
 * Ensures design-site and docs-site content hasn't drifted from source
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SYNC_DIR = path.join(ROOT, 'docs', '_sync');
const DESIGN_SITE_SYNC = path.join(SYNC_DIR, 'design-site');
const DOCS_SITE_SYNC = path.join(SYNC_DIR, 'docs-site');
const DESIGN_SITE_ACTUAL = path.join(ROOT, 'design-site', 'src', 'content', 'docs');
const DOCS_SITE_ACTUAL = path.join(ROOT, 'docs-site', 'src', 'content', 'docs');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color, prefix, message) {
  console.log(`${colors[color]}${prefix}${colors.reset} ${message}`);
}

function getFileHash(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return require('crypto').createHash('sha256').update(content).digest('hex');
  } catch {
    return null;
  }
}

function walkDir(dir) {
  const files = {};
  if (!fs.existsSync(dir)) return files;

  function traverse(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      const relativePath = path.relative(dir, fullPath);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.name.endsWith('.md')) {
        files[relativePath] = {
          path: fullPath,
          hash: getFileHash(fullPath),
        };
      }
    }
  }

  traverse(dir);
  return files;
}

function validateSite(siteName, syncDir, actualDir) {
  log('blue', '→', `Validating ${siteName}...`);

  const syncedFiles = walkDir(syncDir);
  const actualFiles = walkDir(actualDir);

  const issues = [];

  // Check for missing synced files in actual
  for (const [relativePath, syncData] of Object.entries(syncedFiles)) {
    if (!actualFiles[relativePath]) {
      issues.push({
        type: 'missing',
        file: relativePath,
        message: `Synced file not found in actual: ${relativePath}`,
      });
    } else if (actualFiles[relativePath].hash !== syncData.hash) {
      issues.push({
        type: 'diverged',
        file: relativePath,
        message: `Content divergence detected: ${relativePath}`,
      });
    }
  }

  // Check for orphaned files in actual
  for (const [relativePath, actualData] of Object.entries(actualFiles)) {
    if (!syncedFiles[relativePath]) {
      issues.push({
        type: 'orphaned',
        file: relativePath,
        message: `Orphaned file in actual (no sync source): ${relativePath}`,
      });
    }
  }

  if (issues.length === 0) {
    log('green', '✓', `${siteName}: All files in sync (${Object.keys(syncedFiles).length})`);
    return [];
  }

  // Categorize issues
  const diverged = issues.filter(i => i.type === 'diverged');
  const missing = issues.filter(i => i.type === 'missing');
  const orphaned = issues.filter(i => i.type === 'orphaned');

  if (diverged.length > 0) {
    log('red', '✗', `${siteName}: ${diverged.length} files diverged from source`);
    diverged.forEach(issue => {
      log('red', '  ✗', issue.message);
    });
  }

  if (missing.length > 0) {
    log('yellow', '⚠', `${siteName}: ${missing.length} synced files not found`);
    missing.forEach(issue => {
      log('yellow', '  ⊘', issue.message);
    });
  }

  if (orphaned.length > 0) {
    log('yellow', '⚠', `${siteName}: ${orphaned.length} orphaned files detected`);
    orphaned.forEach(issue => {
      log('yellow', '  ⊘', issue.message);
    });
  }

  return issues;
}

function main() {
  log('cyan', '━━━━', ' Sync Validation Engine');
  console.log('');

  const designIssues = validateSite('design-site', DESIGN_SITE_SYNC, DESIGN_SITE_ACTUAL);
  const docsIssues = validateSite('docs-site', DOCS_SITE_SYNC, DOCS_SITE_ACTUAL);

  const totalIssues = designIssues.length + docsIssues.length;

  console.log('');
  if (totalIssues === 0) {
    log('green', '✓', 'All validations passed - no divergence detected');
    process.exit(0);
  } else {
    const criticalIssues = [
      ...designIssues,
      ...docsIssues,
    ].filter(i => i.type === 'diverged');

    if (criticalIssues.length > 0) {
      log(
        'red',
        '✗',
        `CRITICAL: ${criticalIssues.length} files diverged from source - manual review required`
      );
      process.exit(1);
    } else {
      log('yellow', '⚠', `${totalIssues} validation warnings - manual review recommended`);
      process.exit(0);
    }
  }
}

main();
