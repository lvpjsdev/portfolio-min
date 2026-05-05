import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pagesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/skills' }),
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
