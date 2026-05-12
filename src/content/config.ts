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