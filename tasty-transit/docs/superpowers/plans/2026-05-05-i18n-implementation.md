# i18n Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add English/Russian i18n support to Tasty Transit Astro project using built-in Astro i18n.

**Architecture:** Use Astro's built-in i18n with URL prefixes for all languages. Store translations in JSON files, load via helper function. Pages use dynamic `[lang]` routing.

**Tech Stack:** Astro 6.x i18n, JSON translation files, TypeScript helper

---

## File Structure

**New files:**
- `src/locales/en.json` — English translations
- `src/locales/ru.json` — Russian translations
- `src/i18n/translations.ts` — Helper to load translations

**Modified files:**
- `astro.config.mjs` — Add i18n config
- `src/pages/index.astro` → `src/pages/[lang]/index.astro`
- `src/pages/about.astro` → `src/pages/[lang]/about.astro`
- `src/pages/projects.astro` → `src/pages/[lang]/projects.astro`
- `src/pages/contact.astro` → `src/pages/[lang]/contact.astro`
- `src/pages/experience.astro` → `src/pages/[lang]/experience.astro`
- `src/pages/skills.astro` → `src/pages/[lang]/skills.astro`
- `src/layouts/Layout.astro` — Add language switcher
- `src/pages/index.astro` — Root redirect to `/en/`

---

### Task 1: Create translation JSON files

**Files:**
- Create: `src/locales/en.json`
- Create: `src/locales/ru.json`

- [ ] **Step 1: Create English translations file**

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "projects": "Projects",
    "experience": "Experience",
    "skills": "Skills",
    "contact": "Contact"
  },
  "home": {
    "greeting": "Hej.",
    "intro": "My name is Developer. I'm a Web Developer, based in Location."
  },
  "about": {
    "title": "About Me"
  },
  "projects": {
    "title": "Projects"
  },
  "experience": {
    "title": "Experience"
  },
  "skills": {
    "title": "Skills"
  },
  "contact": {
    "title": "Contact"
  }
}
```

- [ ] **Step 2: Create Russian translations file**

```json
{
  "nav": {
    "home": "Главная",
    "about": "Обо мне",
    "projects": "Проекты",
    "experience": "Опыт",
    "skills": "Навыки",
    "contact": "Контакты"
  },
  "home": {
    "greeting": "Привет.",
    "intro": "Меня зовут Разработчик. Я веб-разработчик, живу в Локации."
  },
  "about": {
    "title": "Обо мне"
  },
  "projects": {
    "title": "Проекты"
  },
  "experience": {
    "title": "Опыт"
  },
  "skills": {
    "title": "Навыки"
  },
  "contact": {
    "title": "Контакты"
  }
}
```

- [ ] **Step 3: Verify files created**

Run: `ls -la src/locales/`
Expected: Both `en.json` and `ru.json` present

- [ ] **Step 4: Commit**

```bash
git add src/locales/
git commit -m "feat(i18n): add English and Russian translation files"
```

---

### Task 2: Create i18n helper function

**Files:**
- Create: `src/i18n/translations.ts`

- [ ] **Step 1: Create the translations helper**

```typescript
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/i18n/translations.ts
git commit -m "feat(i18n): add translations helper function"
```

---

### Task 3: Update Astro config with i18n

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Update astro config**

```javascript
import { defineConfig } from 'astro';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true
    }
  }
});
```

- [ ] **Step 2: Verify config is valid**

Run: `npm run build`
Expected: Build succeeds (may have warnings about missing pages)

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "feat(i18n): add i18n configuration to Astro"
```

---

### Task 4: Create [lang] directory and move pages

**Files:**
- Create: `src/pages/[lang]/`
- Move: `src/pages/index.astro` → `src/pages/[lang]/index.astro`
- Move: `src/pages/about.astro` → `src/pages/[lang]/about.astro`
- Move: `src/pages/projects.astro` → `src/pages/[lang]/projects.astro`
- Move: `src/pages/contact.astro` → `src/pages/[lang]/contact.astro`
- Move: `src/pages/experience.astro` → `src/pages/[lang]/experience.astro`
- Move: `src/pages/skills.astro` → `src/pages/[lang]/skills.astro`

- [ ] **Step 1: Create [lang] directory and move files**

Run:
```bash
mkdir -p src/pages/[lang]
git mv src/pages/index.astro src/pages/[lang]/index.astro
git mv src/pages/about.astro src/pages/[lang]/about.astro
git mv src/pages/projects.astro src/pages/[lang]/projects.astro
git mv src/pages/contact.astro src/pages/[lang]/contact.astro
git mv src/pages/experience.astro src/pages/[lang]/experience.astro
git mv src/pages/skills.astro src/pages/[lang]/skills.astro
```

- [ ] **Step 2: Verify files moved**

Run: `ls -la src/pages/[lang]/`
Expected: All 6 .astro files present

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor(i18n): move pages to [lang] dynamic routing"
```

---

### Task 5: Update index.astro with getStaticPaths and translations

**Files:**
- Modify: `src/pages/[lang]/index.astro`

- [ ] **Step 1: Update index.astro frontmatter**

```astro
---
import Layout from '../layouts/Layout.astro';
import { getTranslations, getStaticPathsForLocale } from '../../i18n/translations';

