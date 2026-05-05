# Implementation Plan: Design System Components

## Overview

Реализация переиспользуемых Astro-компонентов дизайн-системы портфолио-сайта. Текущие страницы используют дублированный inline HTML с Tailwind-классами и хардкодом цветов. Цель — создать 7 новых компонентов, обновить Layout и все 6 страниц, покрыв всё property-based тестами через Vitest + fast-check.

Порядок реализации: атомарные компоненты → составные → Layout → страницы → тесты.

## Tasks

- [x] 1. Настроить тестовое окружение
  - Установить `vitest`, `@testing-library/dom`, `@testing-library/jest-dom`, `fast-check` как devDependencies
  - Создать `vitest.config.ts` с настройкой `environment: 'jsdom'` и `globals: true`
  - Добавить скрипт `"test": "vitest --run"` в `package.json`
  - Создать директорию `src/components/__tests__/` для тестовых файлов
  - _Requirements: 10.1_

- [x] 2. Реализовать компонент NavDot
  - [x] 2.1 Создать `src/components/NavDot.astro`
    - Props: `active: boolean`, `href: string`, `label: string`
    - Размер 10×10px, `border-radius: var(--border-radius-full)`
    - Цвет активный: `var(--color-primitive-white)`, неактивный: `var(--color-primitive-twilight-indigo)`
    - Hover: `transform: scale(1.5)`, transition `var(--duration-fast)`
    - Атрибуты: `aria-label={label}`, `aria-current={active ? 'page' : undefined}`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [x] 2.2 Написать unit-тесты для NavDot
    - Проверить рендеринг круга 10×10px
    - Проверить применение активных/неактивных стилей по пропу `active`
    - Проверить наличие `aria-label` и `aria-current`
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 3. Реализовать компонент Sidebar
  - [x] 3.1 Создать `src/components/Sidebar.astro`
    - Props: `currentPage: 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact'`
    - Фиксированная панель: `position: fixed`, `left: 0`, `top: 0`, `width: 64px`, `height: 100vh`
    - Background: `var(--color-background-surface)`, `z-index: 100`
    - Статический массив `navItems` с 6 элементами (id, href, label)
    - Рендерить NavDot для каждого элемента с `active={currentPage === item.id}`
    - CSS-expand при hover: `width: 240px`, transition `var(--duration-normal)`
    - Текстовые метки NavItem с `opacity: 0` → `opacity: 1` при hover
    - Мобильная адаптация: `display: none` при `< 768px`, горизонтальная навбар вместо него
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 11.1_

  - [x] 3.2 Написать property-тест для Sidebar — Property 1: активный NavDot соответствует currentPage
    - **Property 1: Active NavDot matches currentPage**
    - Для любого валидного `currentPage` из 6 значений ровно один NavDot имеет `active=true` и соответствует переданному `currentPage`
    - Использовать `fc.constantFrom('home', 'about', 'experience', 'projects', 'skills', 'contact')`
    - **Validates: Requirements 1.4, 1.5, 2.3, 2.4**

  - [x] 3.3 Написать property-тест для Sidebar — Property 2: навигационные ссылки корректны
    - **Property 2: Navigation hrefs are correct**
    - Для любого NavItem атрибут `href` равен ожидаемому URL (`home` → `/`, `about` → `/about`, и т.д.)
    - Использовать `fc.constantFrom(...navItems)` и проверять соответствие href
    - **Validates: Requirements 1.8**

- [x] 4. Реализовать компонент SkillTag
  - [x] 4.1 Создать `src/components/SkillTag.astro`
    - Props: `label: string`, `accent?: boolean`
    - Display: `inline-flex`, padding: `6px 12px`
    - Border-radius: `var(--border-radius-sm)`
    - Background default: `var(--color-primitive-twilight-indigo)`, accent: `var(--color-interactive-primary)`
    - Text: `var(--color-primitive-white)`, `var(--font-size-xs)`
    - Hover: `opacity: 0.8`, transition `var(--duration-fast)`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [x] 4.2 Написать unit-тесты для SkillTag
    - Проверить рендеринг label
    - Проверить применение accent-фона при `accent=true`
    - Проверить default-фон при `accent=false` или отсутствии пропа
    - _Requirements: 3.3, 3.5_

