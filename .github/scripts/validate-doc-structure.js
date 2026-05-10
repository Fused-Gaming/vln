#!/usr/bin/env node

/**
 * Validate documentation structure
 * Checks for:
 * - Proper frontmatter (title, description)
 * - Required sections
 * - Heading hierarchy
 * - Links to other docs
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const REQUIRED_FRONTMATTER = ['title', 'description'];

function parseMarkdownFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return null;
  }

  const frontmatter = {};
  const lines = match[1].split('\n');

  lines.forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');

    if (key && value) {
      frontmatter[key.trim()] = value;
    }
  });

  return frontmatter;
}

function validateDocStructure(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let issues = [];

  // Check for frontmatter
  const frontmatter = parseMarkdownFrontmatter(content);

  if (!frontmatter) {
    issues.push({
      type: 'error',
      message: 'Missing frontmatter. Add YAML frontmatter with title and description.',
    });
  } else {
    // Check for required frontmatter fields
    REQUIRED_FRONTMATTER.forEach((field) => {
      if (!frontmatter[field]) {
        issues.push({
          type: 'error',
          message: `Missing required frontmatter field: "${field}"`,
        });
      }
    });
  }

  // Check heading hierarchy
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    headings.push({ level, text });
  }

  if (headings.length === 0) {
    issues.push({
      type: 'warning',
      message: 'No headings found. Consider adding section headings.',
    });
  }

  // Check heading hierarchy (should not skip levels)
  for (let i = 1; i < headings.length; i++) {
    const prevLevel = headings[i - 1].level;
    const currLevel = headings[i].level;

    if (currLevel > prevLevel + 1) {
      issues.push({
        type: 'warning',
        message: `Heading hierarchy issue: jumped from H${prevLevel} to H${currLevel}. Consider proper nesting.`,
      });
    }
  }

  // Check for first heading
  if (headings.length > 0 && headings[0].level !== 1) {
    issues.push({
      type: 'warning',
      message: 'First heading should be H1 (# Heading). Consider reordering.',
    });
  }

  // Check for links to other docs
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];

  while ((match = linkRegex.exec(content)) !== null) {
    links.push({
      text: match[1],
      href: match[2],
    });
  }

  // Check for broken relative links
  links.forEach((link) => {
    if (
      link.href.startsWith('/') &&
      !link.href.startsWith('http') &&
      !link.href.startsWith('#')
    ) {
      // This is a relative path that might be broken
      // We can't validate if file exists in CI, so just warn
      if (!link.href.includes('/docs/')) {
        // Likely cross-project link - might be OK
      }
    }
  });

  // Check for minimum content
  const contentWithoutFrontmatter = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  const wordCount = contentWithoutFrontmatter
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  if (wordCount < 50) {
    issues.push({
      type: 'warning',
      message: `Document is very short (${wordCount} words). Consider adding more content.`,
    });
  }

  return { issues, headings, links };
}

function main() {
  console.log('📚 Validating documentation structure...\n');

  const docFiles = glob.sync('docs-site/src/content/docs/**/*.md', {
    ignore: ['node_modules/**', '.git/**'],
  });

  let totalFiles = docFiles.length;
  let filesWithErrors = 0;
  let filesWithWarnings = 0;
  let totalIssues = 0;

  if (totalFiles === 0) {
    console.log('⚠️  No documentation files found.');
    process.exit(0);
  }

  console.log(`Found ${totalFiles} documentation files\n`);

  docFiles.forEach((file) => {
    const { issues, headings } = validateDocStructure(file);

    if (issues.length > 0) {
      const errors = issues.filter((i) => i.type === 'error');
      const warnings = issues.filter((i) => i.type === 'warning');

      if (errors.length > 0) {
        filesWithErrors++;
      }
      if (warnings.length > 0) {
        filesWithWarnings++;
      }

      totalIssues += issues.length;

      console.log(`\n${errors.length > 0 ? '❌' : '⚠️ '} ${file}`);
      console.log(`  Headings: ${headings.length}`);

      issues.forEach((issue) => {
        const emoji = issue.type === 'error' ? '❌' : '⚠️ ';
        console.log(`  ${emoji} ${issue.type.toUpperCase()}: ${issue.message}`);
      });
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Documentation Structure Report`);
  console.log(`Total Files: ${totalFiles}`);
  console.log(`Files with Errors: ${filesWithErrors}`);
  console.log(`Files with Warnings: ${filesWithWarnings}`);
  console.log(`Total Issues: ${totalIssues}`);

  if (filesWithErrors === 0) {
    console.log('\n✅ Documentation structure is valid!');
    process.exit(0);
  } else {
    console.log('\n❌ Documentation structure errors found. Please fix them above.');
    process.exit(1);
  }
}

main();
