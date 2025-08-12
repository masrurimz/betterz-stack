import { setupI18n } from '@lingui/core';
import {
  createStartHandler,
  defaultStreamHandler,
  requestHandler,
} from '@tanstack/react-start/server';
import { dynamicActivate } from './lib/lingui/i18n';
import { getLocaleFromRequest } from './lib/lingui/i18n-server';
import { createRouter } from './router';

export default requestHandler(async (ctx) => {
  const locale = getLocaleFromRequest();
  const i18n = setupI18n({});

  // Load translations for the detected locale
  await dynamicActivate(i18n, locale);

  const startHandler = createStartHandler({
    createRouter: () => {
      return createRouter({
        i18n,
      });
    },
  });

  return startHandler(defaultStreamHandler)(ctx);
});
