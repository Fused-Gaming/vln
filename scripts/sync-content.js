#!/usr/bin/env node

/**
 * Unified Content Sync Engine
 * Syncs from docs/_source to design-site and docs-site via adapters
 * Prevents divergence by validating sync targets
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, 'docs', '_source');
const ADAPTERS_DIR = path.join(ROOT, 'docs', '_adapters');
const SYNC_DIR = path.join(ROOT, 'docs', '_sync');

// Color codes for output
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

function readMarkdownFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (error) {
    log('red', '✗', `Failed to read: ${filePath}`);
    throw error;
  }
}

function getFileHash(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return require('crypto').createHash('sha256').update(content).digest('hex');
  } catch {
    return null;
  }
}

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (match) {
    return match[1];
  }
  return '';
}

function extractBody(content) {
  const match = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  if (match) {
    return match[1];
  }
  return content;
}

function parseYamlFrontmatter(yamlStr) {
  const obj = {};
  const lines = yamlStr.split('\n').filter(l => l.trim());

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();

    // Handle basic yaml types
    if (value === 'true') obj[key.trim()] = true;
    else if (value === 'false') obj[key.trim()] = false;
    else if (!isNaN(value) && value !== '') obj[key.trim()] = Number(value);
    else obj[key.trim()] = value.replace(/^['"]|['"]$/g, '');
  }

  return obj;
}

function yamlStringify(obj, indent = 0) {
  const spaces = ' '.repeat(indent);
  let result = '';

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;

    if (typeof value === 'object' && !Array.isArray(value)) {
      result += `${spaces}${key}:\n`;
      result += yamlStringify(value, indent + 2);
    } else if (Array.isArray(value)) {
      result += `${spaces}${key}:\n`;
      for (const item of value) {
        if (typeof item === 'object') {
          result += `${spaces}  - ${Object.keys(item)[0]}: ${Object.values(item)[0]}\n`;
        } else {
          result += `${spaces}  - ${item}\n`;
        }
      }
    } else {
      result += `${spaces}${key}: ${value}\n`;
    }
  }

  return result;
}

function generateFrontmatter(baseFrontmatter, adapterFrontmatter) {
  const existing = parseYamlFrontmatter(baseFrontmatter);
  const merged = {
    ...existing,
    ...adapterFrontmatter,
  };

  return yamlStringify(merged);
}

function processFile(sourcePath, adapter, rules) {
  const relativePath = path.relative(SOURCE_DIR, sourcePath);
  let targetPath = null;
  let targetFrontmatter = null;

  // Find matching rule
  for (const [pattern, routeConfig] of Object.entries(rules)) {
    const patternRegex = pattern
      .replace(/\*\*/g, '.*')
      .replace(/\*/g, '[^/]*')
      .replace(/\{basename\}/g, '([^/]+)');

    const regex = new RegExp(`^${patternRegex}$`);
    const match = relativePath.match(regex);

    if (match) {
      const basename = path.basename(sourcePath);
      const dirname = path.dirname(relativePath);

      targetPath = routeConfig.path
        .replace('{basename}', basename)
        .replace(/\{dirname\}/g, dirname);

      targetFrontmatter = routeConfig.frontmatter;
      break;
    }
  }

  if (!targetPath) {
    log('yellow', '⊘', `No route match: ${relativePath}`);
    return null;
  }

  const content = readMarkdownFile(sourcePath);
  const body = extractBody(content);
  const existingFrontmatter = extractFrontmatter(content);
  const newFrontmatter = generateFrontmatter(existingFrontmatter, targetFrontmatter);

  return {
    targetPath,
    content: `---\n${newFrontmatter}---\n${body}`,
    sourceHash: getFileHash(sourcePath),
  };
}

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else if (file.endsWith('.md')) {
      callback(filePath);
    }
  }
}

function writeSyncedContent(targetDir, files) {
  let written = 0;

  for (const [relativePath, data] of Object.entries(files)) {
    const fullPath = path.join(targetDir, relativePath);
    const fullDir = path.dirname(fullPath);

    // Create directories
    fs.mkdirSync(fullDir, { recursive: true });

    fs.writeFileSync(fullPath, data.content, 'utf-8');
    written++;
  }

  return written;
}

