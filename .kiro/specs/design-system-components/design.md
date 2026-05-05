# Design Document: Design System Components

## Overview

Данный документ описывает техническую реализацию компонентов дизайн-системы портфолио-сайта на базе Astro-фреймворка. Цель — заменить текущие страницы с inline Tailwind-классами и хардкодом цветов на переиспользуемые Astro-компоненты, точно воспроизводящие дизайн из `PUPT-Docs/portfolio-design.pen` и использующие CSS-переменные из `src/styles/tokens.css`.

### Ключевые принципы

- **Token-first**: все цвета, отступы, радиусы и типографика берутся исключительно из CSS-переменных `tokens.css`
- **Astro-native**: компоненты реализуются как `.astro`-файлы с `<style>` блоками (scoped CSS), без внешних CSS-фреймворков
- **Progressive enhancement**: интерактивность (accordion, sidebar expand, theme toggle) реализуется через нативный JavaScript в `<script>` блоках без клиентских фреймворков
- **Accessibility-first**: все интерактивные элементы поддерживают клавиатурную навигацию и ARIA-атрибуты

### Текущее состояние vs целевое

| Аспект | Сейчас | После реализации |
|--------|--------|-----------------|
| Навигация | Дублированный inline HTML на каждой странице | Единый `Sidebar.astro` компонент |
| Цвета | Хардкод Tailwind-классов (`bg-dark-amethyst`) | CSS-переменные (`var(--color-background-surface)`) |
| Карточки опыта | Простые `<div>` с border-left | `ExperienceCard.astro` с accordion |
| Карточки проектов | Простые `<div>` с border | `ProjectCard.astro` с accordion |
| Теги навыков | `<span>` с Tailwind | `SkillTag.astro` |
| Theme toggle | Inline `<button>` в Layout | `ThemeToggle.astro` |

---

## Architecture

### Структура файлов

```
src/
├── components/
│   ├── Sidebar.astro          # Фиксированная боковая навигация
│   ├── NavDot.astro           # Навигационная точка
│   ├── SkillTag.astro         # Тег навыка/технологии
│   ├── ExperienceCard.astro   # Карточка опыта (accordion)
│   ├── ProjectCard.astro      # Карточка проекта (accordion)
│   ├── ContactLink.astro      # Карточка контакта с иконкой
│   └── ThemeToggle.astro      # Переключатель темы
├── layouts/
│   └── Layout.astro           # Обновлённый базовый layout
├── pages/
│   ├── index.astro            # Home — обновлена
│   ├── about.astro            # About — обновлена
│   ├── experience.astro       # Experience — обновлена
│   ├── projects.astro         # Projects — обновлена
│   ├── skills.astro           # Skills — обновлена
│   └── contact.astro          # Contact — обновлена
└── styles/
    ├── tokens.css             # Автогенерируемый (не трогать)
    └── globals.css            # Глобальные утилиты
```

### Поток данных

```
Layout.astro (currentPage prop)
  └── Sidebar.astro (currentPage prop)
        └── NavDot.astro × 6 (active prop, href, label)
  └── ThemeToggle.astro (standalone, читает/пишет localStorage)
  └── <slot /> → страница
        └── ExperienceCard.astro × N (role, company, dates, achievements[])
        └── ProjectCard.astro × N (title, subtitle, descriptions, technologies[], liveUrl?, codeUrl?)
        └── SkillTag.astro × N (label, accent?)
        └── ContactLink.astro × N (type, label, value)
```

### Управление состоянием

Все компоненты — статические Astro-компоненты (server-rendered). Интерактивность реализуется через нативный JavaScript в `<script>` блоках:

- **ThemeToggle**: читает/пишет `localStorage`, устанавливает `data-theme` на `<html>`
- **Sidebar expand**: CSS `transition` + `:hover` псевдокласс (чисто CSS, без JS)
- **ExperienceCard / ProjectCard accordion**: `<details>/<summary>` HTML-элементы с CSS-анимацией, либо JS-toggle через `aria-expanded` + CSS `max-height` transition

