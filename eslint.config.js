const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat();

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
  js.configs.recommended,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['.github/scripts/**/*.js', 'scripts/**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['design-site/.astro/**', 'docs-site/.astro/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },
];