export function getStaticPaths() {
  return getStaticPathsForLocale();
}

const { lang } = Astro.params;
const t = await getTranslations(lang as 'en' | 'ru');
---
```

- [ ] **Step 2: Update template to use translations**

```astro
<Layout>
	<div class="flex min-h-screen">
		<nav class="fixed left-0 top-0 h-full w-16 bg-dark-amethyst flex flex-col items-center justify-center z-50">
			<div class="space-y-6">
				<span class="block w-3 h-3 rounded-full bg-tiger-flame"></span>
				<span class="block w-3 h-3 rounded-full bg-tiger-flame"></span>
				<span class="block w-3 h-3 rounded-full bg-tiger-flame"></span>
				<span class="block w-3 h-3 rounded-full bg-tiger-flame"></span>
				<span class="block w-3 h-3 rounded-full bg-tiger-flame"></span>
				<span class="block w-3 h-3 rounded-full bg-tiger-flame"></span>
			</div>
		</nav>
		
		<main class="flex-1 flex items-center justify-center pl-16">
			<div class="text-center">
				<h1 class="text-6xl md:text-8xl font-bold mb-4 text-white animate-fade-in-up">
					{t.home.greeting}
				</h1>
				<h2 class="text-xl text-dusty-denim animate-fade-in-up">
					{t.home.intro}
				</h2>
			</div>
		</main>
	</div>
</Layout>
```

- [ ] **Step 3: Test the page builds**

Run: `npm run build`
Expected: Build succeeds with `/en/` and `/ru/` versions

- [ ] **Step 4: Commit**

```bash
git add src/pages/[lang]/index.astro
git commit -m "feat(i18n): update index page with translations"
```

---

### Task 6: Update remaining pages with translations

**Files:**
- Modify: `src/pages/[lang]/about.astro`
- Modify: `src/pages/[lang]/projects.astro`
- Modify: `src/pages/[lang]/contact.astro`
- Modify: `src/pages/[lang]/experience.astro`
- Modify: `src/pages/[lang]/skills.astro`

- [ ] **Step 1: Update about.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import { getTranslations, getStaticPathsForLocale } from '../../i18n/translations';

export function getStaticPaths() {
  return getStaticPathsForLocale();
}

const { lang } = Astro.params;
const t = await getTranslations(lang as 'en' | 'ru');
---
```

Update title in template to use `{t.about.title}`.

- [ ] **Step 2: Update projects.astro**

Same pattern as about.astro, use `{t.projects.title}` in template.

- [ ] **Step 3: Update contact.astro**

Same pattern, use `{t.contact.title}`.

- [ ] **Step 4: Update experience.astro**

Same pattern, use `{t.experience.title}`.

- [ ] **Step 5: Update skills.astro**

Same pattern, use `{t.skills.title}`.

- [ ] **Step 6: Build and verify**

Run: `npm run build`
Expected: All pages build successfully for both languages

- [ ] **Step 7: Commit**

```bash
git add src/pages/[lang]/
git commit -m "feat(i18n): update all pages with translation support"
```

---

### Task 7: Add language switcher to Layout

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Add language switcher component to Layout**

Add before closing `</body>`:

```astro
<nav class="fixed bottom-4 right-4 flex gap-2 z-50">
  <a href={`/en${Astro.url.pathname.replace(/^\/(en|ru)/, '')}`} class={`px-3 py-1 rounded ${Astro.currentLocale === 'en' ? 'bg-tiger-flame text-white' : 'bg-gray-200'}`}>EN</a>
  <a href={`/ru${Astro.url.pathname.replace(/^\/(en|ru)/, '')}`} class={`px-3 py-1 rounded ${Astro.currentLocale === 'ru' ? 'bg-tiger-flame text-white' : 'bg-gray-200'}`}>RU</a>
</nav>
```

- [ ] **Step 2: Test switcher renders**

Run: `npm run dev`
Expected: Language switcher visible on all pages

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat(i18n): add language switcher to layout"
```

---

### Task 8: Create root redirect to /en/

**Files:**
- Create: `src/pages/index.astro` (root redirect)

- [ ] **Step 1: Create redirect file**

```astro
---
return Astro.redirect('/en/');
---
```

- [ ] **Step 2: Test redirect works**

Run: `npm run build && npm run preview`
Expected: Visiting `/` redirects to `/en/`

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(i18n): redirect root to /en/"
```

---

### Task 9: Final verification

- [ ] **Step 1: Full build test**

Run: `npm run build`
Expected: Clean build with all pages

- [ ] **Step 2: Check all routes exist**

Run: `ls -R dist/`
Expected: Both `/en/` and `/ru/` directories with all pages

- [ ] **Step 3: Check for missing translations**

Review build output for any undefined translation keys

- [ ] **Step 4: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix(i18n): final adjustments after testing"
```
