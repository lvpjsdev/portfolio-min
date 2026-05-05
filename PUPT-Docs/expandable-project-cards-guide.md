# Раскрывающиеся карточки проектов (Expandable Project Cards)

## Обзор

Реализована система интерактивных карточек проектов с двумя состояниями:
1. **Collapsed (Свернутое)** - компактная карточка с основной информацией
2. **Expanded (Развернутое)** - показывает полное описание, скриншот, технологии и ссылки

## Компоненты

### 1. ProjectCard Collapsed (ID: Q0Co2E)
**Свернутое состояние (по умолчанию)**

Структура:
- Layout: vertical, gap: 12px
- Width: 700px (или fill_container)
- Padding: [20, 24]
- Corner radius: 12px
- Background: `$color-bg-surface` (#372248) для темной темы
- Background: `$color-bg-surface-light` (#f7f7f8) для светлой темы

Содержимое:
1. **Header Row** (horizontal layout, space-between):
   - **Левая часть** (vertical layout, gap: 6px):
     - Название проекта: fontSize 18, fontWeight "700", fill `$color-text-primary-dark`
     - Подзаголовок: fontSize 13, fill `$color-accent-blue` (#5b85aa)
   - **Правая часть**:
     - Chevron icon (chevron-right): 20x20px, fill `$color-text-secondary-dark`

2. **Краткое описание**:
   - fontSize: 14
   - fontWeight: "normal"
   - fill: `$color-text-secondary-dark`
   - textGrowth: "fixed-width"
   - lineHeight: 1.6

3. **Теги технологий** (horizontal layout, gap: 8px):
   - Каждый тег: padding [6, 12], cornerRadius: 6px
   - Background: `$color-tag-bg` (#414770) для темной темы
   - Background: #e8eaf0 для светлой темы
   - Text: fontSize 13, fill `$color-tag-text`

### 2. ProjectCard Expanded (ID: pBHXg)
**Развернутое состояние (после клика)**

Структура:
- Layout: vertical, gap: 16px
- Width: 700px (или fill_container)
- Padding: [24, 28]
- Corner radius: 12px
- Background: `$color-bg-surface` (#372248) для темной темы

Содержимое:

1. **Header Row** (horizontal layout, space-between):
   - **Левая часть** (vertical layout, gap: 8px):
     - Название проекта: fontSize 22, fontWeight "700"
     - Подзаголовок: fontSize 14, fill `$color-accent-blue`
   - **Правая часть**:
     - Chevron icon (chevron-down): 24x24px - указывает, что карточка развернута

2. **Divider** (разделитель):
   - Height: 1px
   - Fill: `$color-divider` (#414770) для темной темы
   - Fill: #d0d2d8 для светлой темы

3. **Description Section** (vertical layout, gap: 12px):
   - Title: "Description" (fontSize 15, fontWeight "600")
   - Text: Полное описание проекта
     - fontSize: 14
     - lineHeight: 1.6
     - fill: `$color-text-secondary-dark`

4. **Preview Section** (vertical layout, gap: 12px):
   - Title: "Preview" (fontSize 15, fontWeight "600")
   - Screenshot Frame:
     - Width: fill_container
     - Height: 320px
     - Corner radius: 8px
     - Fill: изображение или placeholder (#1e1535)

5. **Technologies Section** (vertical layout, gap: 12px):
   - Title: "Technologies" (fontSize 15, fontWeight "600")
   - Tags: horizontal layout, gap: 8px
     - Стиль тегов как в свернутом состоянии

6. **Links Section** (vertical layout, gap: 12px):
   - Title: "Links" (fontSize 15, fontWeight "600")
   - Buttons Row (horizontal layout, gap: 12px):
     - **Live Demo Button**:
       - Background: `$color-accent` (#f46036)
       - Text: "Live Demo" (fontSize 14, fontWeight "600", fill: #ffffff)
       - Icon: external-link (18x18px)
       - Padding: [10, 16]
       - Corner radius: 8px
     - **View Code Button**:
       - Background: `$color-tag-bg` (#414770)
       - Text: "View Code" (fontSize 14, fontWeight "600")
       - Icon: github (18x18px)
       - Padding: [10, 16]
       - Corner radius: 8px

## Примеры проектов

### E-Commerce Platform
```
Title: E-Commerce Platform
Subtitle: Full-Stack Web Application
Description: Built a comprehensive full-stack e-commerce solution with modern technologies. 
The platform features a responsive product catalog, advanced search and filtering, 
shopping cart with real-time updates, secure payment integration with Stripe, 
user authentication and authorization, order tracking system, and a complete admin 
dashboard for inventory management.
Technologies: React, Node.js, MongoDB
```

### Task Management App
```
Title: Task Management App
Subtitle: Real-time Collaboration Tool
Description: Developed a collaborative task management application with real-time updates 
using WebSockets. The platform includes an intuitive drag-and-drop interface for organizing 
tasks, team collaboration features with role-based permissions, real-time notifications, 
progress tracking with visual dashboards, and integration with popular tools like Slack and GitHub.
Technologies: Vue.js, Socket.io, PostgreSQL
```

## Использование на экранах

### Projects Screen (ID: lOtWQ)
Страница проектов с интеграцией карточек:
- Sidebar слева (64px)
- Main content area справа
- Заголовок "Projects" с accent divider
- Список карточек проектов (vertical layout, gap: 16px)

### Demo Screens

1. **Projects with Expandable Cards Demo** (ID: fd43R)
   - Показывает одну развернутую карточку и две свернутые
   - Демонстрирует интеграцию в полноценную страницу

2. **Multiple Expanded Cards Demo** (ID: I1w1l)
   - Показывает несколько развернутых карточек одновременно
   - Демонстрирует поведение при множественном раскрытии

3. **Single Expanded Card Focus** (ID: HeYdS)
   - Фокус на одной развернутой карточке
   - Показывает все детали компонента

## Интерактивное поведение

### Клик на карточку:
1. Карточка плавно расширяется по высоте
2. Chevron меняется с `chevron-right` на `chevron-down`
3. Появляется divider
4. Плавно появляются секции: Description, Preview, Technologies, Links

### Повторный клик:
1. Дополнительные секции плавно скрываются
2. Divider исчезает
3. Chevron меняется обратно на `chevron-right`
4. Карточка сворачивается до исходного размера

### Hover эффект:
- Курсор: pointer
- Легкое изменение background (опционально)

## Цветовая схема

### Темная тема (Dark Theme)
```css
/* Backgrounds */
$color-bg-surface: #372248      /* Карточка */
$color-bg-dark: #171123         /* Страница */
$color-tag-bg: #414770          /* Теги */

/* Text */
$color-text-primary-dark: #ffffff
$color-text-secondary-dark: #bbbcc4
$color-accent-blue: #5b85aa

/* Accent */
$color-accent: #f46036          /* Кнопка Live Demo */

/* Divider */
$color-divider: #414770
```

### Светлая тема (Light Theme)
```css
/* Backgrounds */
$color-bg-surface-light: #f7f7f8    /* Карточка */
$color-bg-light: #ffffff            /* Страница */
Tag Background: #e8eaf0             /* Теги */

/* Text */
$color-text-primary-light: #212121
$color-text-secondary-light: #6b6e74
$color-accent-blue: #5b85aa

/* Accent */
$color-accent: #f46036              /* Кнопка Live Demo */

/* Divider */
Divider: #d0d2d8
```

## Анимации (рекомендации для реализации)

### Expand/Collapse:
```css
transition: all 0.3s ease-in-out;
```

### Chevron rotation:
```css
transform: rotate(90deg);
transition: transform 0.3s ease;
```

### Content fade-in:
```css
opacity: 0 → 1;
transition: opacity 0.3s ease;
```

## Accessibility

### Keyboard Navigation:
- Tab: переход между карточками
- Enter/Space: раскрыть/свернуть карточку
- Tab внутри развернутой карточки: переход по ссылкам

### ARIA Attributes:
```html
<div 
  role="button" 
  aria-expanded="false"
  aria-label="E-Commerce Platform project. Click to see details"
  tabindex="0"
>
```

### Screen Reader:
- Announce: "Project card, collapsed. Click to expand and see details"
- When expanded: "Project card, expanded. Showing description, preview, technologies and links"

## Responsive Design

### Desktop (> 1024px):
- Card width: 700px или fill_container
- Full content visible
- Screenshot height: 320px

### Tablet (768px - 1024px):
- Card width: 100%
- Padding: [20, 24]
- Screenshot height: 280px

### Mobile (< 768px):
- Card width: 100%
- Padding: [16, 20]
- Font sizes: slightly reduced
- Screenshot height: 200px
- Buttons: stack vertically (full width)

## Технические детали

### State Management:
```javascript
const [expandedCards, setExpandedCards] = useState(new Set());

const toggleCard = (cardId) => {
  setExpandedCards(prev => {
    const newSet = new Set(prev);
    if (newSet.has(cardId)) {
      newSet.delete(cardId);
    } else {
      newSet.add(cardId);
    }
    return newSet;
  });
};
```

### Animation (Framer Motion):
```javascript
<motion.div
  initial={false}
  animate={{ 
    height: isExpanded ? 'auto' : 'initial',
    opacity: isExpanded ? 1 : 0.8
  }}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
>
```

### Image Loading:
```javascript
// Lazy loading для скриншотов
<img 
  src={project.screenshot} 
  alt={`${project.title} preview`}
  loading="lazy"
/>
```

## Варианты использования

1. **Single Expand**: Только одна карточка может быть открыта одновременно
2. **Multiple Expand**: Несколько карточек могут быть открыты (рекомендуется)
3. **Auto-collapse**: Автоматическое сворачивание при скролле

## Design Tokens

### Spacing
```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 40px
```

### Border Radius
```css
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
```

### Typography
```css
--font-family: Inter
--font-size-small: 13px
--font-size-body: 14px
--font-size-h3: 18px
--font-size-h2: 22px
```

## Документация и примеры

### Файлы дизайна:
- **Pencil Design**: `docs/expandable-project-cards-design.pen`
- **Screenshots**: Экспортированы из Pencil

### Демо-экраны в дизайне:
1. Component Showcase - Детальная документация компонентов
2. Component Specifications - Спецификации и токены
3. Usage Examples - Примеры использования
4. Light Theme Color Palette - Палитра цветов для светлой темы

## Будущие улучшения

- [ ] Добавить фильтрацию проектов по технологиям
- [ ] Добавить сортировку (по дате, по названию)
- [ ] Добавить поиск по проектам
- [ ] Добавить категории проектов (Web, Mobile, Desktop)
- [ ] Добавить статус проекта (In Progress, Completed, Archived)
- [ ] Добавить метрики проекта (stars, forks для GitHub)
- [ ] Добавить галерею скриншотов (не только один)
- [ ] Добавить видео-демо вместо статичного скриншота

## Связанные компоненты

- **ExperienceCard**: Похожий паттерн для карточек опыта работы
- **SkillTag**: Используется для отображения технологий
- **Sidebar**: Навигация на странице проектов

## Changelog

### Version 1.0.0 (2026-05-05)
- ✅ Создан базовый компонент ProjectCard Collapsed
- ✅ Создан компонент ProjectCard Expanded
- ✅ Добавлена секция Preview со скриншотом
- ✅ Добавлены кнопки Live Demo и View Code
- ✅ Создана палитра цветов для светлой темы
- ✅ Создана полная документация
- ✅ Созданы демо-экраны для всех состояний