### Решение по accordion

Для ExperienceCard и ProjectCard используется паттерн **JS-управляемый accordion** (не `<details>`), потому что:
1. `<details>` не поддерживает плавную CSS-анимацию высоты без хаков
2. Требуется кастомный chevron с анимацией поворота
3. Нужен полный контроль над `aria-expanded`

Реализация: каждая карточка содержит `data-accordion` атрибут. Один `<script>` в компоненте вешает делегированный обработчик на `document`, который переключает класс `is-expanded` и обновляет `aria-expanded`.

---

## Components and Interfaces

### 1. NavDot

**Файл:** `src/components/NavDot.astro`

**Props:**
```typescript
interface Props {
  active: boolean;      // активная страница
  href: string;         // URL для навигации
  label: string;        // текст для aria-label и tooltip
}
```

**Визуальные характеристики (из дизайна):**
- Размер: 10×10px
- Форма: круг (`border-radius: var(--border-radius-full)`)
- Цвет активный: `var(--color-primitive-white)`
- Цвет неактивный: `var(--color-primitive-twilight-indigo)`
- Hover: `transform: scale(1.5)`, transition `var(--duration-fast)`

**HTML-структура:**
```html
<a href={href} class="nav-dot" class:list={[{ 'nav-dot--active': active }]}
   aria-label={label} aria-current={active ? 'page' : undefined}>
</a>
```

---

### 2. Sidebar

**Файл:** `src/components/Sidebar.astro`

**Props:**
```typescript
interface Props {
  currentPage: 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact';
}
```

**Навигационные элементы (фиксированный список):**
```typescript
const navItems = [
  { id: 'home',       href: '/',           label: 'Home' },
  { id: 'about',      href: '/about',      label: 'About Me' },
  { id: 'experience', href: '/experience', label: 'Work Experience' },
  { id: 'projects',   href: '/projects',   label: 'Projects' },
  { id: 'skills',     href: '/skills',     label: 'Skills' },
  { id: 'contact',    href: '/contact',    label: 'Contact' },
];
```

**Визуальные характеристики (из дизайна):**

*Collapsed state (по умолчанию):*
- Ширина: 64px
- Высота: 100vh
- Background: `var(--color-background-surface)` (= `#372248` в dark теме)
- Layout: vertical, `align-items: center`, `justify-content: center`
- Gap между NavDot: 20px

*Expanded state (при hover):*
- Ширина: 240px
- Transition: `width var(--duration-normal) ease`
- Layout: vertical, `align-items: flex-start`, padding: 32px 20px
- Gap между NavItem: 32px
- Box-shadow для глубины
- Z-index: 100 (поверх контента)

*NavItem (в expanded state):*
- Layout: horizontal, gap: 10px, padding: 8px 0
- NavDot (10×10px) + текстовая метка
- Текст: `font-size: var(--font-size-sm)`, `font-weight: var(--font-weight-medium)`
- Цвет текста неактивный: `var(--color-text-secondary)` (`#bbbcc4`)
- Цвет текста активный/hover: `var(--color-primitive-white)`

**Реализация expand через CSS:**
```css
.sidebar {
  width: 64px;
  transition: width var(--duration-normal) ease;
  overflow: hidden;
}
.sidebar:hover {
  width: 240px;
}
.sidebar .nav-label {
  opacity: 0;
  white-space: nowrap;
  transition: opacity var(--duration-fast) ease;
}
.sidebar:hover .nav-label {
  opacity: 1;
}
```

---

### 3. SkillTag

**Файл:** `src/components/SkillTag.astro`

**Props:**
```typescript
interface Props {
  label: string;
  accent?: boolean;  // использовать accent цвет вместо default
}
```

**Визуальные характеристики (из дизайна):**
- Display: `inline-flex`
- Padding: 6px 12px
- Border-radius: `var(--border-radius-sm)` (4px)
- Background default: `var(--color-primitive-twilight-indigo)` (`#414770`)
- Background accent: `var(--color-interactive-primary)` (`#f46036`)
- Text color: `var(--color-primitive-white)`
- Font-size: `var(--font-size-xs)` (14px)
- Hover: `opacity: 0.8`, transition `var(--duration-fast)`

