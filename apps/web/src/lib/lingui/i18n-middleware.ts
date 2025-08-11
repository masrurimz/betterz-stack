import { setupI18n } from '@lingui/core';
import { createMiddleware } from '@tanstack/react-start';
import { dynamicActivate } from './i18n';
import { getLocaleFromRequest } from './i18n-server';

export const linguiMiddleware = createMiddleware({ type: 'request' }).server(
  async ({ next }) => {
    const locale = getLocaleFromRequest();

    const i18n = setupI18n({});

    await dynamicActivate(i18n, locale);

    return next({
      context: { i18n },
    });
  }
);