function validateSync(sourceFiles, syncedFiles) {
  const errors = [];

  // Check for orphaned synced files
  for (const syncPath of Object.keys(syncedFiles)) {
    let hasSource = false;
    for (const sourcePath of Object.keys(sourceFiles)) {
      if (syncedFiles[syncPath].sourceHash === sourceFiles[sourcePath].hash) {
        hasSource = true;
        break;
      }
    }
    if (!hasSource) {
      errors.push(`Orphaned synced file: ${syncPath}`);
    }
  }

  return errors;
}

async function sync() {
  log('cyan', '━━━━', ' VLN Content Sync Engine');
  console.log('');

  // Read adapters
  if (!fs.existsSync(ADAPTERS_DIR)) {
    log('red', '✗', `Adapters directory not found: ${ADAPTERS_DIR}`);
    process.exit(1);
  }

  const designSiteAdapter = JSON.parse(
    fs.readFileSync(path.join(ADAPTERS_DIR, 'design-site.adapter.json'), 'utf-8')
  );

  const docsSiteAdapter = JSON.parse(
    fs.readFileSync(path.join(ADAPTERS_DIR, 'docs-site.adapter.json'), 'utf-8')
  );

  // Collect source files
  const sourceFiles = {};
  log('blue', '→', 'Reading source files...');

  walkDir(SOURCE_DIR, (filePath) => {
    const relativePath = path.relative(SOURCE_DIR, filePath);
    sourceFiles[relativePath] = {
      path: filePath,
      hash: getFileHash(filePath),
    };
  });

  log('green', '✓', `Found ${Object.keys(sourceFiles).length} source files`);

  // Create sync directories
  fs.mkdirSync(SYNC_DIR, { recursive: true });
  const designSiteSyncDir = path.join(SYNC_DIR, 'design-site');
  const docsSiteSyncDir = path.join(SYNC_DIR, 'docs-site');

  fs.mkdirSync(designSiteSyncDir, { recursive: true });
  fs.mkdirSync(docsSiteSyncDir, { recursive: true });

  // Process design-site
  log('blue', '→', 'Processing design-site adapter...');
  const designSiteFiles = {};

  for (const [relativePath, sourceData] of Object.entries(sourceFiles)) {
    const result = processFile(sourceData.path, designSiteAdapter, designSiteAdapter.routes);
    if (result) {
      designSiteFiles[result.targetPath] = result;
    }
  }

  const designWritten = writeSyncedContent(designSiteSyncDir, designSiteFiles);
  log('green', '✓', `design-site: ${designWritten} files synced`);

  // Process docs-site
  log('blue', '→', 'Processing docs-site adapter...');
  const docsSiteFiles = {};

  for (const [relativePath, sourceData] of Object.entries(sourceFiles)) {
    const result = processFile(sourceData.path, docsSiteAdapter, docsSiteAdapter.routes);
    if (result) {
      docsSiteFiles[result.targetPath] = result;
    }
  }

  const docsWritten = writeSyncedContent(docsSiteSyncDir, docsSiteFiles);
  log('green', '✓', `docs-site: ${docsWritten} files synced`);

  // Validate no divergence
  log('blue', '→', 'Validating sync integrity...');
  const designErrors = validateSync(sourceFiles, designSiteFiles);
  const docsErrors = validateSync(sourceFiles, docsSiteFiles);

  if (designErrors.length > 0 || docsErrors.length > 0) {
    log('yellow', '⚠', 'Validation warnings detected');
    [...designErrors, ...docsErrors].forEach(err => {
      log('yellow', '  ⊘', err);
    });
  } else {
    log('green', '✓', 'All synced content validated');
  }

  // Generate metadata file
  const metadata = {
    synced_at: new Date().toISOString(),
    source_files: Object.keys(sourceFiles).length,
    design_site_files: designWritten,
    docs_site_files: docsWritten,
    validation_errors: designErrors.length + docsErrors.length,
  };

  fs.writeFileSync(
    path.join(SYNC_DIR, 'sync-metadata.json'),
    JSON.stringify(metadata, null, 2),
    'utf-8'
  );

  log('green', '✓', 'Sync complete!');
  console.log('');
}

// Run
sync().catch((error) => {
  log('red', '✗', error.message);
  process.exit(1);
});