---

### 4. ExperienceCard

**Файл:** `src/components/ExperienceCard.astro`

**Props:**
```typescript
interface Props {
  role: string;
  company: string;
  dates: string;
  achievements: string[];
  isCurrent?: boolean;
}
```

**Визуальные характеристики (из дизайна):**

*Collapsed state:*
- Layout: horizontal, `justify-content: space-between`, `align-items: center`
- Padding: 20px 24px
- Border-radius: `var(--border-radius-lg)` (12px)
- Background: `var(--color-background-surface)`
- Левая часть: vertical layout, gap: 4-6px
  - Role: `font-size: var(--font-size-base)` (18px), `font-weight: var(--font-weight-bold)`, `color: var(--color-text-primary)`
  - Company: `font-size: var(--font-size-xs)` (14px), `color: var(--color-interactive-secondary)` (`#5b85aa`)
  - Dates: `font-size: var(--font-size-xs)` (14px), `color: var(--color-text-secondary)`
- Правая часть: chevron-right icon, 20×20px, `color: var(--color-text-secondary)`

*Hover state:*
- Background: `#4a2f5e` (локальная переменная `--card-hover-bg`)
- Chevron color: `var(--color-interactive-primary)`
- Transition: `var(--duration-fast)`

*Expanded state:*
- Chevron меняется на chevron-down (CSS transform: rotate(90deg))
- Появляется divider: 1px, `var(--color-primitive-twilight-indigo)`
- Секция достижений:
  - Заголовок "Key Achievements:": `font-size: var(--font-size-xs)`, `font-weight: var(--font-weight-bold)`
  - Список: bullet `•` в `var(--color-interactive-primary)` + текст в `var(--color-text-secondary)`
  - Font-size: `var(--font-size-xs)`, line-height: 1.6

**HTML-структура:**
```html
<article class="experience-card" role="button" tabindex="0"
         aria-expanded="false" aria-label="{role} at {company}">
  <div class="card-header">
    <div class="card-info">
      <span class="card-role">{role}</span>
      <span class="card-company">{company}</span>
      <span class="card-dates">{dates}</span>
    </div>
    <svg class="card-chevron"><!-- chevron-right --></svg>
  </div>
  <div class="card-body" hidden>
    <hr class="card-divider" />
    <div class="card-achievements">
      <p class="achievements-title">Key Achievements:</p>
      {achievements.map(a => (
        <div class="achievement-item">
          <span class="bullet">•</span>
          <span>{a}</span>
        </div>
      ))}
    </div>
  </div>
</article>
```

---

### 5. ProjectCard

**Файл:** `src/components/ProjectCard.astro`

**Props:**
```typescript
interface Props {
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  liveUrl?: string;
  codeUrl?: string;
}
```

**Визуальные характеристики (из дизайна):**

*Collapsed state:*
- Layout: vertical, gap: 12px
- Padding: 20px 24px
- Border-radius: `var(--border-radius-lg)` (12px)
- Background: `var(--color-background-surface)`
- Header row: horizontal, `justify-content: space-between`
  - Title: `font-size: var(--font-size-base)` (18px), `font-weight: var(--font-weight-bold)`
  - Subtitle: `font-size: var(--font-size-xs)` (14px), `color: var(--color-interactive-secondary)`
  - Chevron-right: 20×20px, `color: var(--color-text-secondary)`
- Short description: `font-size: var(--font-size-xs)`, `color: var(--color-text-secondary)`, line-height: 1.6
- Technology tags: horizontal flex-wrap, gap: 8px (используют стиль SkillTag)

