import { getWebRequest } from '@tanstack/react-start/server';

import { defaultLocale, isLocaleValid } from './i18n';

export function getLocaleFromRequest() {
  const request = getWebRequest();

  if (request) {
    const url = new URL(request.url);
    const queryLocale = url.searchParams.get('locale') ?? '';

    if (isLocaleValid(queryLocale)) {
      return queryLocale;
    }
  }

  return defaultLocale;
}

// export async function setupLocaleFromRequest() {
//   await dynamicActivate(getLocaleFromRequest());
// }
