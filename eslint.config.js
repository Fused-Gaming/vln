const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

module.exports = [
  {
    ignores: [
      'docs-site/**',
      '.next/**',
      'node_modules/**',
      'out/**',
      'dist/**',
      'scripts/**',
      'eslint.config.js',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];
