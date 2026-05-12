# CMS Implementation Plan: Astro Content Collections

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Перенести контент (проекты, опыт, навыки) из захардкоженных массивов в Astro Content Collections с JSON/MD файлами.

**Architecture:** Использовать встроенные Content Collections с Zod валидацией. Контент хранится в `src/content/{collection}/`. Каждая коллекция имеет поле `lang` для фильтрации по языку.

**Tech Stack:** Astro, Zod (встроен в Astro), TypeScript

---

## File Structure

```
src/
├── content/
│   ├── config.ts          (схемы коллекций)
│   ├── projects/          (JSON файлы)
│   ├── experience/       (JSON файлы)
│   ├── skills/           (JSON файлы)
│   └── posts/            (Markdown файлы, опционально)
└── pages/
    ├── projects.astro     → изменить
    ├── experience.astro   → изменить
    ├── skills.astro       → изменить (нужно проверить)
    └── [lang]/
        ├── projects.astro → изменить
        ├── experience.astro → изменить
        └── skills.astro   → изменить
```

---

## Task 1: Create Content Collections Config

**Files:**
- Create: `src/content/config.ts`

- [ ] **Step 1: Create src/content/config.ts**

```typescript
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    shortDescription: z.string(),
    fullDescription: z.string(),
    technologies: z.array(z.string()),
    liveUrl: z.string().optional(),
    codeUrl: z.string().optional(),
    lang: z.enum(['en', 'ru']),
  }),
});

const experienceCollection = defineCollection({
  type: 'data',
  schema: z.object({
    role: z.string(),
    company: z.string(),
    dates: z.string(),
    achievements: z.array(z.string()),
    isCurrent: z.boolean().optional(),
    lang: z.enum(['en', 'ru']),
  }),
});

const skillsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    category: z.string(),
    icon: z.string().optional(),
    lang: z.enum(['en', 'ru']),
  }),
});

export const collections = {
  projects: projectsCollection,
  experience: experienceCollection,
  skills: skillsCollection,
};
```

- [ ] **Step 2: Commit**
```bash
git add src/content/config.ts
git commit -m "feat: add content collections config with Zod schemas"
```

---

## Task 2: Create Projects Content

**Files:**
- Create: `src/content/projects/portfolio-website.json`
- Create: `src/content/projects/project-name.json`

- [ ] **Step 1: Create src/content/projects/portfolio-website.json**

```json
{
  "title": "Portfolio Website",
  "subtitle": "Personal Portfolio",
  "shortDescription": "A modern portfolio website built with Astro and a custom design system.",
  "fullDescription": "A fully responsive portfolio website built with Astro, featuring a custom design system with CSS tokens, dark/light theme support, and accessible components.",
  "technologies": ["Astro", "TypeScript", "CSS", "Terrazzo"],
  "liveUrl": "https://example.com",
  "codeUrl": "https://github.com/example/portfolio",
  "lang": "en"
}
```

- [ ] **Step 2: Create src/content/projects/portfolio-website-ru.json**

```json
{
  "title": "Сайт-портфолио",
  "subtitle": "Персональное портфолио",
  "shortDescription": "Современный сайт-портфолио на Astro с собственной дизайн-системой.",
  "fullDescription": "Полностью адаптивный сайт-портфолио, созданный на Astro, с дизайн-системой на базе CSS-токенов, поддержкой тёмной/светлой темы и доступных компонентов.",
  "technologies": ["Astro", "TypeScript", "CSS", "Terrazzo"],
  "liveUrl": "https://example.com",
  "codeUrl": "https://github.com/example/portfolio",
  "lang": "ru"
}
```

- [ ] **Step 3: Create src/content/projects/project-name.json**
```json
{
  "title": "Project Name",
  "subtitle": "Web Application",
  "shortDescription": "Description of the project and technologies used.",
  "fullDescription": "A detailed description of the project, its goals, challenges, and outcomes. Built with modern web technologies.",
  "technologies": ["React", "Node.js", "PostgreSQL"],
  "codeUrl": "https://github.com/example/project",
  "lang": "en"
}
```

- [ ] **Step 4: Create src/content/projects/project-name-ru.json**
```json
{
  "title": "Название проекта",
  "subtitle": "Веб-приложение",
  "shortDescription": "Описание проекта и используемых технологий.",
  "fullDescription": "Подробное описание проекта, его целей, проблем и результатов. Создано с использованием современных веб-технологий.",
  "technologies": ["React", "Node.js", "PostgreSQL"],
  "codeUrl": "https://github.com/example/project",
  "lang": "ru"
}
```