*Expanded state:*
- Chevron → chevron-down (rotate 90deg)
- Divider: 1px, `var(--color-primitive-twilight-indigo)`
- Description section: заголовок + полный текст
- Technologies section: заголовок + теги
- Links section: кнопки Live Demo и View Code
  - Live Demo: background `var(--color-interactive-primary)`, padding: 10px 16px, border-radius: `var(--border-radius-md)`
  - View Code: background `var(--color-primitive-twilight-indigo)`, те же размеры

---

### 6. ContactLink

**Файл:** `src/components/ContactLink.astro`

**Props:**
```typescript
interface Props {
  type: 'email' | 'linkedin' | 'github' | 'instagram';
  label: string;
  value: string;  // email адрес или URL
}
```

**Визуальные характеристики (из дизайна):**
- Display: flex, `align-items: center`, gap: 16px
- Padding: 20px 24px
- Border-radius: `var(--border-radius-lg)` (12px)
- Background: `var(--color-background-surface)`
- Icon: 24×24px, `color: var(--color-interactive-primary)` (SVG inline)
- Text: `font-size: var(--font-size-sm)` (16px), `color: var(--color-text-primary)`
- Hover: `transform: translateY(-2px)`, transition `var(--duration-normal)`

**Иконки (inline SVG из Lucide):**
- `email` → mail icon
- `linkedin` → linkedin icon
- `github` → github icon
- `instagram` → instagram icon

**Логика href:**
- `email` → `href="mailto:{value}"`
- остальные → `href="{value}" target="_blank" rel="noopener noreferrer"`

---

### 7. ThemeToggle

**Файл:** `src/components/ThemeToggle.astro`

**Props:** нет (standalone компонент)

**Визуальные характеристики (из дизайна):**
- Display: flex, `align-items: center`, gap: 6px
- Padding: 7px 14px
- Border-radius: `var(--border-radius-full)` (pill shape)
- Background: `var(--color-primitive-twilight-indigo)` (`#414770`)
- Icon: 16×16px (moon/sun SVG)
- Text: `font-size: var(--font-size-xs)` (14px), `color: var(--color-primitive-white)`
- Hover: `opacity: 0.85`, transition `var(--duration-fast)`
- Cursor: pointer

**Логика:**
- При загрузке: читает `localStorage.getItem('theme')` или `prefers-color-scheme`
- При клике: переключает `data-theme` на `<html>`, сохраняет в `localStorage`
- Отображает moon + "Dark" в dark-теме, sun + "Light" в light-теме

---

### 8. Layout (обновлённый)

**Файл:** `src/layouts/Layout.astro`

**Props:**
```typescript
interface Props {
  currentPage: 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact';
  title?: string;
}
```

**Структура:**
```html
<html lang="en" data-theme="dark">
  <head>
    <!-- meta, fonts, tokens.css, globals.css -->
    <script>/* theme init из localStorage */</script>
  </head>
  <body>
    <Sidebar currentPage={currentPage} />
    <ThemeToggle />  <!-- position: fixed, top-right -->
    <main class="main-content">
      <slot />
    </main>
  </body>
</html>
```

**CSS для main:**
```css
.main-content {
  padding-left: 64px;  /* ширина collapsed sidebar */
  min-height: 100vh;
}
```

---

## Data Models

### PageId

```typescript
type PageId = 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact';
```

### NavItem (внутренний тип Sidebar)

```typescript
interface NavItem {
  id: PageId;
  href: string;
  label: string;
}
```

### ExperienceEntry (данные для страницы experience.astro)

```typescript
interface ExperienceEntry {
  role: string;
  company: string;
  dates: string;
  achievements: string[];
  isCurrent?: boolean;
}
```

### ProjectEntry (данные для страницы projects.astro)

```typescript
interface ProjectEntry {
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  liveUrl?: string;
  codeUrl?: string;
}
```

### ContactEntry (данные для страницы contact.astro)

```typescript
interface ContactEntry {
  type: 'email' | 'linkedin' | 'github' | 'instagram';
  label: string;
  value: string;
}
```

### SkillCategory (данные для страницы skills.astro)

```typescript
interface SkillCategory {
  name: string;
  skills: Array<{ label: string; accent?: boolean }>;
}
```

