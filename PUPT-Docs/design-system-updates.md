# Обновления дизайн-системы портфолио

## Дата: 5 мая 2026

## Обзор изменений

Реализованы две основные функции для улучшения UX портфолио:

1. ✅ **Выдвижное боковое меню** (Expandable Sidebar)
2. ✅ **Раскрывающиеся карточки опыта работы** (Expandable Experience Cards)

---

## 1. Выдвижное боковое меню

### Что изменилось:
- ❌ Удален верхний navbar со всех экранов
- ✅ Добавлено боковое меню с двумя состояниями (collapsed/expanded)
- ✅ Меню расширяется при наведении курсора

### Новые компоненты:
- **Sidebar** (ID: cBOTB) - свернутое состояние, 64px
- **Sidebar Expanded** (ID: Evmgl) - развернутое состояние, 240px
- **NavItem** (ID: vwaMs) - элемент меню с точкой и текстом
- **NavItem Hover** (ID: V4SLD) - состояние при наведении

### Обновленные экраны:
1. 01 — Home (Dark) - navbar удален ✅
2. 02 — About Me - navbar удален ✅
3. 03 — Work Experience - navbar удален ✅
4. 04 — Skills - navbar удален ✅
5. 05 — Contact - navbar удален ✅
6. 04 — Projects - navbar удален ✅

### Демо-экраны:
- **Sidebar States Demo** (ID: lzKEM) - сравнение состояний
- **Interactive Menu States** (ID: u2CdkV) - состояния элементов
- **Full Page Demo** (ID: r0iENG) - полный пример страницы

### Документация:
📄 `expandable-sidebar-guide.md`

---

## 2. Раскрывающиеся карточки опыта работы

### Что изменилось:
- ✅ Карточки теперь кликабельны
- ✅ При клике показываются достижения
- ✅ Добавлены chevron иконки для индикации
- ✅ Hover-эффекты для лучшего UX

### Новые компоненты:
- **ExperienceCard** (ID: M0yF1) - обновлен с chevron иконкой
- **ExperienceCard Hover** (ID: Lckng) - состояние при наведении
- **ExperienceCard Expanded** (ID: u3VvL) - развернутое состояние с достижениями

### Структура развернутой карточки:
```
┌─────────────────────────────────────────┐
│ Module Lead                          ▼  │
│ Edfora Infotech Pvt. Ltd., Delhi       │
│ September, 2022 – Present               │
├─────────────────────────────────────────┤
│ Key Achievements:                       │
│ • Led a team of 5 developers...        │
│ • Improved performance by 40%...       │
│ • Implemented CI/CD pipeline...        │
└─────────────────────────────────────────┘
```

### Обновленные экраны:
- **Work Experience** (ID: DpACZ) - все карточки обновлены ✅

### Демо-экраны:
- **Experience Cards Demo** (ID: XODua) - три состояния карточки
- **Interactive Experience Card Demo** (ID: E1vwCj) - flow взаимодействия

### Документация:
📄 `expandable-cards-guide.md`

---

## Цветовая схема (без изменений)

```css
/* Backgrounds */
$color-bg-dark: #171123
$color-bg-surface: #372248
$color-sidebar: #372248

/* Text */
$color-text-primary-dark: #ffffff
$color-text-secondary-dark: #bbbcc4

/* Accent */
$color-accent: #f46036
$color-accent-blue: #5b85aa
$color-nav-dot: #f46036
$color-nav-dot-active: #ffffff

/* UI Elements */
$color-divider: #414770
$color-tag-bg: #414770
```

---

## Технические рекомендации для разработки

### 1. Выдвижное меню:
```javascript
// CSS Transition
.sidebar {
  width: 64px;
  transition: width 0.3s ease-in-out;
}

.sidebar:hover {
  width: 240px;
}

.nav-label {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.sidebar:hover .nav-label {
  opacity: 1;
}
```

### 2. Раскрывающиеся карточки:
```javascript
// React State
const [expandedCards, setExpandedCards] = useState(new Set());

// Framer Motion
<motion.div
  animate={{ height: isExpanded ? 'auto' : 'initial' }}
  transition={{ duration: 0.3 }}
>
```

---

## Accessibility

### Keyboard Navigation:
- **Tab**: навигация между элементами
- **Enter/Space**: активация кнопок/карточек
- **Escape**: закрытие развернутых элементов

### ARIA Labels:
```html
<!-- Sidebar -->
<nav aria-label="Main navigation">
  <button aria-label="Home" aria-current="page">

<!-- Experience Cards -->
<div role="button" 
     aria-expanded="false"
     aria-label="Module Lead at Edfora. Click to see achievements">
```

---

## Responsive Design

### Desktop (> 1024px):
- Sidebar: 64px → 240px при hover
- Cards: 600px width

### Tablet (768px - 1024px):
- Sidebar: возможно drawer/hamburger menu
- Cards: 100% width (max 600px)

### Mobile (< 768px):
- Sidebar: hamburger menu
- Cards: 100% width, уменьшенные отступы

---

## Файлы документации

1. 📄 `expandable-sidebar-guide.md` - полное руководство по боковому меню
2. 📄 `expandable-cards-guide.md` - полное руководство по карточкам
3. 📄 `design-system-updates.md` - этот файл (сводка изменений)

---

## Следующие шаги

### Для дизайнера:
- [ ] Создать мобильную версию sidebar (hamburger menu)
- [ ] Добавить микроанимации для переходов
- [ ] Создать dark/light theme варианты

### Для разработчика:
- [ ] Реализовать CSS transitions для sidebar
- [ ] Реализовать state management для карточек
- [ ] Добавить keyboard navigation
- [ ] Добавить ARIA attributes
- [ ] Протестировать с screen readers
- [ ] Оптимизировать для мобильных устройств

---

## Вдохновение

- Выдвижное меню: [geettrivedi.com](https://www.geettrivedi.com/)
- Раскрывающиеся карточки: Accordion pattern, Material Design

---

## Контакты

Для вопросов по дизайн-системе обращайтесь к документации в папке `PUPT-Docs/`.
