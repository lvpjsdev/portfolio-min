// Feature: design-system-components, Property 8: ThemeToggle correctly toggles and persists theme

import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import fc from 'fast-check';

/**
 * Property-based tests for ThemeToggle component.
 *
 * Since Astro components cannot be imported directly in Vitest (they require a build step),
 * we replicate the ThemeToggle JS logic here: the same getInitialTheme, applyTheme, and
 * toggle logic that ThemeToggle.astro uses in its inline <script>.
 *
 * Validates: Requirements 7.5, 7.6
 */

// ─── Mock localStorage (in-memory Map) ───────────────────────────────────────

class MockLocalStorage {
  private store = new Map<string, string>();

  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) as string) : null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  clear(): void {
    this.store.clear();
  }
}

// ─── Mock document.documentElement ───────────────────────────────────────────

class MockDocumentElement {
  private attrs = new Map<string, string>();

  getAttribute(name: string): string | null {
    return this.attrs.has(name) ? (this.attrs.get(name) as string) : null;
  }

  setAttribute(name: string, value: string): void {
    this.attrs.set(name, value);
  }
}

// ─── Replicated ThemeToggle logic ─────────────────────────────────────────────

type Theme = 'dark' | 'light';

interface ThemeEnv {
  localStorage: MockLocalStorage;
  documentElement: MockDocumentElement;
}

function getInitialTheme(env: ThemeEnv): Theme {
  try {
    const stored = env.localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored as Theme;
  } catch (_) {}
  return 'dark';
}

function applyTheme(theme: Theme, env: ThemeEnv): void {
  env.documentElement.setAttribute('data-theme', theme);
  try {
    env.localStorage.setItem('theme', theme);
  } catch (_) {}
}

function simulateClick(env: ThemeEnv): void {
  const current = env.documentElement.getAttribute('data-theme');
  const next: Theme = current === 'light' ? 'dark' : 'light';
  applyTheme(next, env);
}

function createEnv(): ThemeEnv {
  return {
    localStorage: new MockLocalStorage(),
    documentElement: new MockDocumentElement(),
  };
}

// ─── Property 8 tests ─────────────────────────────────────────────────────────

describe('ThemeToggle — Property 8: ThemeToggle correctly toggles and persists theme', () => {
  it('after click, data-theme changes to the opposite of the initial theme', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('dark', 'light'),
        (initialTheme: Theme) => {
          const env = createEnv();
          applyTheme(initialTheme, env);
          simulateClick(env);
          const expectedNext: Theme = initialTheme === 'dark' ? 'light' : 'dark';
          expect(env.documentElement.getAttribute('data-theme')).toBe(expectedNext);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('after click, localStorage contains the new theme value', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('dark', 'light'),
        (initialTheme: Theme) => {
          const env = createEnv();
          applyTheme(initialTheme, env);
          simulateClick(env);
          const expectedNext: Theme = initialTheme === 'dark' ? 'light' : 'dark';
          expect(env.localStorage.getItem('theme')).toBe(expectedNext);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('on subsequent page load, theme is restored from localStorage', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('dark', 'light'),
        (initialTheme: Theme) => {
          const env = createEnv();
          applyTheme(initialTheme, env);
          simulateClick(env);
          const persistedTheme = env.localStorage.getItem('theme') as Theme;

          // Second "page load" — new documentElement, same localStorage
          const env2: ThemeEnv = {
            localStorage: env.localStorage,
            documentElement: new MockDocumentElement(),
          };
          const restoredTheme = getInitialTheme(env2);
          applyTheme(restoredTheme, env2);

          expect(restoredTheme).toBe(persistedTheme);
          expect(env2.documentElement.getAttribute('data-theme')).toBe(persistedTheme);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('toggle is always the strict inverse: dark→light and light→dark', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('dark', 'light'),
        (initialTheme: Theme) => {
          const env = createEnv();
          applyTheme(initialTheme, env);
          simulateClick(env);
          const afterToggle = env.documentElement.getAttribute('data-theme') as Theme;
          expect(afterToggle).not.toBe(initialTheme);
          if (initialTheme === 'dark') {
            expect(afterToggle).toBe('light');
          } else {
            expect(afterToggle).toBe('dark');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('double click returns to the original theme', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('dark', 'light'),
        (initialTheme: Theme) => {
          const env = createEnv();
          applyTheme(initialTheme, env);
          simulateClick(env);
          simulateClick(env);
          expect(env.documentElement.getAttribute('data-theme')).toBe(initialTheme);
          expect(env.localStorage.getItem('theme')).toBe(initialTheme);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('getInitialTheme reads the stored theme from localStorage correctly', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('dark', 'light'),
        (storedTheme: Theme) => {
          const env = createEnv();
          env.localStorage.setItem('theme', storedTheme);
          expect(getInitialTheme(env)).toBe(storedTheme);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('getInitialTheme returns "dark" when localStorage is empty', () => {
    const env = createEnv();
    expect(getInitialTheme(env)).toBe('dark');
  });

  it('getInitialTheme ignores invalid localStorage values and falls back to dark', () => {
    fc.assert(
      fc.property(
        fc.string().filter((s) => s !== 'dark' && s !== 'light'),
        (invalidValue) => {
          const env = createEnv();
          env.localStorage.setItem('theme', invalidValue);
          expect(getInitialTheme(env)).toBe('dark');
        }
      ),
      { numRuns: 100 }
    );
  });
});