### Тема

```typescript
type Theme = 'dark' | 'light';
// Хранится в: localStorage.getItem('theme')
// Применяется через: document.documentElement.setAttribute('data-theme', theme)
```

---

## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection (анализ избыточности)

Перед написанием свойств выполним рефлексию для устранения дублирования:

- **1.4 и 1.5** (активный/неактивный NavDot) — одно свойство покрывает оба: «для любого currentPage ровно один NavDot активен»
- **4.4 и 4.5** (expand + chevron change) — chevron является частью expand-поведения, одно свойство
- **4.6** (collapse round-trip) — отдельное свойство, не дублирует 4.4
- **4.9 и 4.10** (keyboard + ARIA) — можно объединить: «для любой карточки ARIA-атрибуты всегда отражают реальное состояние, и клавиатурные события корректно меняют это состояние»
- **5.4, 5.5** — аналогично 4.4/4.5, одно свойство
- **5.6** — отдельное round-trip свойство
- **5.7 и 5.8** (liveUrl/codeUrl) — можно объединить в одно свойство об опциональных ссылках
- **5.10 и 5.11** — аналогично 4.9/4.10, объединяем
- **6.6 и 6.7** (href логика) — объединяем в одно свойство о корректности href
- **7.5 и 7.6** (theme toggle + persistence) — объединяем в одно свойство о теме
- **8.5** (Layout forwarding) — отдельное свойство
- **10.1 и 10.4** (no hardcoded values) — объединяем в одно свойство о token-only стилях
- **10.3** (theme switching) — отдельное свойство

После рефлексии получаем **9 уникальных свойств**.

---

### Property 1: Активный NavDot соответствует текущей странице

*Для любого* валидного значения `currentPage` из множества `{home, about, experience, projects, skills, contact}`, при рендеринге Sidebar ровно один NavDot должен иметь `active=true`, и этот NavDot должен соответствовать переданному `currentPage`.

**Validates: Requirements 1.4, 1.5, 2.3, 2.4**

---

### Property 2: Навигационные ссылки корректны

*Для любого* NavItem в Sidebar, атрибут `href` должен равняться ожидаемому URL для соответствующей страницы (например, `home` → `/`, `about` → `/about`).

**Validates: Requirements 1.8**

---

### Property 3: ExperienceCard expand раскрывает все достижения

*Для любого* массива строк `achievements` (непустого), при рендеринге ExperienceCard и симуляции клика, все строки из массива должны стать видимыми в DOM, `aria-expanded` должен стать `"true"`, а иконка chevron должна указывать вниз.

**Validates: Requirements 4.4, 4.5**

---

### Property 4: ExperienceCard collapse round-trip

*Для любой* ExperienceCard, после двух последовательных кликов (expand → collapse), компонент должен вернуться в исходное состояние: `aria-expanded="false"`, тело карточки скрыто, chevron указывает вправо.

**Validates: Requirements 4.6**

---

### Property 5: Accordion ARIA-атрибуты всегда отражают реальное состояние

*Для любой* ExperienceCard или ProjectCard, значение атрибута `aria-expanded` должно всегда точно соответствовать фактическому состоянию компонента (развёрнут/свёрнут). При нажатии Enter или Space на сфокусированной карточке состояние должно переключаться, и `aria-expanded` должен обновляться соответственно.

**Validates: Requirements 4.9, 4.10, 5.10, 5.11**

---

### Property 6: ProjectCard опциональные ссылки отображаются только при наличии пропа

*Для любой* комбинации значений `liveUrl` и `codeUrl` (присутствует/отсутствует), в развёрнутом состоянии ProjectCard кнопка "Live Demo" должна присутствовать тогда и только тогда, когда `liveUrl` передан, а кнопка "View Code" — тогда и только тогда, когда `codeUrl` передан. Каждая кнопка должна иметь `href` равный переданному URL.

**Validates: Requirements 5.7, 5.8**

---

### Property 7: ContactLink href корректен для любого типа и значения

