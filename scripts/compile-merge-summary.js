#!/usr/bin/env node

/**
 * Merge Summary Compiler
 * Aggregates documentation from multiple commits in a branch
 * Generates a single comprehensive summary for merge/release notes
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

function getCommitsSinceBranch(baseBranch = 'integration/vln') {
  try {
    const commits = execSync(`git log ${baseBranch}..HEAD --pretty=format:%H:%s:%b:%an`, {
      encoding: 'utf-8',
    });

    if (!commits.trim()) {
      return [];
    }

    return commits
      .trim()
      .split('\n')
      .filter(line => line)
      .map(line => {
        const [sha, subject, body, author] = line.split(':');
        return {
          sha: sha.substring(0, 7),
          subject: subject?.trim() || '',
          body: body?.trim() || '',
          author: author?.trim() || '',
        };
      });
  } catch (error) {
    log('yellow', '⚠', 'Could not get commits - using HEAD');
    return [];
  }
}

function parseConventionalCommit(subject) {
  const match = subject.match(/^(feat|fix|docs|style|refactor|perf|test|chore)(\(.*?\))?:\s*(.*)$/);
  if (!match) {
    return {
      type: 'other',
      scope: '',
      message: subject,
    };
  }

  return {
    type: match[1],
    scope: match[2]?.slice(1, -1) || '',
    message: match[3],
  };
}

function groupCommits(commits) {
  const groups = {
    features: [],
    fixes: [],
    docs: [],
    refactor: [],
    other: [],
  };

  for (const commit of commits) {
    const parsed = parseConventionalCommit(commit.subject);

    switch (parsed.type) {
      case 'feat':
        groups.features.push({ ...commit, ...parsed });
        break;
      case 'fix':
        groups.fixes.push({ ...commit, ...parsed });
        break;
      case 'docs':
        groups.docs.push({ ...commit, ...parsed });
        break;
      case 'refactor':
      case 'perf':
        groups.refactor.push({ ...commit, ...parsed });
        break;
      default:
        groups.other.push({ ...commit, ...parsed });
    }
  }

  return groups;
}

function extractDocumentationChanges(commits) {
  const docChanges = [];

  for (const commit of commits) {
    // Extract URLs and references from commit body
    const urls = commit.body.match(/https?:\/\/[^\s]+/g) || [];
    const issues = commit.body.match(/#\d+/g) || [];
    const mentions = commit.body.match(/@[\w-]+/g) || [];

    if (urls.length > 0 || issues.length > 0) {
      docChanges.push({
        commit: commit.sha,
        subject: commit.message,
        urls: urls,
        issues: issues,
        mentions: mentions,
      });
    }
  }

  return docChanges;
}

function generateMergeSummary(commits, branch) {
  const grouped = groupCommits(commits);
  const docChanges = extractDocumentationChanges(commits);

  let markdown = '## 📋 Merge Summary\n\n';

  if (commits.length === 0) {
    markdown += '*No new commits in this branch*\n\n';
  } else {
    markdown += `**Branch:** \`${branch}\`\n`;
    markdown += `**Commits:** ${commits.length}\n\n`;

    // Features
    if (grouped.features.length > 0) {
      markdown += '### ✨ Features\n';
      for (const commit of grouped.features) {
        markdown += `- **${commit.message}** (${commit.scope || 'core'})\n`;
        markdown += `  \`${commit.sha}\` by @${commit.author}\n`;
      }
      markdown += '\n';
    }

    // Fixes
    if (grouped.fixes.length > 0) {
      markdown += '### 🐛 Bug Fixes\n';
      for (const commit of grouped.fixes) {
        markdown += `- **${commit.message}** (${commit.scope || 'core'})\n`;
        markdown += `  \`${commit.sha}\` by @${commit.author}\n`;
      }
      markdown += '\n';
    }

    // Refactoring
    if (grouped.refactor.length > 0) {
      markdown += '### ♻️ Refactoring & Performance\n';
      for (const commit of grouped.refactor) {
        markdown += `- **${commit.message}** (${commit.scope || 'core'})\n`;
        markdown += `  \`${commit.sha}\` by @${commit.author}\n`;
      }
      markdown += '\n';
    }

    // Documentation
    if (grouped.docs.length > 0) {
      markdown += '### 📚 Documentation\n';
      for (const commit of grouped.docs) {
        markdown += `- **${commit.message}**\n`;
        markdown += `  \`${commit.sha}\` by @${commit.author}\n`;
      }
      markdown += '\n';
    }

    // Related Issues & PRs
    if (docChanges.length > 0) {
      const allIssues = new Set();
      const allUrls = new Set();

      for (const change of docChanges) {
        change.issues.forEach(issue => allIssues.add(issue));
        change.urls.forEach(url => allUrls.add(url));
      }

      if (allIssues.size > 0) {
        markdown += '### 🔗 Related Issues\n';
        for (const issue of allIssues) {
          markdown += `- ${issue}\n`;
        }
        markdown += '\n';
      }
    }
  }

  markdown += '### 📊 Statistics\n';
  markdown += `- **Total Commits:** ${commits.length}\n`;
  markdown += `- **Features:** ${grouped.features.length}\n`;
  markdown += `- **Fixes:** ${grouped.fixes.length}\n`;
  markdown += `- **Refactoring:** ${grouped.refactor.length}\n`;
  markdown += `- **Documentation:** ${grouped.docs.length}\n`;
  markdown += `- **Other:** ${grouped.other.length}\n`;
  markdown += '\n';

  markdown += '---\n\n';
  markdown += '🤖 *Generated by VLN Documentation Bot*\n';

  return markdown;
}

function main() {
  log('cyan', '━━━━', ' Merge Summary Compiler');
  console.log('');

  const baseBranch = process.argv[2] || 'integration/vln';
  const outputFile = process.argv[3] || '.merge-summary.md';

  log('blue', '→', `Analyzing commits since ${baseBranch}...`);

  const commits = getCommitsSinceBranch(baseBranch);

  if (commits.length === 0) {
    log('yellow', '⚠', 'No commits found on current branch');
    console.log('');
    return;
  }

  log('green', '✓', `Found ${commits.length} commits`);

  const summary = generateMergeSummary(commits, baseBranch);

  // Write summary file
  fs.writeFileSync(outputFile, summary, 'utf-8');
  log('green', '✓', `Summary written to ${outputFile}`);

  // Also output to stdout for CI/CD
  console.log('');
  console.log(summary);
}

main();
