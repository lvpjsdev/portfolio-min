import en from '../locales/en.json';
import ru from '../locales/ru.json';

const locales = { en, ru } as const;

type NestedDict = Record<string, string | NestedDict>;

function lookup(obj: NestedDict, keys: string[]): string {
  let current: unknown = obj;
  for (const key of keys) {
    if (!current || typeof current !== 'object') return keys.join('.');
    current = (current as NestedDict)[key];
  }
  return typeof current === 'string' ? current : keys.join('.');
}

export function t(lang: string, key: string): string {
  const locale = locales[lang as keyof typeof locales] || locales.en;
  return lookup(locale, key.split('.'));
}
