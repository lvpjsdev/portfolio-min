# Requirements Document

## Introduction

Реализация компонентов дизайн-системы портфолио-сайта в коде на базе Astro-фреймворка. Дизайн-система задокументирована в `PUPT-Docs/` и визуализирована в файле `PUPT-Docs/portfolio-design.pen`. Компоненты должны точно воспроизводить дизайн из Pencil-файла, использовать CSS-переменные из `src/styles/tokens.css` (генерируемые через Terrazzo из `tokens/`), и применяться на всех шести страницах портфолио: Home, About Me, Work Experience, Projects, Skills, Contact.

Текущее состояние: страницы существуют, но используют inline Tailwind-классы с хардкодом цветов вместо компонентов и дизайн-токенов. Цель — создать переиспользуемые Astro-компоненты, соответствующие дизайн-системе, и применить их на всех страницах.

## Glossary

- **Design_System**: набор переиспользуемых компонентов, токенов и правил, задокументированных в `PUPT-Docs/`
- **Token**: CSS-переменная, определённая в `src/styles/tokens.css`, генерируемая из `tokens/*.tokens.json`
- **Astro_Component**: файл с расширением `.astro` в директории `src/components/`
- **Sidebar**: фиксированная боковая панель навигации шириной 64px с NavDot-элементами
- **NavDot**: навигационная точка 10×10px в форме круга, используемая в Sidebar
- **NavItem**: элемент навигации, содержащий NavDot и текстовую метку
- **SkillTag**: тег-бейдж для отображения навыка или технологии
- **ExperienceCard**: карточка записи об опыте работы с поддержкой раскрытия/сворачивания
- **ProjectCard**: карточка проекта с поддержкой раскрытия/сворачивания
- **ContactLink**: карточка контактной ссылки с иконкой и текстом
- **ThemeToggle**: кнопка переключения между светлой и тёмной темой
- **Layout**: базовый Astro-компонент обёртки страницы (`src/layouts/Layout.astro`)
- **Accordion**: UI-паттерн раскрытия/сворачивания контента по клику

---

## Requirements

### Requirement 1: Компонент Sidebar

**User Story:** As a visitor, I want a fixed sidebar with navigation dots on every page, so that I can see which page I'm on and navigate between pages.

#### Acceptance Criteria

1. THE Sidebar SHALL render as a fixed vertical panel on the left side of every page with a width of 64px and full viewport height.
2. THE Sidebar SHALL use `var(--color-background-surface)` as its background color.
3. THE Sidebar SHALL contain exactly six NavDot elements, one for each page: Home, About Me, Work Experience, Projects, Skills, Contact.
4. WHEN the current page matches a NavDot's target page, THE Sidebar SHALL render that NavDot with `var(--color-primitive-white)` fill color.
5. WHEN a NavDot does not correspond to the current page, THE Sidebar SHALL render it with `var(--color-primitive-twilight-indigo)` fill color.
6. WHEN a visitor hovers over the Sidebar, THE Sidebar SHALL expand to 240px width and display a NavItem (dot + text label) for each page.
7. WHEN the Sidebar is expanded on hover, THE Sidebar SHALL overlay the page content using z-index and transition smoothly over `var(--duration-normal)`.
8. WHEN a visitor clicks a NavDot or NavItem, THE Portfolio_Site SHALL navigate to the corresponding page.
9. THE Sidebar SHALL be implemented as a reusable `src/components/Sidebar.astro` component accepting a `currentPage` prop.

---

### Requirement 2: Компонент NavDot

**User Story:** As a visitor, I want to see navigation dots that indicate the current page, so that I always know where I am in the portfolio.

#### Acceptance Criteria

