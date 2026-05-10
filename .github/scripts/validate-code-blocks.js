#!/usr/bin/env node

/**
 * Validate code blocks in markdown files
 * Checks for:
 * - Valid language identifiers
 * - Proper formatting
 * - Code accessibility
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const glob = require('glob');

const VALID_LANGUAGES = [
  'bash',
  'shell',
  'sh',
  'zsh',
  'fish',
  'powershell',
  'cmd',
  'batch',
  'javascript',
  'js',
  'typescript',
  'ts',
  'tsx',
  'jsx',
  'python',
  'py',
  'ruby',
  'rb',
  'java',
  'c',
  'cpp',
  'csharp',
  'cs',
  'go',
  'rust',
  'rs',
  'php',
  'swift',
  'kotlin',
  'scala',
  'r',
  'sql',
  'html',
  'xml',
  'css',
  'scss',
  'sass',
  'less',
  'json',
  'yaml',
  'yml',
  'toml',
  'ini',
  'conf',
  'config',
  'dockerfile',
  'docker',
  'makefile',
  'cmake',
  'gradle',
  'maven',
  'npm',
  'yarn',
  'pnpm',
  'git',
  'diff',
  'patch',
  'hcl',
  'terraform',
  'tf',
  'graphql',
  'gql',
  'markdown',
  'md',
  'mdx',
  'plaintext',
  'text',
  'txt',
  '',
];

let totalFiles = 0;
let filesWithIssues = 0;
let totalIssues = 0;

function validateCodeBlocks(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let issues = [];

  // Match code fences (``` or ~~~)
  const codeBlockRegex = /^(```|~~~)([\w+-]*)?$/;
  let inCodeBlock = false;
  let blockStart = 0;
  let blockLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(codeBlockRegex);

    if (match && !inCodeBlock) {
      // Starting code block
      inCodeBlock = true;
      blockStart = i + 1;
      blockLanguage = match[2] || '';

      // Check if language is valid
      if (blockLanguage && !VALID_LANGUAGES.includes(blockLanguage.toLowerCase())) {
        issues.push({
          line: i + 1,
          column: 1,
          message: `Invalid language identifier: "${blockLanguage}". Consider using one of: bash, javascript, python, typescript, etc.`,
          rule: 'code-block-language',
        });
      }
    } else if (match && inCodeBlock) {
      // Ending code block
      inCodeBlock = false;

      // Check for empty code blocks
      if (blockStart === i) {
        issues.push({
          line: blockStart,
          column: 1,
          message: 'Empty code block detected. Remove empty code blocks or add content.',
          rule: 'code-block-empty',
        });
      }
    }
  }

  // Check for unclosed code blocks
  if (inCodeBlock) {
    issues.push({
      line: blockStart,
      column: 1,
      message: 'Unclosed code block. Add closing fence (``` or ~~~).',
      rule: 'code-block-unclosed',
    });
  }

  return issues;
}

function main() {
  console.log('🔍 Validating code blocks in markdown files...\n');

  // Find all markdown files
  const markdownFiles = glob.sync('**/*.{md,mdx}', {
    ignore: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.next/**',
      '.git/**',
      'coverage/**',
    ],
  });

  totalFiles = markdownFiles.length;

  if (totalFiles === 0) {
    console.log('⚠️  No markdown files found.');
    process.exit(0);
  }

  console.log(`Found ${totalFiles} markdown files\n`);

  markdownFiles.forEach((file) => {
    const issues = validateCodeBlocks(file);

    if (issues.length > 0) {
      filesWithIssues++;
      totalIssues += issues.length;

      console.log(`\n❌ ${file}`);
      issues.forEach((issue) => {
        console.log(`  Line ${issue.line}: ${issue.message}`);
        console.log(`  Rule: ${issue.rule}`);
      });
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Code Block Validation Report`);
  console.log(`Total Files: ${totalFiles}`);
  console.log(`Files with Issues: ${filesWithIssues}`);
  console.log(`Total Issues: ${totalIssues}`);

  if (totalIssues === 0) {
    console.log('\n✅ All code blocks are valid!');
    process.exit(0);
  } else {
    console.log('\n❌ Code block issues found. Please fix them above.');
    process.exit(1);
  }
}

main();
