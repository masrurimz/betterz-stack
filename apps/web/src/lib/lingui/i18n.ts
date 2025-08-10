import { i18n } from "@lingui/core";

export const locales = {
  en: "English",
  id: "Indonesian",
};

export const isLocaleValid = (locale: string) =>
  Object.keys(locales).includes(locale);

export const defaultLocale: keyof typeof locales = "en";

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale: string) {
  const { messages } = await import(`../../locales/${locale}/messages.po`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}

// Initialize with default locale for SSR
export async function initializeI18n() {
  if (!i18n.locale) {
    await dynamicActivate(defaultLocale);
  }
}