*Для любого* типа контакта (`email`, `linkedin`, `github`, `instagram`) и любой строки `value`, атрибут `href` должен быть `mailto:{value}` если тип `email`, и `{value}` с `target="_blank"` для всех остальных типов.

**Validates: Requirements 6.6, 6.7**

---

### Property 8: ThemeToggle корректно переключает и сохраняет тему

*Для любого* начального значения темы (`dark` или `light`), после клика на ThemeToggle: атрибут `data-theme` на `<html>` должен измениться на противоположное значение, и `localStorage` должен содержать новое значение темы. При последующей загрузке страницы тема должна восстановиться из `localStorage`.

**Validates: Requirements 7.5, 7.6**

---

### Property 9: Layout корректно передаёт currentPage в Sidebar

*Для любого* валидного значения `currentPage`, при рендеринге Layout с этим значением, Sidebar внутри Layout должен получить тот же `currentPage` и отобразить соответствующий NavDot как активный.

**Validates: Requirements 8.5, 1.4**

---

## Error Handling

### Невалидные пропы

Astro выполняет рендеринг на сервере, поэтому большинство ошибок пропов проявляются во время сборки, а не в рантайме. Тем не менее:

**Sidebar / NavDot — неизвестный currentPage:**
- Если передан неизвестный `currentPage`, ни один NavDot не будет активным (graceful degradation)
- Все NavDot рендерятся с `active=false`

**ExperienceCard — пустой массив achievements:**
- Если `achievements` пустой, секция достижений рендерится без элементов списка
- Карточка всё равно раскрывается (показывает только divider)

**ProjectCard — отсутствующие опциональные пропы:**
- `liveUrl` и `codeUrl` опциональны; если не переданы, соответствующие кнопки не рендерятся
- Секция Links не рендерится вовсе, если оба пропа отсутствуют

**ContactLink — неизвестный type:**
- Если передан неизвестный тип, рендерится иконка-заглушка (generic link icon)
- href формируется как обычная ссылка (не mailto)

**ThemeToggle — отсутствие localStorage (SSR/private browsing):**
- Используется `try/catch` вокруг `localStorage` операций
- Fallback: `prefers-color-scheme` media query
- Если оба недоступны: default `dark` тема

### Ошибки навигации

**Sidebar — некорректный href:**
- Все href статически определены в компоненте, ошибки невозможны в рантайме

### Адаптивность

**Sidebar на мобильных:**
- При `viewport < 768px` sidebar скрывается через `display: none`
- Горизонтальная навигация показывается через `display: flex`
- Если JS отключён, навигация всё равно работает (чистый HTML `<a>` теги)

---

## Testing Strategy

### Подход к тестированию

Данная фича представляет собой набор UI-компонентов (Astro) с интерактивным поведением на клиенте. Применяется **двойной подход**:

1. **Unit/Component тесты** — проверяют рендеринг, CSS-свойства, HTML-структуру
2. **Property-based тесты** — проверяют универсальные свойства (accordion state, ARIA, href логика, theme)

### Инструменты