1. THE NavDot SHALL render as a circle with width and height of 10px and `var(--border-radius-full)` border-radius.
2. THE NavDot SHALL accept an `active` boolean prop that controls its fill color.
3. WHEN `active` is true, THE NavDot SHALL use `var(--color-primitive-white)` as its background color.
4. WHEN `active` is false, THE NavDot SHALL use `var(--color-primitive-twilight-indigo)` as its background color.
5. WHEN a visitor hovers over a NavDot, THE NavDot SHALL scale to 1.5× its original size over `var(--duration-fast)`.
6. THE NavDot SHALL be implemented as `src/components/NavDot.astro` accepting `active`, `href`, and `label` props.

---

### Requirement 3: Компонент SkillTag

**User Story:** As a visitor, I want to see skills displayed as distinct visual tags, so that I can quickly scan the Owner's technical profile.

#### Acceptance Criteria

1. THE SkillTag SHALL render as an inline-flex element with padding of 6px top/bottom and 12px left/right.
2. THE SkillTag SHALL use `var(--border-radius-sm)` (4px) as its border-radius.
3. THE SkillTag SHALL use `var(--color-primitive-twilight-indigo)` as its default background color.
4. THE SkillTag SHALL use `var(--color-primitive-white)` as its text color with `var(--font-size-xs)` font size.
5. WHERE the `accent` prop is true, THE SkillTag SHALL use `var(--color-interactive-primary)` as its background color instead of the default.
6. WHEN a visitor hovers over a SkillTag, THE SkillTag SHALL reduce opacity to 0.8 over `var(--duration-fast)`.
7. THE SkillTag SHALL be implemented as `src/components/SkillTag.astro` accepting `label` and optional `accent` boolean props.

---

### Requirement 4: Компонент ExperienceCard

**User Story:** As a visitor, I want to see work experience entries as expandable cards, so that I can read a summary first and expand for details when interested.

#### Acceptance Criteria

1. THE ExperienceCard SHALL render in a collapsed state by default, showing role title, company name, and date range.
2. THE ExperienceCard SHALL use `var(--color-background-surface)` as its background, `var(--border-radius-lg)` (12px) as border-radius, and padding of 20px top/bottom and 24px left/right.
3. WHEN collapsed, THE ExperienceCard SHALL display a chevron-right icon on the right side using `var(--color-text-secondary)` color.
4. WHEN a visitor clicks an ExperienceCard, THE ExperienceCard SHALL expand to reveal a divider line and a list of key achievements.
5. WHEN expanded, THE ExperienceCard SHALL replace the chevron-right icon with a chevron-down icon.
6. WHEN a visitor clicks an expanded ExperienceCard, THE ExperienceCard SHALL collapse back to its default state.
7. WHEN a visitor hovers over an ExperienceCard, THE ExperienceCard SHALL change background to `#4a2f5e` and the chevron icon color to `var(--color-interactive-primary)` over `var(--duration-fast)`.
8. THE ExperienceCard expand/collapse transition SHALL animate over `var(--duration-normal)`.
9. THE ExperienceCard SHALL be keyboard accessible: pressing Enter or Space on a focused card SHALL toggle its expanded state.
10. THE ExperienceCard SHALL expose `role="button"` and `aria-expanded` attributes for screen reader compatibility.
11. THE ExperienceCard SHALL be implemented as `src/components/ExperienceCard.astro` accepting `role`, `company`, `dates`, `achievements` (string array), and optional `isCurrent` boolean props.

---

### Requirement 5: Компонент ProjectCard

**User Story:** As a visitor, I want to see projects as expandable cards with full details on demand, so that I can explore projects without being overwhelmed by information.

#### Acceptance Criteria

