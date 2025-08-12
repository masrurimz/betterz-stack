import { defineConfig } from '@lingui/cli';

export default defineConfig({
  locales: ['en', 'id'],
  sourceLocale: 'en',
  fallbackLocales: {
    default: 'en',
  },
  catalogs: [
    // Global translations (header, common UI, shared components)
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: [
        'src/components/**',
        'src/routes/**',
      ],
      exclude: [
        '**/node_modules/**',
        'src/app/**', // Exclude app features - they have their own catalogs
      ],
    },
    // Auth feature translations
    {
      path: '<rootDir>/src/app/auth/_locales/{locale}',
      include: ['src/app/auth/**'],
      exclude: ['**/node_modules/**'],
    },
    // Todos feature translations
    {
      path: '<rootDir>/src/app/todos/_locales/{locale}',
      include: ['src/app/todos/**'],
      exclude: ['**/node_modules/**'],
    },
  ],
  format: 'po',
  formatOptions: {
    lineNumbers: false,
  },
});
