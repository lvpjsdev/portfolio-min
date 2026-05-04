import type { InferGetStaticParamsType } from 'astro';

export const locales = ['en', 'ru'] as const;
export type Locale = (typeof locales)[number];

export async function getTranslations(lang: Locale) {
  const translations = await import(`../locales/${lang}.json`);
  return translations.default;
}

export function getStaticPathsForLocale() {
  return locales.map((lang) => ({ params: { lang } }));
}