1. THE ProjectCard SHALL render in a collapsed state by default, showing project title, subtitle, short description, and technology tags.
2. THE ProjectCard SHALL use `var(--color-background-surface)` as its background, `var(--border-radius-lg)` (12px) as border-radius, and padding of 20px top/bottom and 24px left/right.
3. WHEN collapsed, THE ProjectCard SHALL display a chevron-right icon on the right side.
4. WHEN a visitor clicks a ProjectCard, THE ProjectCard SHALL expand to reveal: a divider, full description section, technologies section, and links section.
5. WHEN expanded, THE ProjectCard SHALL replace the chevron-right icon with a chevron-down icon.
6. WHEN a visitor clicks an expanded ProjectCard, THE ProjectCard SHALL collapse back to its default state.
7. WHERE a `liveUrl` prop is provided, THE ProjectCard SHALL display a "Live Demo" button with `var(--color-interactive-primary)` background in the expanded links section.
8. WHERE a `codeUrl` prop is provided, THE ProjectCard SHALL display a "View Code" button with `var(--color-primitive-twilight-indigo)` background in the expanded links section.
9. THE ProjectCard expand/collapse transition SHALL animate over `var(--duration-normal)`.
10. THE ProjectCard SHALL be keyboard accessible: pressing Enter or Space on a focused card SHALL toggle its expanded state.
11. THE ProjectCard SHALL expose `role="button"` and `aria-expanded` attributes for screen reader compatibility.
12. THE ProjectCard SHALL be implemented as `src/components/ProjectCard.astro` accepting `title`, `subtitle`, `shortDescription`, `fullDescription`, `technologies` (string array), and optional `liveUrl` and `codeUrl` props.

---

### Requirement 6: Компонент ContactLink

**User Story:** As a visitor, I want to see contact options as clickable cards with icons, so that I can easily identify and use each contact method.

#### Acceptance Criteria

1. THE ContactLink SHALL render as a horizontal flex container with gap of 16px, padding of 20px top/bottom and 24px left/right.
2. THE ContactLink SHALL use `var(--color-background-surface)` as its background and `var(--border-radius-lg)` (12px) as border-radius.
3. THE ContactLink SHALL display an icon on the left (24×24px) using `var(--color-interactive-primary)` color.
4. THE ContactLink SHALL display a text label using `var(--font-size-sm)` and `var(--color-text-primary)`.
5. WHEN a visitor hovers over a ContactLink, THE ContactLink SHALL translate upward by 2px over `var(--duration-normal)`.
6. WHEN the contact type is `email`, THE ContactLink SHALL render as an `<a>` tag with `href="mailto:{value}"`.
7. WHEN the contact type is not `email`, THE ContactLink SHALL render as an `<a>` tag with `href="{value}"` and `target="_blank" rel="noopener noreferrer"`.
8. THE ContactLink SHALL be implemented as `src/components/ContactLink.astro` accepting `type` (email | linkedin | github | instagram), `label`, and `value` props.

---

### Requirement 7: Компонент ThemeToggle

**User Story:** As a visitor, I want a clearly visible theme toggle button, so that I can switch between dark and light modes at any time.

#### Acceptance Criteria

1. THE ThemeToggle SHALL render as a pill-shaped button with padding of 7px top/bottom and 14px left/right, and `var(--border-radius-full)` border-radius.
2. THE ThemeToggle SHALL use `var(--color-primitive-twilight-indigo)` as its background color.
3. THE ThemeToggle SHALL display a moon icon (16×16px) and the text "Dark" when the current theme is dark.
4. THE ThemeToggle SHALL display a sun icon (16×16px) and the text "Light" when the current theme is light.
5. WHEN a visitor clicks the ThemeToggle, THE Portfolio_Site SHALL toggle between dark and light themes and persist the selection in `localStorage`.
6. WHEN the Portfolio_Site loads, THE ThemeToggle SHALL reflect the theme stored in `localStorage`, or the system preference if no stored value exists.
7. THE ThemeToggle SHALL be implemented as `src/components/ThemeToggle.astro` as a self-contained component with its own client-side script.

---

### Requirement 8: Обновление Layout

**User Story:** As a developer, I want the base Layout component to include all shared structure, so that individual pages only contain their unique content.

#### Acceptance Criteria