- [ ] **Step 5: Commit**
```bash
git add src/content/projects/
git commit -m "feat: add projects content collection"
```

---

## Task 3: Create Experience Content

**Files:**
- Create: `src/content/experience/senior-frontend.json` (2 файла en/ru)
- Create: `src/content/experience/frontend-developer.json` (2 файла en/ru)

- [ ] **Step 1: Create src/content/experience/senior-frontend.json**
```json
{
  "role": "Senior Frontend Developer",
  "company": "Company",
  "dates": "2022 – Present",
  "isCurrent": true,
  "achievements": [
    "Led development of key product features",
    "Improved performance by 40%",
    "Mentored junior developers"
  ],
  "lang": "en"
}
```

- [ ] **Step 2: Create src/content/experience/senior-frontend-ru.json**
```json
{
  "role": "Senior Frontend Developer",
  "company": "Company",
  "dates": "2022 – настоящее время",
  "isCurrent": true,
  "achievements": [
    "Руководил разработкой ключевых функций продукта",
    "Улучшил производительность на 40%",
    "Менторил младших разработчиков"
  ],
  "lang": "ru"
}
```

- [ ] **Step 3: Create src/content/experience/frontend-developer.json**
```json
{
  "role": "Frontend Developer",
  "company": "Company",
  "dates": "2020 – 2022",
  "achievements": [
    "Built responsive web applications",
    "Collaborated with design team",
    "Implemented CI/CD pipelines"
  ],
  "lang": "en"
}
```

- [ ] **Step 4: Create src/content/experience/frontend-developer-ru.json**
```json
{
  "role": "Frontend-разработчик",
  "company": "Company",
  "dates": "2020 – 2022",
  "achievements": [
    "Создавал адаптивные веб-приложения",
    "Работал с командой дизайнеров",
    "Внедрил CI/CD пайплайны"
  ],
  "lang": "ru"
}
```

- [ ] **Step 5: Commit**
```bash
git add src/content/experience/
git commit -m "feat: add experience content collection"
```

---

## Task 4: Create Skills Content

**Files:**
- Create: `src/content/skills/*.json` (по одному файлу на каждый навык, en/ru)

**Note:** Сначала нужно проверить текущую страницу skills.astro чтобы понять структуру навыков.

- [ ] **Step 1: Check src/pages/skills.astro for current structure**
```bash
cat src/pages/skills.astro
```
(Скопировать структуру оттуда)

- [ ] **Step 2: Create skill JSON files** (по одному на каждый навык, с версиями en/ru)

Пример для frontend навыков:
```json
{
  "name": "TypeScript",
  "category": "frontend",
  "lang": "en"
}
```

- [ ] **Step 3: Commit**
```bash
git add src/content/skills/
git commit -m "feat: add skills content collection"
```

---

## Task 5: Update Projects Page (Non-Localized)

**Files:**
- Modify: `src/pages/projects.astro:5-35` (заменить hardcoded массив на getCollection)

- [ ] **Step 1: Modify src/pages/projects.astro**

Заменить строки 5-35:
```astro
---
import Layout from '../layouts/Layout.astro';
import ProjectCard from '../components/ProjectCard.astro';
import { getCollection } from 'astro:content';

const projects = await getCollection('projects');
---

<Layout currentPage="projects" title="Portfolio — Projects">
  <section class="page-section">
    <div class="section-header">
      <h1 class="section-title">Projects</h1>
      <div class="section-divider"></div>
    </div>
    <div class="cards-list">
      {projects.map((project) => (
        <ProjectCard
          title={project.data.title}
          subtitle={project.data.subtitle}
          shortDescription={project.data.shortDescription}
          fullDescription={project.data.fullDescription}
          technologies={project.data.technologies}
          liveUrl={project.data.liveUrl}
          codeUrl={project.data.codeUrl}
        />
      ))}
    </div>
  </section>
</Layout>
```

- [ ] **Step 2: Commit**
```bash
git add src/pages/projects.astro
git commit -m "refactor: use content collections for projects"
```

---

## Task 6: Update Projects Page (Localized)

**Files:**
- Modify: `src/pages/[lang]/projects.astro:1-52`

- [ ] **Step 1: Modify src/pages/[lang]/projects.astro**

