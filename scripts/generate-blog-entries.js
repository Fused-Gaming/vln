#!/usr/bin/env node

/**
 * Auto-Generate Blog Entries from Documentation
 * Creates blog posts from documentation files with metadata
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, 'docs', '_source');
const BLOG_DEST = path.join(ROOT, 'docs', '_generated', 'blog');
const BLOG_ADAPTER = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'docs', '_adapters', 'blog.adapter.json'), 'utf-8')
);

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

function getFileStats(filePath) {
  const stat = fs.statSync(filePath);
  return {
    created: stat.birthtime,
    modified: stat.mtime,
    size: stat.size,
  };
}

function extractYamlFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (match) {
    return match[1];
  }
  return '';
}

function parseYamlFrontmatter(yamlStr) {
  const obj = {};
  const lines = yamlStr.split('\n').filter(l => l.trim());

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();

    if (value === 'true') obj[key.trim()] = true;
    else if (value === 'false') obj[key.trim()] = false;
    else if (!isNaN(value) && value !== '') obj[key.trim()] = Number(value);
    else obj[key.trim()] = value.replace(/^['"]|['"]$/g, '');
  }

  return obj;
}

function extractFirstHeading(content) {
  const match = content.match(/^#+\s+(.+)$/m);
  return match ? match[1] : 'Untitled';
}

function extractFirstParagraph(content) {
  // Remove frontmatter
  const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');
  // Find first paragraph (text before any heading)
  const match = withoutFrontmatter.match(/^([^#\n][^\n]*)\n/);
  if (match) {
    return match[1].substring(0, 160) + '...';
  }
  return '';
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
    } else if (typeof value === 'string') {
      result += `${spaces}${key}: "${value}"\n`;
    } else {
      result += `${spaces}${key}: ${value}\n`;
    }
  }

  return result;
}

function generateBlogEntry(sourceFile, category) {
  const content = fs.readFileSync(sourceFile, 'utf-8');
  const stats = getFileStats(sourceFile);
  const relativePath = path.relative(SOURCE_DIR, sourceFile);

  // Parse existing frontmatter if any
  const existingFrontmatter = extractYamlFrontmatter(content);
  const existingFrontmatterObj = existingFrontmatter ? parseYamlFrontmatter(existingFrontmatter) : {};

  // Extract content
  const title = existingFrontmatterObj.title || extractFirstHeading(content);
  const description = existingFrontmatterObj.description || extractFirstParagraph(content);

  // Generate blog frontmatter
  const blogFrontmatter = {
    title: title,
    description: description || 'New documentation published',
    date: existingFrontmatterObj.date || stats.modified.toISOString().split('T')[0],
    author: existingFrontmatterObj.author || 'VLN Team',
    category: category,
    featured: false,
    tags: existingFrontmatterObj.tags || [category, 'documentation'],
    sourceFile: relativePath,
    published: true,
    editUrl: `https://github.com/Fused-Gaming/vln/tree/main/${relativePath}`,
  };

  // Create blog post filename
  const date = blogFrontmatter.date;
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const blogFileName = `${date}-${slug}.md`;

  // Extract body
  const bodyMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  const body = bodyMatch ? bodyMatch[1] : content;

  // Generate blog post
  const blogPost = `---\n${yamlStringify(blogFrontmatter)}---\n\n${body}`;

  return {
    fileName: blogFileName,
    content: blogPost,
    category: category,
    title: title,
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

function generateBlogEntries() {
  log('cyan', '━━━━', ' Blog Entry Generator');
  console.log('');

  // Ensure destination directory exists
  fs.mkdirSync(BLOG_DEST, { recursive: true });

  const sourceCategories = BLOG_ADAPTER.autoGeneration.sourceCategories;
  const generatedEntries = [];

  for (const [category, patterns] of Object.entries(sourceCategories)) {
    log('blue', '→', `Processing ${category} category...`);

    for (const pattern of patterns) {
      // Convert glob pattern to directory
      const [dir] = pattern.split('/**');

      if (!fs.existsSync(dir)) {
        log('yellow', '⊘', `Directory not found: ${dir}`);
        continue;
      }

      let entriesInCategory = 0;

      walkDir(dir, (filePath) => {
        const blogEntry = generateBlogEntry(filePath, category);
        const destPath = path.join(BLOG_DEST, category, blogEntry.fileName);

        // Create category subdirectory
        const destDir = path.dirname(destPath);
        fs.mkdirSync(destDir, { recursive: true });

        // Write blog post
        fs.writeFileSync(destPath, blogEntry.content, 'utf-8');
        entriesInCategory++;
        generatedEntries.push(blogEntry);
      });

      log('green', '✓', `${category}: ${entriesInCategory} blog entries generated`);
    }
  }

  // Generate blog index
  if (generatedEntries.length > 0) {
    const indexContent = {
      totalEntries: generatedEntries.length,
      categories: Object.keys(sourceCategories),
      entries: generatedEntries
        .sort((a, b) => b.fileName.localeCompare(a.fileName))
        .slice(0, 10)
        .map(e => ({
          title: e.title,
          category: e.category,
          file: e.fileName,
        })),
      generatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(
      path.join(BLOG_DEST, 'index.json'),
      JSON.stringify(indexContent, null, 2),
      'utf-8'
    );

    log('green', '✓', `Total entries generated: ${generatedEntries.length}`);
  } else {
    log('yellow', '⚠', 'No entries generated');
  }

  console.log('');
}

generateBlogEntries();