- [x] 5. Реализовать компонент ExperienceCard
  - [x] 5.1 Создать `src/components/ExperienceCard.astro`
    - Props: `role: string`, `company: string`, `dates: string`, `achievements: string[]`, `isCurrent?: boolean`
    - Collapsed state: горизонтальный layout, padding `20px 24px`, `border-radius: var(--border-radius-lg)`, background `var(--color-background-surface)`
    - Левая часть: role (`var(--font-size-base)`, bold), company (`var(--font-size-xs)`, `var(--color-interactive-secondary)`), dates (`var(--font-size-xs)`, `var(--color-text-secondary)`)
    - Правая часть: chevron-right SVG, 20×20px, `var(--color-text-secondary)`
    - Hover: background `#4a2f5e` (локальная CSS-переменная `--card-hover-bg`), chevron `var(--color-interactive-primary)`, transition `var(--duration-fast)`
    - Expanded state: chevron rotate(90deg), divider 1px `var(--color-primitive-twilight-indigo)`, секция достижений
    - Атрибуты: `role="button"`, `tabindex="0"`, `aria-expanded="false"`, `aria-label="{role} at {company}"`
    - JS-accordion: делегированный обработчик на `document`, переключает класс `is-expanded` и `aria-expanded`
    - Keyboard: Enter и Space переключают состояние
    - Анимация expand/collapse: `max-height` transition `var(--duration-normal)`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.11_

  - [x] 5.2 Написать property-тест для ExperienceCard — Property 3: expand раскрывает все достижения
    - **Property 3: ExperienceCard expand reveals all achievements**
    - Для любого непустого массива строк `achievements`, после симуляции клика все строки видны в DOM, `aria-expanded="true"`, chevron указывает вниз
    - Использовать `fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 10 })`
    - **Validates: Requirements 4.4, 4.5**

  - [x] 5.3 Написать property-тест для ExperienceCard — Property 4: collapse round-trip
    - **Property 4: ExperienceCard collapse round-trip**
    - После двух последовательных кликов (expand → collapse) компонент возвращается в исходное состояние: `aria-expanded="false"`, тело скрыто, chevron вправо
    - Использовать `fc.array(fc.string({ minLength: 1 }), { minLength: 1 })`
    - **Validates: Requirements 4.6**

  - [x] 5.4 Написать property-тест для ExperienceCard — Property 5: ARIA-атрибуты отражают реальное состояние
    - **Property 5: Accordion ARIA attributes always reflect actual state**
    - `aria-expanded` всегда точно соответствует фактическому состоянию; Enter и Space корректно переключают состояние
    - Тестировать как клик, так и клавиатурные события
    - **Validates: Requirements 4.9, 4.10**

- [x] 6. Реализовать компонент ProjectCard
  - [x] 6.1 Создать `src/components/ProjectCard.astro`
    - Props: `title: string`, `subtitle: string`, `shortDescription: string`, `fullDescription: string`, `technologies: string[]`, `liveUrl?: string`, `codeUrl?: string`
    - Collapsed state: вертикальный layout, gap 12px, padding `20px 24px`, `border-radius: var(--border-radius-lg)`, background `var(--color-background-surface)`
    - Header row: title (bold, `var(--font-size-base)`), subtitle (`var(--font-size-xs)`, `var(--color-interactive-secondary)`), chevron-right
    - Short description: `var(--font-size-xs)`, `var(--color-text-secondary)`, line-height 1.6
    - Technology tags: flex-wrap, gap 8px (стиль SkillTag, без импорта компонента — inline стили)
    - Expanded state: chevron rotate(90deg), divider, секция описания, секция технологий, секция ссылок
    - Live Demo кнопка (только если `liveUrl`): background `var(--color-interactive-primary)`, padding `10px 16px`, `border-radius: var(--border-radius-md)`
    - View Code кнопка (только если `codeUrl`): background `var(--color-primitive-twilight-indigo)`, те же размеры
    - Атрибуты: `role="button"`, `tabindex="0"`, `aria-expanded="false"`
    - JS-accordion аналогично ExperienceCard; keyboard: Enter и Space
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 5.11, 5.12_

  - [x] 6.2 Написать property-тест для ProjectCard — Property 5 (ProjectCard): ARIA-атрибуты
    - **Property 5: Accordion ARIA attributes always reflect actual state (ProjectCard)**
    - `aria-expanded` всегда соответствует состоянию; Enter и Space переключают состояние
    - **Validates: Requirements 5.10, 5.11**

  - [x] 6.3 Написать property-тест для ProjectCard — Property 6: опциональные ссылки
    - **Property 6: ProjectCard optional links render only when prop is provided**
    - Для любой комбинации `liveUrl` (присутствует/отсутствует) и `codeUrl` (присутствует/отсутствует): кнопка "Live Demo" присутствует тогда и только тогда, когда `liveUrl` передан; аналогично для "View Code"
    - Использовать `fc.option(fc.webUrl())` для обоих пропов
    - **Validates: Requirements 5.7, 5.8**

