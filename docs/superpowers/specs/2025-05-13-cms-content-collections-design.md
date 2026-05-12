# CMS Design: Astro Content Collections

## Overview

Использовать встроенные Astro Content Collections для управления контентом сайта. Контент хранится как MD/JSON файлы в `src/content/`, с типизацией через Zod.

## Types

| Коллекция | Формат | Назначение |
|-----------|--------|------------|
| `projects` | JSON | Проекты в портфолио |
| `experience` | JSON | Опыт работы |
| `skills` | JSON | Навыки |
| `posts` | Markdown | Блог/статьи |

## Schema

### Projects
```typescript
{
  id: string,
  title: string,
  description: string,
  tech: string[],
  links: { github?: string, demo?: string },
  image?: string,
  lang: 'en' | 'ru'
}
```

### Experience
```typescript
{
  id: string,
  company: string,
  role: string,
  period: string,
  description: string,
  lang: 'en' | 'ru'
}
```

### Skills
```typescript
{
  id: string,
  name: string,
  category: string,
  icon?: string,
  lang: 'en' | 'ru'
}
```

### Posts (Markdown)
Frontmatter: title, date, description, tags, lang

## Migration

1. Создать `src/content/config.ts` с Zod схемами
2. Создать файлы контента в `src/content/{collection}/`
3. Обновить компоненты: использовать `getCollection()` API
4. Удалить/архивировать старые данные из `src/locales/`

## Files to Modify

- `src/content/config.ts` (new)
- `src/content/projects/*.json` (new)
- `src/content/experience/*.json` (new)
- `src/content/skills/*.json` (new)
- `src/content/posts/*.md` (new)
- Components: ProjectCard, ExperienceCard, SkillTag и т.д.