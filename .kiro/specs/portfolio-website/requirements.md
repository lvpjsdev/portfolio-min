# Requirements Document

## Introduction

Сайт-портфолио — персональный веб-сайт разработчика, аналогичный geettrivedi.com. Сайт включает разделы: главная страница, обо мне, опыт работы, проекты, навыки, контакты и терминальный интерфейс. Сайт поддерживает светлую и тёмную темы, минималистичный дизайн с акцентом на типографику. Все данные (имя, биография, опыт, проекты, навыки, контакты) вынесены в конфигурационный файл для удобной кастомизации под любого пользователя.

## Glossary

- **Portfolio_Site**: веб-приложение портфолио, реализованное на Next.js
- **Config**: конфигурационный файл (JSON или TypeScript-объект) с персональными данными владельца сайта
- **Theme_Switcher**: компонент переключения между светлой и тёмной темой
- **Terminal_Page**: страница с интерактивным терминальным интерфейсом
- **Accordion**: UI-компонент, раскрывающий/скрывающий содержимое по клику
- **Navigation**: горизонтальное меню с ссылками на разделы сайта
- **Owner**: владелец портфолио — человек, чьи данные отображаются на сайте

---

## Requirements

### Requirement 1: Навигация и общая структура

**User Story:** As an Owner, I want a navigation menu with links to all sections, so that visitors can easily move between pages.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL render a horizontal Navigation bar at the top of every page containing links to: Home, About Me, Work Experience, Projects, Skills, Contact, and Terminal.
2. THE Navigation SHALL highlight the currently active page link.
3. THE Navigation SHALL include a Theme_Switcher button that toggles between light and dark themes.
4. THE Navigation SHALL include a button that navigates the user to the Terminal_Page.
5. WHEN a visitor clicks a Navigation link, THE Portfolio_Site SHALL navigate to the corresponding page without a full page reload.

---

### Requirement 2: Главная страница (Home)

**User Story:** As a visitor, I want to see a welcoming introduction on the home page, so that I immediately understand who the portfolio belongs to.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL display a Home page with a greeting text composed of the Owner's name and professional title, sourced from Config.
2. THE Portfolio_Site SHALL display the Owner's location, sourced from Config.
3. WHEN the Home page is rendered, THE Portfolio_Site SHALL apply large typographic styling to the greeting text as the primary visual element.

---

### Requirement 3: Страница «Обо мне» (About Me)

**User Story:** As a visitor, I want to read a personal biography of the Owner, so that I can learn about their background and story.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL display an About Me page with the Owner's biography text, sourced from Config.
2. THE Portfolio_Site SHALL support multi-paragraph biography content.

---

### Requirement 4: Страница «Опыт работы» (Work Experience)

**User Story:** As a visitor, I want to see a list of the Owner's work experience, so that I can evaluate their professional background.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL display a Work Experience page listing all positions sourced from Config.
2. WHEN rendering each position, THE Portfolio_Site SHALL display the company name, job title, start date, and end date (or "Present" if ongoing).
3. THE Portfolio_Site SHALL render positions in reverse chronological order (most recent first).
4. WHEN the end date field in Config is absent, THE Portfolio_Site SHALL display "Present" as the end date for that position.

---

### Requirement 5: Страница «Проекты» (Projects)

**User Story:** As a visitor, I want to browse the Owner's projects with expandable details, so that I can explore their work without being overwhelmed by information.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL display a Projects page listing all projects sourced from Config.
2. WHEN rendering each project, THE Portfolio_Site SHALL display the project name and a short description as always-visible content.
3. THE Portfolio_Site SHALL render each project as an Accordion item that is collapsed by default.
4. WHEN a visitor clicks on a collapsed Accordion item, THE Portfolio_Site SHALL expand it to reveal the full project description and list of responsibilities/contributions.
5. WHEN a visitor clicks on an expanded Accordion item, THE Portfolio_Site SHALL collapse it.
6. WHERE a project URL is provided in Config, THE Portfolio_Site SHALL display a link to the project within the expanded Accordion content.