- [x] 7. Реализовать компонент ContactLink
  - [x] 7.1 Создать `src/components/ContactLink.astro`
    - Props: `type: 'email' | 'linkedin' | 'github' | 'instagram'`, `label: string`, `value: string`
    - Display: flex, `align-items: center`, gap 16px, padding `20px 24px`
    - Border-radius: `var(--border-radius-lg)`, background `var(--color-background-surface)`
    - Inline SVG иконки из Lucide для каждого типа (mail, linkedin, github, instagram), 24×24px, `var(--color-interactive-primary)`
    - Text: `var(--font-size-sm)`, `var(--color-text-primary)`
    - Hover: `transform: translateY(-2px)`, transition `var(--duration-normal)`
    - href логика: `email` → `mailto:{value}`, остальные → `{value}` с `target="_blank" rel="noopener noreferrer"`
    - Fallback для неизвестного type: generic link icon, href как обычная ссылка
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8_

  - [x] 7.2 Написать property-тест для ContactLink — Property 7: href корректен для любого типа
    - **Property 7: ContactLink href is correct for any type and value**
    - Для типов `linkedin`, `github`, `instagram` с любым URL: `href === value`, `target="_blank"`
    - Для типа `email` с любым email-адресом: `href === "mailto:{value}"`
    - Использовать `fc.constantFrom('linkedin', 'github', 'instagram')` + `fc.webUrl()` и отдельно `fc.emailAddress()`
    - **Validates: Requirements 6.6, 6.7**

- [x] 8. Реализовать компонент ThemeToggle
  - [x] 8.1 Создать `src/components/ThemeToggle.astro`
    - Нет пропов (standalone компонент)
    - Display: flex, `align-items: center`, gap 6px, padding `7px 14px`
    - Border-radius: `var(--border-radius-full)`, background `var(--color-primitive-twilight-indigo)`
    - Moon SVG (16×16px) + текст "Dark" в dark-теме; Sun SVG + "Light" в light-теме
    - Text: `var(--font-size-xs)`, `var(--color-primitive-white)`
    - Hover: `opacity: 0.85`, transition `var(--duration-fast)`, cursor pointer
    - Inline `<script>`: читает `localStorage` или `prefers-color-scheme` при загрузке; при клике переключает `data-theme` на `<html>` и сохраняет в `localStorage`; `try/catch` вокруг localStorage операций
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

  - [x] 8.2 Написать property-тест для ThemeToggle — Property 8: корректное переключение и сохранение темы
    - **Property 8: ThemeToggle correctly toggles and persists theme**
    - Для любого начального значения темы (`dark` или `light`): после клика `data-theme` меняется на противоположное, `localStorage` содержит новое значение; при повторной загрузке тема восстанавливается
    - Использовать `fc.constantFrom('dark', 'light')` и мокировать `localStorage`
    - **Validates: Requirements 7.5, 7.6**

- [x] 9. Обновить Layout.astro
  - [x] 9.1 Переписать `src/layouts/Layout.astro`
    - Props: `currentPage: 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact'`, `title?: string`
    - Импортировать и рендерить `Sidebar` с `currentPage={currentPage}`
    - Импортировать и рендерить `ThemeToggle` с `position: fixed; top: 1rem; right: 1rem; z-index: 999`
    - Импортировать `tokens.css` и `globals.css` в `<head>`
    - `<body>`: `background-color: var(--color-background-page)`, `color: var(--color-text-primary)`, `font-family: var(--font-family-sans)`
    - `<main class="main-content">` с `padding-left: 64px`, `min-height: 100vh`
    - `<slot />` внутри `<main>`
    - Inline `<script>` в `<head>` для инициализации темы из `localStorage` до рендеринга (предотвращение FOUC)
    - Удалить старый inline theme-toggle `<button>` и его скрипт
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

  - [x] 9.2 Написать property-тест для Layout — Property 9: Layout корректно передаёт currentPage в Sidebar
    - **Property 9: Layout correctly forwards currentPage to Sidebar**
    - Для любого валидного `currentPage` Sidebar внутри Layout получает тот же `currentPage` и отображает соответствующий NavDot как активный
    - Использовать `fc.constantFrom('home', 'about', 'experience', 'projects', 'skills', 'contact')`
    - **Validates: Requirements 8.5, 1.4**

- [x] 10. Checkpoint — проверить сборку и базовые компоненты
  - Убедиться что `npm run build` проходит без ошибок
  - Убедиться что все созданные компоненты импортируются без TypeScript-ошибок
  - Запустить `npm run test` и убедиться что все написанные тесты проходят
  - Спросить пользователя если возникнут вопросы.

