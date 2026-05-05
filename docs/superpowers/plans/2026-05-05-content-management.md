# Content Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate hardcoded content in Astro pages to Markdown files using Astro Content Collections.

**Architecture:** Use Astro's native Content Collections with Zod schemas in `src/content/config.ts`. Create collections for `pages` (About, Experience, Contact), `projects`, and `skills`. Update `.astro` pages to fetch data via `getCollection()`.

**Tech Stack:** Astro 6.x, Zod (built-in), Markdown with frontmatter.

---

### Task 1: Set up Content Collections config

**Files:**
- Create: `src/content/config.ts`

- [ ] **Step 1: Create the content config file with Zod schemas**

```typescript
import { defineCollection, z } from 'astro:content';

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const skillsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    items: z.array(z.string()).default([]),
  }),
});

export const collections = {
  pages: pagesCollection,
  projects: projectsCollection,
  skills: skillsCollection,
};
```

- [ ] **Step 2: Verify the config loads**

Run: `cd tasty-transit && npm run build`
Expected: Build succeeds (may have warnings about missing content dirs, that's fine).

- [ ] **Step 3: Commit**

```bash
git add src/content/config.ts
git commit -m "feat: add content collections config with Zod schemas"
```

---

### Task 2: Create Markdown files for Pages collection

**Files:**
- Create: `src/content/pages/about.md`
- Create: `src/content/pages/experience.md`
- Create: `src/content/pages/contact.md`

- [ ] **Step 1: Create about.md with current content**

```markdown
---
title: About Me
---

## About Me

Hello, world!

I'm a web developer with experience in building modern web applications.
```

- [ ] **Step 2: Create experience.md with current content**

```markdown
---
title: Work Experience
---

## Work Experience

### Senior Frontend Developer
**Company • 2022 - Present**

Description of role and achievements...

### Frontend Developer
**Company • 2020 - 2022**

Description of role and achievements...
```

- [ ] **Step 3: Create contact.md with current content**

```markdown
---
title: Contact
---

## Contact

Get in touch via email or social media.

**Email:** [hello@example.com](mailto:hello@example.com)
```

- [ ] **Step 4: Commit**

```bash
git add src/content/pages/
git commit -m "feat: add Markdown content for pages (about, experience, contact)"
```

---

### Task 3: Create Markdown files for Projects collection

**Files:**
- Create: `src/content/projects/portfolio-website.md`

- [ ] **Step 1: Create a sample project file**

```markdown
---
title: Project Name
description: Description of the project and technologies used...
tags: [TypeScript, React, Astro]
featured: true
---

This is a sample project page. You can add more details here.
```

- [ ] **Step 2: Commit**

```bash
git add src/content/projects/
git commit -m "feat: add sample project to projects collection"
```

---

### Task 4: Create Markdown files for Skills collection

**Files:**
- Create: `src/content/skills/web-technologies.md`

- [ ] **Step 1: Create web-technologies.md**

```markdown
---
title: Web Technologies
items: [TypeScript, React, Astro]
---
```

- [ ] **Step 2: Commit**

```bash
git add src/content/skills/
git commit -m "feat: add skills categories to skills collection"
```

---

### Task 5: Update Layout.astro with sidebar navigation

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Read current Layout.astro**

```bash
cat src/layouts/Layout.astro
```

- [ ] **Step 2: Update Layout.astro to include sidebar and accept page content as slot**

```astro
---
const { title } = Astro.props;
const currentPath = Astro.url.pathname;
---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title || 'Portfolio'}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <div class="flex min-h-screen">
      <nav class="fixed left-0 top-0 h-full w-16 bg-dark-amethyst flex flex-col items-center justify-center z-50">
        <div class="space-y-6">
          <a href="/" class={`block w-3 h-3 rounded-full ${currentPath === '/' ? 'bg-white' : 'bg-tiger-flame'} transition-all hover:scale-150`} title="Home"></a>
          <a href="/about" class={`block w-3 h-3 rounded-full ${currentPath === '/about' ? 'bg-white' : 'bg-tiger-flame'} transition-all hover:scale-150`} title="About"></a>
          <a href="/experience" class={`block w-3 h-3 rounded-full ${currentPath === '/experience' ? 'bg-white' : 'bg-tiger-flame'} transition-all hover:scale-150`} title="Experience"></a>
          <a href="/projects" class={`block w-3 h-3 rounded-full ${currentPath === '/projects' ? 'bg-white' : 'bg-tiger-flame'} transition-all hover:scale-150`} title="Projects"></a>
          <a href="/skills" class={`block w-3 h-3 rounded-full ${currentPath === '/skills' ? 'bg-white' : 'bg-tiger-flame'} transition-all hover:scale-150`} title="Skills"></a>
          <a href="/contact" class={`block w-3 h-3 rounded-full ${currentPath === '/contact' ? 'bg-white' : 'bg-tiger-flame'} transition-all hover:scale-150`} title="Contact"></a>
        </div>
      </nav>
      
      <main class="flex-1 pl-16">
        <slot />
      </main>
    </div>
  </body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "refactor: move sidebar navigation to Layout.astro with active state"
```

---

### Task 6: Update pages to use getCollection (About, Experience, Contact)

**Files:**
- Modify: `src/pages/about.astro`
- Modify: `src/pages/experience.astro`
- Modify: `src/pages/contact.astro`

- [ ] **Step 1: Update about.astro to fetch from pages collection**

```astro
---
import Layout from '../layouts/Layout.astro';
import { getCollection } from 'astro:content';

const pages = await getCollection('pages');
const aboutPage = pages.find(p => p.slug === 'about');

let Content;
if (!aboutPage) {
  Content = () => <p class="text-dusty-denim">Content is being updated</p>;
} else {
  const { Content: RenderedContent } = await aboutPage.render();
  Content = RenderedContent;
}
---

<Layout title="About">
  <div class="py-16 pr-8 pl-8">
    <h1 class="text-4xl font-bold mb-8 text-white">{aboutPage?.data.title || 'About Me'}</h1>
    <div class="max-w-3xl text-lg text-dusty-denim">
      <Content />
    </div>
  </div>
</Layout>
```

- [ ] **Step 2: Update experience.astro similarly**

```astro
---
import Layout from '../layouts/Layout.astro';
import { getCollection } from 'astro:content';

const pages = await getCollection('pages');
const expPage = pages.find(p => p.slug === 'experience');

let Content;
if (!expPage) {
  Content = () => <p class="text-dusty-denim">Content is being updated</p>;
} else {
  const { Content: RenderedContent } = await expPage.render();
  Content = RenderedContent;
}
---

<Layout title="Experience">
  <div class="py-16 pr-8 pl-8">
    <h1 class="text-4xl font-bold mb-8 text-white">{expPage?.data.title || 'Work Experience'}</h1>
    <div class="space-y-8 text-dusty-denim">
      <Content />
    </div>
  </div>
</Layout>
```

- [ ] **Step 3: Update contact.astro similarly**

```astro
---
import Layout from '../layouts/Layout.astro';
import { getCollection } from 'astro:content';

const pages = await getCollection('pages');
const contactPage = pages.find(p => p.slug === 'contact');

let Content;
if (!contactPage) {
  Content = () => <p class="text-dusty-denim">Content is being updated</p>;
} else {
  const { Content: RenderedContent } = await contactPage.render();
  Content = RenderedContent;
}
---

<Layout title="Contact">
  <div class="py-16 pr-8 pl-8">
    <h1 class="text-4xl font-bold mb-8 text-white">{contactPage?.data.title || 'Contact'}</h1>
    <div class="space-y-4 text-dusty-denim">
      <Content />
    </div>
  </div>
</Layout>
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/about.astro src/pages/experience.astro src/pages/contact.astro
git commit -m "feat: update pages to use content collections with stub fallback"
```

---

### Task 7: Update projects.astro to use getCollection

**Files:**
- Modify: `src/pages/projects.astro`

- [ ] **Step 1: Update projects.astro to fetch from projects collection**

```astro
---
import Layout from '../layouts/Layout.astro';
import { getCollection } from 'astro:content';

const projects = await getCollection('projects');
const sortedProjects = projects.sort((a, b) => {
  if (a.data.featured && !b.data.featured) return -1;
  if (!a.data.featured && b.data.featured) return 1;
  return a.data.title.localeCompare(b.data.title);
});
---

<Layout title="Projects">
  <div class="py-16 pr-8 pl-8">
    <h1 class="text-4xl font-bold mb-8 text-white">Projects</h1>
    <div class="space-y-6">
      {sortedProjects.length === 0 ? (
        <p class="text-dusty-denim">No projects yet. Add some in src/content/projects/</p>
      ) : (
        sortedProjects.map(project => (
          <div class="border border-dark-amethyst rounded-lg p-6 hover:border-tiger-flame transition-all cursor-pointer">
            <h3 class="text-xl font-bold text-white">{project.data.title}</h3>
            <p class="text-dusty-denim mt-2">{project.data.description}</p>
            {project.data.tags.length > 0 && (
              <div class="flex flex-wrap gap-2 mt-3">
                {project.data.tags.map(tag => (
                  <span class="px-3 py-1 bg-dark-amethyst text-tiger-flame rounded-full text-sm">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  </div>
</Layout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/projects.astro
git commit -m "feat: update projects page to use content collections"
```

---

### Task 8: Update skills.astro to use getCollection

**Files:**
- Modify: `src/pages/skills.astro`

- [ ] **Step 1: Update skills.astro to fetch from skills collection**

```astro
---
import Layout from '../layouts/Layout.astro';
import { getCollection } from 'astro:content';

const skills = await getCollection('skills');
---

<Layout title="Skills">
  <div class="py-16 pr-8 pl-8">
    <h1 class="text-4xl font-bold mb-8 text-white">Skills</h1>
    <div class="space-y-6">
      {skills.length === 0 ? (
        <p class="text-dusty-denim">No skills yet. Add some in src/content/skills/</p>
      ) : (
        skills.map(category => (
          <div>
            <h3 class="text-lg font-semibold text-white mb-3">{category.data.title}</h3>
            <div class="flex flex-wrap gap-2">
              {category.data.items.map(item => (
                <span class="px-3 py-1 bg-dark-amethyst text-tiger-flame rounded-full text-sm">{item}</span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</Layout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/skills.astro
git commit -m "feat: update skills page to use content collections"
```

---

### Task 9: Verify build and clean up

- [ ] **Step 1: Run build to verify everything works**

Run: `cd tasty-transit && npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Run dev server to manually verify**

Run: `cd tasty-transit && npm run dev`
Expected: Site loads, all pages show content from Markdown files.

- [ ] **Step 3: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: final adjustments after content migration"
```

---

## Self-Review Checklist

1. **Spec coverage:** 
   - [x] Pages collection (about, experience, contact) - Task 2, 6
   - [x] Projects collection - Task 3, 7
   - [x] Skills collection - Task 4, 8
   - [x] Content schemas with Zod - Task 1
   - [x] Stub/empty state for missing content - Task 6
   - [x] Sidebar navigation in Layout - Task 5

2. **Placeholder scan:** No placeholders found. All code is complete.

3. **Type consistency:** All collection names (`pages`, `projects`, `skills`) match between config.ts and getCollection() calls.