1. THE Layout SHALL import and render the Sidebar component, passing the current page identifier via the `currentPage` prop.
2. THE Layout SHALL import and apply `src/styles/tokens.css` and `src/styles/globals.css`.
3. THE Layout SHALL set `background-color: var(--color-background-page)` and `color: var(--color-text-primary)` on the `<body>` element.
4. THE Layout SHALL apply `font-family: var(--font-family-sans)` globally.
5. THE Layout SHALL accept a `currentPage` prop and forward it to the Sidebar component.
6. THE Layout SHALL include the ThemeToggle component positioned at the top-right of the viewport.
7. THE Layout SHALL provide a `<slot />` for page-specific content within a `<main>` element that has `padding-left: 64px` to account for the fixed Sidebar.

---

### Requirement 9: Применение компонентов на страницах

**User Story:** As a visitor, I want all pages to use the design system components consistently, so that the portfolio has a unified visual identity.

#### Acceptance Criteria

1. THE Home page (`src/pages/index.astro`) SHALL use the Layout component with `currentPage="home"` and display the hero greeting using `var(--font-size-7xl)` for the main heading.
2. THE About Me page (`src/pages/about.astro`) SHALL use the Layout component with `currentPage="about"` and display biography content using `var(--color-text-secondary)` for body text.
3. THE Work Experience page (`src/pages/experience.astro`) SHALL use the Layout component with `currentPage="experience"` and render each position using the ExperienceCard component.
4. THE Projects page (`src/pages/projects.astro`) SHALL use the Layout component with `currentPage="projects"` and render each project using the ProjectCard component.
5. THE Skills page (`src/pages/skills.astro`) SHALL use the Layout component with `currentPage="skills"` and render each skill using the SkillTag component grouped by category.
6. THE Contact page (`src/pages/contact.astro`) SHALL use the Layout component with `currentPage="contact"` and render each contact entry using the ContactLink component.
7. WHEN any page is rendered, THE Portfolio_Site SHALL display a page section heading using `var(--font-size-2xl)` and `var(--font-weight-bold)` followed by a 3px accent divider in `var(--color-interactive-primary)`.

---

### Requirement 10: Использование дизайн-токенов

**User Story:** As a developer, I want all components to use CSS custom properties from tokens.css, so that the design system remains consistent and easy to update.

#### Acceptance Criteria

1. THE Design_System SHALL use only CSS custom properties defined in `src/styles/tokens.css` for all color, spacing, typography, and border-radius values — no hardcoded hex values or pixel values that duplicate token definitions.
2. WHEN `tokens/primitives.tokens.json` or `tokens/semantic.tokens.json` is updated and `npm run build:tokens` is executed, THE Portfolio_Site SHALL reflect the updated values across all components without any component file modifications.
3. THE Design_System SHALL support both dark and light themes by relying on the `[data-theme="dark"]` and `[data-theme="light"]` CSS selectors already defined in `tokens.css`.
4. IF a CSS value is not covered by an existing token, THEN THE component SHALL define a local CSS custom property scoped to that component rather than using a hardcoded value.

---

### Requirement 11: Адаптивность компонентов

**User Story:** As a visitor on a mobile device, I want the components to adapt to smaller screens, so that the portfolio is usable on any device.

#### Acceptance Criteria

1. WHEN the viewport width is less than 768px, THE Sidebar SHALL be hidden and replaced by a horizontal navigation bar at the top of the page.
2. WHEN the viewport width is less than 768px, THE ExperienceCard and ProjectCard SHALL use full viewport width with reduced padding of 12px top/bottom and 16px left/right.
3. WHEN the viewport width is less than 768px, THE SkillTag elements SHALL wrap to multiple lines within their container.
4. WHEN the viewport width is less than 768px, THE ContactLink elements SHALL use full viewport width.
5. WHEN the viewport width is less than 1024px and greater than or equal to 768px, THE ExperienceCard and ProjectCard SHALL use full container width with padding of 16px top/bottom and 20px left/right.
