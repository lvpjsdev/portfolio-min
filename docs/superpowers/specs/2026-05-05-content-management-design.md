# Content Management Design

**Date:** 2026-05-05  
**Project:** brave-planet (Astro portfolio)  
**Status:** Approved

## 1. Feature Summary

Transition the brave-planet Astro portfolio from hardcoded content in `.astro` files to a Markdown-first content management approach using Astro Content Collections. This enables non-destructive content updates by editing Markdown files instead of modifying component code. The system covers all site sections: About, Experience, Contact (as single pages), and Projects and Skills (as collections of items).

## 2. Primary User Action

Update site content (text, projects, skills) by editing or adding Markdown files in `src/content/`, without touching `.astro` components.

## 3. Design Direction

Follow Astro's native Content Collections pattern. The design should feel "invisible" — the user edits files in a structured folder, and the site rebuilds. Maintain the existing visual style (dark theme, sidebar navigation) while making the underlying data source flexible.

## 4. Architecture

### 4.1 Folder Structure
```
src/
  content/
    pages/
      about.md
      experience.md
      contact.md
    projects/
      project-name-1.md
      project-name-2.md
    skills/
      web-technologies.md
      backend.md
  pages/
    about.astro
    experience.astro
    projects.astro
    skills.astro
  content.config.ts  (schemas)
```

### 4.2 Data Flow
1. **Build time:** Astro reads `src/content/` using `getCollection()`.
2. **Pages:** `.astro` files query the specific collection (e.g., `getCollection('pages')`) and find the entry by slug.
3. **Collections:** For Projects/Skills, iterate over the array returned by `getCollection()` and render cards/lists.
4. **Rendering:** Use `entry.render()` to get the `<Content />` component for Markdown body.

## 5. Content Schemas (`src/content/config.ts`)

### 5.1 Pages Collection
```typescript
pages: defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
})
```
- Markdown body contains the page content.

### 5.2 Projects Collection
```typescript
projects: defineCollection({
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
})
```

### 5.3 Skills Collection
```typescript
skills: defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    items: z.array(z.string()).default([]),
  }),
})
```

## 6. Key States & Error Handling

| State | Behavior |
|-------|----------|
| Content found | Render page/project/skill normally |
| Content not found (e.g., `about.md` missing) | Show a stub/empty state: "Content is being updated" |
| Invalid frontmatter | Astro build fails with Zod validation error (intentional) |
| Empty collection (no projects) | Render empty state or hide section |

## 7. Component Updates

### 7.1 Layout.astro
- Move sidebar navigation out of individual pages and into `Layout.astro`.
- Use `Astro.url.pathname` to determine active page and highlight the corresponding dot.

### 7.2 Page Files (e.g., about.astro)
- Import `getCollection('pages')`.
- Find entry: `pages.find(p => p.slug === 'about')`.
- If not found, render stub. Otherwise, render `<Content />` from `entry.render()`.

### 7.3 Projects.astro
- Import `getCollection('projects')`.
- Sort: featured first, then by title.
- Render list of project cards with title, description, tags, and optional links.

### 7.4 Skills.astro
- Import `getCollection('skills')`.
- Iterate over categories, render title + tags list for each.

## 8. Success Criteria

1. All existing content is moved to Markdown files in `src/content/`.
2. Site builds without errors (`npm run build`).
3. Editing a `.md` file and rebuilding updates the site content.
4. Adding a new `project.md` automatically appears on the projects page.
5. Missing content files show a user-friendly stub instead of crashing.

## 9. Open Questions

- Should the `experience.md` page use nested list items for job positions, or should Experience also become a collection? (Current decision: single file).
- Should the sidebar navigation be dynamically generated from `pages` collection? (Current decision: hardcoded in Layout.astro for simplicity).
