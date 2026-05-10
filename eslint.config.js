const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

module.exports = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      'out/**',
      '.astro/**',
      'docs-site/.astro/**',
      'docs-site/dist/**',
      'design-site/.astro/**',
      'design-site/dist/**',
      'coverage/**',
      '.vercel/**',
      '*.tsbuildinfo',
      '.github/scripts/**',
      'scripts/**',
      'eslint.config.js',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];
