import type { I18n } from '@lingui/core';

export const locales = {
  en: 'English',
  id: 'Indonesian',
};

export const isLocaleValid = (locale: string) =>
  Object.keys(locales).includes(locale);

export const defaultLocale = 'en';

/**
 * Get locale for client-side initialization
 * Checks URL params, localStorage, then falls back to default
 */
export function getClientLocale(): string {
  // Check URL params (e.g., ?locale=id)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLocale = urlParams.get('locale');
    if (urlLocale && isLocaleValid(urlLocale)) {
      return urlLocale;
    }
    
    // Could add localStorage check here in the future
    // const storedLocale = localStorage.getItem('locale');
    // if (storedLocale && isLocaleValid(storedLocale)) {
    //   return storedLocale;
    // }
  }
  
  return defaultLocale;
}

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(i18n: I18n, locale: string) {
  const { messages } = await import(`../../locales/${locale}/messages.po`);
  i18n.loadAndActivate({ locale, messages });
}
