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
 * Auto-discover and load all translation catalogs (global + all features)
 * @param locale any locale string
 */
export async function dynamicActivate(i18n: I18n, locale: string) {
  // Define all catalogs to load
  const catalogs = [
    // Global translations (header, common UI)
    () => import(`../../locales/global-${locale}.po`),
    // Feature-specific translations
    () => import(`../../app/auth/_locales/auth-${locale}.po`),
    () => import(`../../app/todos/_locales/todos-${locale}.po`),
  ];

  // Load all catalogs in parallel
  const catalogPromises = catalogs.map(async (importFn) => {
    try {
      const catalog = await importFn();
      return catalog.messages || {};
    } catch (error) {
      // If a catalog doesn't exist, return empty messages
      console.warn(`Failed to load catalog for locale ${locale}:`, error);
      return {};
    }
  });

  const allCatalogs = await Promise.all(catalogPromises);

  // Merge all catalogs into single messages object
  const mergedMessages = allCatalogs.reduce((acc, messages) => {
    return { ...acc, ...messages };
  }, {});

  // Load and activate with merged translations
  i18n.loadAndActivate({ locale, messages: mergedMessages });
}