---

### Requirement 6: Страница «Навыки» (Skills)

**User Story:** As a visitor, I want to see the Owner's skills organized by category, so that I can quickly assess their technical profile.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL display a Skills page listing all skill categories and their skills, sourced from Config.
2. WHEN rendering skills, THE Portfolio_Site SHALL group them under their respective category headings (e.g., Web Technologies, Tools, Other Skills).
3. THE Portfolio_Site SHALL display each skill as a distinct visual element (tag or list item) within its category.

---

### Requirement 7: Страница «Контакты» (Contact)

**User Story:** As a visitor, I want to find the Owner's contact information with clickable links, so that I can reach out to them easily.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL display a Contact page with contact links sourced from Config.
2. WHEN rendering each contact entry, THE Portfolio_Site SHALL display an icon and a clickable link for each of the following contact types where provided in Config: email, LinkedIn, GitHub, Instagram.
3. WHEN a visitor clicks an email contact link, THE Portfolio_Site SHALL open the default mail client with the Owner's email address pre-filled.
4. WHEN a visitor clicks a social media contact link, THE Portfolio_Site SHALL open the corresponding profile URL in a new browser tab.

---

### Requirement 8: Терминальный интерфейс (Terminal Page)

**User Story:** As a visitor, I want to interact with a terminal-style interface, so that I can explore the Owner's portfolio in a unique, developer-friendly way.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL provide a Terminal_Page accessible via the Navigation and the terminal button.
2. WHEN the Terminal_Page is loaded, THE Portfolio_Site SHALL display a command-line prompt and a welcome message.
3. WHEN a visitor types a command and presses Enter, THE Terminal_Page SHALL process the command and display the output below the prompt.
4. THE Terminal_Page SHALL support at minimum the following commands: `help` (list available commands), `about` (display biography), `experience` (display work experience), `projects` (display projects list), `skills` (display skills), `contact` (display contact links), `clear` (clear the terminal output).
5. IF a visitor enters an unrecognized command, THEN THE Terminal_Page SHALL display an error message indicating the command was not found and suggest running `help`.
6. WHEN the `clear` command is executed, THE Terminal_Page SHALL remove all previous output from the display.

---

### Requirement 9: Переключение темы (Theme)

**User Story:** As a visitor, I want to switch between light and dark themes, so that I can view the portfolio in my preferred visual mode.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL support a dark theme and a light theme.
2. WHEN a visitor activates the Theme_Switcher, THE Portfolio_Site SHALL toggle between the dark and light theme and apply the new theme to all pages immediately without page reload.
3. THE Portfolio_Site SHALL persist the selected theme in the browser's local storage.
4. WHEN the Portfolio_Site is loaded, THE Portfolio_Site SHALL restore the previously selected theme from local storage, or apply the dark theme by default if no preference is stored.

---

### Requirement 10: Конфигурация и кастомизация (Config)

**User Story:** As an Owner, I want all personal data stored in a single configuration file, so that I can customize the portfolio for any person without modifying component code.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL source all Owner-specific data (name, title, location, biography, work experience, projects, skills, contact links) exclusively from Config.
2. THE Config SHALL be a single TypeScript file exporting a typed data object.
3. WHEN Config data is updated, THE Portfolio_Site SHALL reflect the changes after a rebuild without requiring modifications to any component or page files.

---

### Requirement 11: Адаптивность (Responsive Design)

**User Story:** As a visitor, I want the portfolio to display correctly on mobile and desktop devices, so that I can view it on any screen size.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL render all pages correctly on viewport widths from 320px to 1920px.
2. WHEN the viewport width is less than 768px, THE Navigation SHALL collapse into a mobile-friendly menu (hamburger or similar).
3. WHEN the viewport width is less than 768px, THE Portfolio_Site SHALL stack content vertically to prevent horizontal overflow.
