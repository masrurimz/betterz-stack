import { defineConfig } from '@lingui/cli';

export default defineConfig({
  locales: ['en', 'id'],
  sourceLocale: 'en',
  fallbackLocales: {
    default: 'en',
  },
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: [
        'src/components/**',
        'src/routes/**',
        'src/app/**',
      ],
      exclude: ['**/node_modules/**'],
    },
  ],
  format: 'po',
  formatOptions: {
    lineNumbers: false,
  },
});
