export const locales = ['en', 'ru'] as const;
export type Locale = (typeof locales)[number];

export async function getTranslations(lang: Locale): Promise<Record<string, any>> {
  try {
    const translations = await import(`../locales/${lang}.json`);
    return translations.default;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${lang}`, error);
    return {};
  }
}

export function getStaticPathsForLocale() {
  return locales.map((lang) => ({ params: { lang } }));
}