- [x] 11. Обновить страницу Home (`src/pages/index.astro`)
  - Заменить inline nav на `<Layout currentPage="home">`
  - Убрать дублированный `<nav>` блок
  - Главный заголовок: `font-size: var(--font-size-7xl)`, `font-weight: var(--font-weight-bold)`, `color: var(--color-text-primary)`
  - Подзаголовок: `color: var(--color-text-secondary)`
  - Добавить заголовок секции с `var(--font-size-2xl)`, `var(--font-weight-bold)` и 3px accent-divider `var(--color-interactive-primary)` (если применимо)
  - _Requirements: 9.1, 9.7, 10.1_

- [x] 12. Обновить страницу About (`src/pages/about.astro`)
  - Заменить inline nav на `<Layout currentPage="about">`
  - Убрать дублированный `<nav>` блок
  - Заголовок секции: `var(--font-size-2xl)`, `var(--font-weight-bold)` + 3px accent-divider
  - Текст биографии: `color: var(--color-text-secondary)`
  - _Requirements: 9.2, 9.7, 10.1_

- [x] 13. Обновить страницу Work Experience (`src/pages/experience.astro`)
  - Заменить inline nav на `<Layout currentPage="experience">`
  - Убрать дублированный `<nav>` блок
  - Импортировать `ExperienceCard`
  - Определить массив `experiences: ExperienceEntry[]` с данными о позициях
  - Рендерить каждую позицию через `<ExperienceCard>` с пропами `role`, `company`, `dates`, `achievements`, `isCurrent`
  - Заголовок секции: `var(--font-size-2xl)`, `var(--font-weight-bold)` + 3px accent-divider
  - _Requirements: 9.3, 9.7, 10.1_

- [x] 14. Обновить страницу Projects (`src/pages/projects.astro`)
  - Заменить inline nav на `<Layout currentPage="projects">`
  - Убрать дублированный `<nav>` блок
  - Импортировать `ProjectCard`
  - Определить массив `projects: ProjectEntry[]` с данными о проектах
  - Рендерить каждый проект через `<ProjectCard>` с пропами `title`, `subtitle`, `shortDescription`, `fullDescription`, `technologies`, `liveUrl?`, `codeUrl?`
  - Заголовок секции: `var(--font-size-2xl)`, `var(--font-weight-bold)` + 3px accent-divider
  - _Requirements: 9.4, 9.7, 10.1_

- [x] 15. Обновить страницу Skills (`src/pages/skills.astro`)
  - Заменить inline nav на `<Layout currentPage="skills">`
  - Убрать дублированный `<nav>` блок
  - Импортировать `SkillTag`
  - Определить массив `skillCategories: SkillCategory[]` с группами навыков
  - Рендерить каждую категорию с заголовком и набором `<SkillTag>` с пропами `label` и `accent?`
  - Заголовок секции: `var(--font-size-2xl)`, `var(--font-weight-bold)` + 3px accent-divider
  - При `viewport < 768px` теги переносятся на несколько строк (flex-wrap)
  - _Requirements: 9.5, 9.7, 10.1, 11.3_

- [x] 16. Обновить страницу Contact (`src/pages/contact.astro`)
  - Заменить inline nav на `<Layout currentPage="contact">`
  - Убрать дублированный `<nav>` блок
  - Импортировать `ContactLink`
  - Определить массив `contacts: ContactEntry[]` с контактными данными
  - Рендерить каждый контакт через `<ContactLink>` с пропами `type`, `label`, `value`
  - Заголовок секции: `var(--font-size-2xl)`, `var(--font-weight-bold)` + 3px accent-divider
  - _Requirements: 9.6, 9.7, 10.1_

- [x] 17. Финальный checkpoint — полная проверка
  - Запустить `npm run build` и убедиться в отсутствии ошибок
  - Запустить `npm run test` и убедиться что все тесты проходят
  - Проверить что ни один компонент не содержит хардкодных hex-значений или px-значений, дублирующих токены (только `var(--...)`)
  - Проверить что оба варианта темы (dark/light) корректно применяются через `data-theme`
  - Спросить пользователя если возникнут вопросы.

## Notes

- Задачи с `*` опциональны и могут быть пропущены для быстрого MVP
- Каждая задача ссылается на конкретные требования для трассируемости
- Property-тесты покрывают все 9 свойств корректности из design.md
- Accordion реализуется через JS-toggle (не `<details>`), чтобы поддерживать плавную CSS-анимацию и полный контроль над ARIA
- Sidebar expand реализуется через чистый CSS (`:hover`), без JS
- ThemeToggle использует `try/catch` вокруг `localStorage` для поддержки приватного режима браузера
- Все компоненты — статические Astro-компоненты (server-rendered), интерактивность через нативный JS в `<script>` блоках