- **Тестовый фреймворк:** [Vitest](https://vitest.dev/) (нативная интеграция с Vite/Astro)
- **Рендеринг компонентов:** [@astrojs/test-utils](https://docs.astro.build/en/guides/testing/) или `@testing-library/dom`
- **Property-based testing:** [fast-check](https://fast-check.io/) — зрелая PBT-библиотека для JavaScript/TypeScript
- **DOM assertions:** `@testing-library/jest-dom`

### Конфигурация fast-check

Каждый property-based тест запускается минимум **100 итераций**:

```typescript
import fc from 'fast-check';

// Пример конфигурации
fc.assert(
  fc.property(/* arbitraries */, (input) => {
    // property body
  }),
  { numRuns: 100 }
);
```

### Теги тестов

Каждый property-based тест должен содержать комментарий-тег:

```typescript
// Feature: design-system-components, Property 1: Active NavDot matches currentPage
```

### Unit тесты (примеры)

```typescript
// NavDot.test.ts
describe('NavDot', () => {
  it('renders as circle with 10px dimensions', () => { /* ... */ });
  it('applies active styles when active=true', () => { /* ... */ });
  it('applies inactive styles when active=false', () => { /* ... */ });
});

// ExperienceCard.test.ts
describe('ExperienceCard', () => {
  it('renders in collapsed state by default', () => { /* ... */ });
  it('shows chevron-right when collapsed', () => { /* ... */ });
  it('applies hover background on :hover', () => { /* ... */ });
});
```

### Property-based тесты

```typescript
// Sidebar.property.test.ts
// Feature: design-system-components, Property 1: Active NavDot matches currentPage
it('exactly one NavDot is active and matches currentPage', () => {
  const pageIds = ['home', 'about', 'experience', 'projects', 'skills', 'contact'] as const;
  fc.assert(
    fc.property(fc.constantFrom(...pageIds), (currentPage) => {
      const rendered = renderSidebar({ currentPage });
      const activeDots = rendered.querySelectorAll('.nav-dot--active');
      expect(activeDots).toHaveLength(1);
      expect(activeDots[0].getAttribute('href')).toBe(pageHrefMap[currentPage]);
    }),
    { numRuns: 100 }
  );
});

// ExperienceCard.property.test.ts
// Feature: design-system-components, Property 3: ExperienceCard expand reveals all achievements
it('expand reveals all achievements', () => {
  fc.assert(
    fc.property(
      fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 10 }),
      (achievements) => {
        const card = renderExperienceCard({ role: 'Dev', company: 'Co', dates: '2020', achievements });
        simulateClick(card);
        expect(card.getAttribute('aria-expanded')).toBe('true');
        achievements.forEach(a => expect(card.textContent).toContain(a));
      }
    ),
    { numRuns: 100 }
  );
});

// Feature: design-system-components, Property 4: ExperienceCard collapse round-trip
it('double click returns to collapsed state', () => {
  fc.assert(
    fc.property(
      fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
      (achievements) => {
        const card = renderExperienceCard({ role: 'Dev', company: 'Co', dates: '2020', achievements });
        simulateClick(card); // expand
        simulateClick(card); // collapse
        expect(card.getAttribute('aria-expanded')).toBe('false');
        expect(card.querySelector('.card-body')?.hasAttribute('hidden')).toBe(true);
      }
    ),
    { numRuns: 100 }
  );
});

// ContactLink.property.test.ts
// Feature: design-system-components, Property 7: ContactLink href is correct for any type and value
it('href is mailto for email type, direct URL for others', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('linkedin', 'github', 'instagram'),
      fc.webUrl(),
      (type, value) => {
        const link = renderContactLink({ type, label: 'Test', value });
        expect(link.getAttribute('href')).toBe(value);
        expect(link.getAttribute('target')).toBe('_blank');
      }
    ),
    { numRuns: 100 }
  );
  fc.assert(
    fc.property(
      fc.emailAddress(),
      (email) => {
        const link = renderContactLink({ type: 'email', label: 'Email', value: email });
        expect(link.getAttribute('href')).toBe(`mailto:${email}`);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Интеграционные тесты

- Запуск `npm run build` и проверка отсутствия ошибок сборки
- Проверка что `npm run build:tokens` обновляет `tokens.css` корректно
- Визуальное тестирование в браузере для обоих тем (dark/light)

### Покрытие

| Компонент | Unit тесты | Property тесты |
|-----------|-----------|----------------|
| NavDot | ✅ | ✅ (Property 1, 2) |
| Sidebar | ✅ | ✅ (Property 1, 2, 9) |
| SkillTag | ✅ | — |
| ExperienceCard | ✅ | ✅ (Property 3, 4, 5) |
| ProjectCard | ✅ | ✅ (Property 5, 6) |
| ContactLink | ✅ | ✅ (Property 7) |
| ThemeToggle | ✅ | ✅ (Property 8) |
| Layout | ✅ | ✅ (Property 9) |
