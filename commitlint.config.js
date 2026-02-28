module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',      // A new feature
        'fix',       // A bug fix
        'docs',      // Documentation only changes
        'style',     // Changes that don't affect code meaning (formatting, missing semicolons, etc)
        'refactor',  // Code change that neither fixes a bug nor adds a feature
        'perf',      // Code change that improves performance
        'test',      // Adding missing tests or correcting existing tests
        'chore',     // Changes to build process, dependencies, or auxiliary tools
        'ci',        // Changes to CI/CD configuration files and scripts
      ],
    ],
    'subject-case': [2, 'never', ['uppercase']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never'],
    'scope-case': [2, 'always', 'lowercase'],
  },
  prompt: {
    questions: {
      type: {
        description: 'Select the type of change',
        enum: {
          feat: 'A new feature',
          fix: 'A bug fix',
          docs: 'Documentation only changes',
          style: 'Changes that do not affect the meaning of the code',
          refactor: 'A code change that neither fixes a bug nor adds a feature',
          perf: 'A code change that improves performance',
          test: 'Adding missing tests or correcting existing tests',
          chore: 'Changes to the build process or dependencies',
          ci: 'Changes to CI/CD configuration',
        },
      },
      scope: {
        description: 'What is the scope of this change (e.g., vln, api, ui)',
      },
      subject: {
        description: 'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'Provide a longer description of the changes',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breaking: {
        description: 'Describe the breaking changes',
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?',
      },
      issues: {
        description: 'Add issue references (e.g. fixes #123, resolves #456)',
      },
    },
  },
};