Заменить строки 1-52:
```astro
---
import Layout from '../../layouts/Layout.astro';
import ProjectCard from '../../components/ProjectCard.astro';
import { getCollection } from 'astro:content';

export function getStaticPaths() {
  return [
    { params: { lang: 'en' } },
    { params: { lang: 'ru' } },
  ];
}

const { lang } = Astro.params;
const allProjects = await getCollection('projects');
const projects = allProjects.filter(p => p.data.lang === lang);
---

<Layout currentPage="projects" lang={lang} title="Portfolio — Projects">
  <section class="page-section">
    <div class="section-header">
      <h1 class="section-title">Projects</h1>
      <div class="section-divider"></div>
    </div>
    <div class="cards-list">
      {projects.map((project) => (
        <ProjectCard
          title={project.data.title}
          subtitle={project.data.subtitle}
          shortDescription={project.data.shortDescription}
          fullDescription={project.data.fullDescription}
          technologies={project.data.technologies}
          liveUrl={project.data.liveUrl}
          codeUrl={project.data.codeUrl}
        />
      ))}
    </div>
  </section>
</Layout>
```

- [ ] **Step 2: Commit**
```bash
git add src/pages/\[lang\]/projects.astro
git commit -m "refactor: use content collections for localized projects"
```

---

## Task 7: Update Experience Page (Non-Localized)

**Files:**
- Modify: `src/pages/experience.astro`

- [ ] **Step 1: Modify src/pages/experience.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import ExperienceCard from '../components/ExperienceCard.astro';
import { getCollection } from 'astro:content';

const experiences = await getCollection('experience');
---

<Layout currentPage="experience" title="Portfolio — Work Experience">
  <section class="page-section">
    <div class="section-header">
      <h1 class="section-title">Work Experience</h1>
      <div class="section-divider"></div>
    </div>
    <div class="cards-list">
      {experiences.map((exp) => (
        <ExperienceCard
          role={exp.data.role}
          company={exp.data.company}
          dates={exp.data.dates}
          achievements={exp.data.achievements}
          isCurrent={exp.data.isCurrent}
        />
      ))}
    </div>
  </section>
</Layout>
```

- [ ] **Step 2: Commit**
```bash
git add src/pages/experience.astro
git commit -m "refactor: use content collections for experience"
```

---

## Task 8: Update Experience Page (Localized)

**Files:**
- Modify: `src/pages/[lang]/experience.astro`

- [ ] **Step 1: Modify src/pages/[lang]/experience.astro**

```astro
---
import Layout from '../../layouts/Layout.astro';
import ExperienceCard from '../../components/ExperienceCard.astro';
import { getCollection } from 'astro:content';

export function getStaticPaths() {
  return [
    { params: { lang: 'en' } },
    { params: { lang: 'ru' } },
  ];
}

const { lang } = Astro.params;
const allExperience = await getCollection('experience');
const experiences = allExperience.filter(e => e.data.lang === lang);
---

<Layout currentPage="experience" lang={lang} title="Portfolio — Work Experience">
  <section class="page-section">
    <div class="section-header">
      <h1 class="section-title">Work Experience</h1>
      <div class="section-divider"></div>
    </div>
    <div class="cards-list">
      {experiences.map((exp) => (
        <ExperienceCard
          role={exp.data.role}
          company={exp.data.company}
          dates={exp.data.dates}
          achievements={exp.data.achievements}
          isCurrent={exp.data.isCurrent}
        />
      ))}
    </div>
  </section>
</Layout>
```

- [ ] **Step 2: Commit**
```bash
git add src/pages/\[lang\]/experience.astro
git commit -m "refactor: use content collections for localized experience"
```

---

## Task 9: Update Skills Pages

**Files:**
- Modify: `src/pages/skills.astro`
- Modify: `src/pages/[lang]/skills.astro`

- [ ] **Step 1: Check src/pages/skills.astro structure**
```bash
cat src/pages/skills.astro
```

- [ ] **Step 2: Modify skills pages** (по аналогии с projects/experience, используя getCollection и фильтрацию по lang)

- [ ] **Step 3: Commit**
```bash
git add src/pages/skills.astro src/pages/\[lang\]/skills.astro
git commit -m "refactor: use content collections for skills"
```

---

## Task 10: Verify Build

- [ ] **Step 1: Run build**
```bash
pnpm build
```

- [ ] **Step 2: Run dev and verify pages**
```bash
pnpm dev
```
(Проверить http://localhost:4321/projects, http://localhost:4321/en/projects, http://localhost:4321/ru/projects)

- [ ] **Step 3: Commit final**
```bash
git add -A
git commit -m "feat: complete CMS with content collections"
```