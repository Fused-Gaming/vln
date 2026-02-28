#!/usr/bin/env node

/**
 * Blog Content Sync Engine
 * Syncs generated blog entries to docs-site and prepares for GitHub Pages
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const BLOG_SOURCE = path.join(ROOT, 'docs', '_generated', 'blog');
const BLOG_SYNC = path.join(ROOT, 'docs', '_sync', 'blog');
const DOCS_SITE_BLOG = path.join(ROOT, 'docs-site', 'src', 'content', 'blog');

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

function walkDir(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  function traverse(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      const relativePath = path.relative(dir, fullPath);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.name.endsWith('.md')) {
        files.push({
          path: fullPath,
          relative: relativePath,
          basename: entry.name,
        });
      } else if (entry.name === 'index.json') {
        files.push({
          path: fullPath,
          relative: relativePath,
          isIndex: true,
        });
      }
    }
  }

  traverse(dir);
  return files;
}

function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
}

function generateBlogFeed(blogFiles) {
  const entries = [];

  for (const file of blogFiles) {
    if (file.isIndex) continue;

    const content = fs.readFileSync(file.path, 'utf-8');
    const match = content.match(/^---\n([\s\S]*?)\n---/);

    if (match) {
      const frontmatter = match[1];
      const titleMatch = frontmatter.match(/title:\s*"([^"]+)"/);
      const dateMatch = frontmatter.match(/date:\s*"?([^"\n]+)"?/);
      const descMatch = frontmatter.match(/description:\s*"([^"]+)"/);
      const authorMatch = frontmatter.match(/author:\s*"([^"]+)"/);

      entries.push({
        title: titleMatch ? titleMatch[1] : 'Untitled',
        date: dateMatch ? dateMatch[1] : new Date().toISOString(),
        description: descMatch ? descMatch[1] : '',
        author: authorMatch ? authorMatch[1] : 'VLN Team',
        url: `/blog/${file.relative.replace(/\.md$/, '/')}`,
      });
    }
  }

  return {
    version: '1.0',
    title: 'VLN Blog',
    description: 'Security research, insights, and updates from VLN',
    link: 'https://vln.gg/blog',
    updated: new Date().toISOString(),
    entries: entries.sort((a, b) => new Date(b.date) - new Date(a.date)),
  };
}

function generateAtomFeed(blogFiles) {
  const feed = generateBlogFeed(blogFiles);

  let xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${feed.title}</title>
  <subtitle>${feed.description}</subtitle>
  <link href="https://vln.gg/blog" rel="alternate"/>
  <link href="https://vln.gg/blog/atom.xml" rel="self"/>
  <id>https://vln.gg/blog</id>
  <updated>${feed.updated}</updated>
`;

  for (const entry of feed.entries) {
    xml += `
  <entry>
    <title>${entry.title}</title>
    <link href="https://vln.gg${entry.url}" rel="alternate"/>
    <id>https://vln.gg${entry.url}</id>
    <published>${entry.date}</published>
    <updated>${entry.date}</updated>
    <summary>${entry.description}</summary>
    <author>
      <name>${entry.author}</name>
    </author>
  </entry>
`;
  }

  xml += `
</feed>`;

  return xml;
}

function syncBlogContent() {
  log('cyan', '━━━━', ' Blog Content Sync');
  console.log('');

  // Check if blog source exists
  if (!fs.existsSync(BLOG_SOURCE)) {
    log('yellow', '⚠', 'Blog source not found - run generate-blog-entries.js first');
    return;
  }

  // Get blog files
  const blogFiles = walkDir(BLOG_SOURCE);

  if (blogFiles.length === 0) {
    log('yellow', '⚠', 'No blog entries found');
    return;
  }

  // Create sync directory
  fs.mkdirSync(BLOG_SYNC, { recursive: true });

  // Copy all blog files to sync directory
  log('blue', '→', 'Syncing blog entries...');
  let syncedCount = 0;

  for (const file of blogFiles) {
    if (file.isIndex) {
      // Copy index.json as-is
      copyFile(file.path, path.join(BLOG_SYNC, 'index.json'));
    } else {
      const destPath = path.join(BLOG_SYNC, file.relative);
      copyFile(file.path, destPath);
      syncedCount++;
    }
  }

  log('green', '✓', `${syncedCount} blog posts synced to docs/_sync/blog/`);

  // Copy to docs-site if it exists
  if (fs.existsSync(path.dirname(DOCS_SITE_BLOG))) {
    log('blue', '→', 'Syncing to docs-site...');
    fs.mkdirSync(DOCS_SITE_BLOG, { recursive: true });

    for (const file of blogFiles) {
      if (file.isIndex) {
        copyFile(file.path, path.join(DOCS_SITE_BLOG, 'index.json'));
      } else {
        const destPath = path.join(DOCS_SITE_BLOG, file.relative);
        copyFile(file.path, destPath);
      }
    }

    log('green', '✓', `Blog synced to docs-site/src/content/blog/`);
  }

  // Generate feeds
  log('blue', '→', 'Generating feeds...');

  const jsonFeed = generateBlogFeed(blogFiles);
  fs.writeFileSync(path.join(BLOG_SYNC, 'feed.json'), JSON.stringify(jsonFeed, null, 2), 'utf-8');

  const atomFeed = generateAtomFeed(blogFiles);
  fs.writeFileSync(path.join(BLOG_SYNC, 'atom.xml'), atomFeed, 'utf-8');

  log('green', '✓', 'Generated JSON Feed and Atom Feed');

  // Generate sitemap excerpt
  const sitemapEntries = blogFiles
    .filter(f => !f.isIndex)
    .map(f => {
      const content = fs.readFileSync(f.path, 'utf-8');
      const dateMatch = content.match(/date:\s*"?([^"\n]+)"?/);
      return {
        path: f.relative.replace(/\.md$/, ''),
        lastModified: dateMatch ? dateMatch[1] : new Date().toISOString(),
      };
    });

  fs.writeFileSync(
    path.join(BLOG_SYNC, 'sitemap.json'),
    JSON.stringify(sitemapEntries, null, 2),
    'utf-8'
  );

  log('green', '✓', `Blog sitemap: ${sitemapEntries.length} entries`);

  console.log('');
  log('green', '✓', 'Blog sync complete!');
  console.log('');
  console.log('  📄 JSON Feed: docs/_sync/blog/feed.json');
  console.log('  📡 Atom Feed: docs/_sync/blog/atom.xml');
  console.log('  🗺️  Sitemap:  docs/_sync/blog/sitemap.json');
}

syncBlogContent();
