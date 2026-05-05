# Раскрывающиеся карточки опыта работы (Expandable Experience Cards)

## Обзор

Реализована система интерактивных карточек опыта работы с тремя состояниями:
1. **Default (По умолчанию)** - свернутая карточка с основной информацией
2. **Hover (При наведении)** - подсветка карточки
3. **Expanded (Развернутая)** - показывает детальные достижения

## Компоненты

### 1. ExperienceCard (ID: M0yF1)
**Свернутое состояние (по умолчанию)**

Структура:
- Layout: horizontal, justifyContent: "space_between"
- Width: 600px
- Padding: [20, 24]
- Corner radius: 12px
- Background: `$color-bg-surface` (#372248)

Содержимое:
- **Левая часть** (vertical layout):
  - Должность (role): fontSize 18, fontWeight "700", fill `$color-text-primary-dark`
  - Компания (company): fontSize 15, fill `$color-accent-blue`
  - Даты (dates): fontSize 13, fill `$color-text-secondary-dark`
- **Правая часть**:
  - Chevron icon (chevron-right): 20x20px, fill `$color-text-secondary-dark`

### 2. ExperienceCard Hover (ID: Lckng)
**Состояние при наведении**

Изменения:
- Background: #4a2f5e (более светлый оттенок)
- Chevron icon: fill `$color-accent` (#f46036) - оранжевый

### 3. ExperienceCard Expanded (ID: u3VvL)
**Развернутое состояние (после клика)**

Структура:
- Layout: vertical, gap: 12px
- Width: 600px
- Padding: [20, 24]
- Corner radius: 12px
- Background: `$color-bg-surface` (#372248)

Содержимое:
1. **Header Row** (horizontal layout):
   - Левая часть: должность, компания, даты
   - Правая часть: Chevron icon (chevron-down) - указывает, что карточка развернута

2. **Divider** (разделитель):
   - Height: 1px
   - Fill: `$color-divider` (#414770)

3. **Achievements Section** (секция достижений):
   - Title: "Key Achievements:" (fontSize 14, fontWeight "600")
   - Список достижений (bullet points):
     - Каждое достижение: bullet "•" (цвет `$color-accent`) + текст
     - Текст: fontSize 14, fill `$color-text-secondary-dark`
     - Layout: horizontal, gap: 8px

## Примеры достижений

```
• Led a team of 5 developers in building scalable web applications
• Improved application performance by 40% through optimization
• Implemented CI/CD pipeline reducing deployment time by 60%
```

## Использование на экранах

### Work Experience Screen (ID: DpACZ)

Обновлено:
- ✅ Первая карточка показана в развернутом состоянии (пример)
- ✅ Все остальные карточки имеют chevron-right иконку
- ✅ Все карточки кликабельны

## Демонстрационные экраны

### 1. Experience Cards Demo (ID: XODua)
Показывает три состояния карточки:
- Collapsed (Default) - свернутое состояние
- Hover State - при наведении
- Expanded (Clicked) - развернутое состояние

### 2. Interactive Experience Card Demo (ID: E1vwCj)
Показывает flow взаимодействия:
```
1. Default State → 2. Hover → 3. Expanded (Clicked)
```
С стрелками между состояниями для наглядности.

## Интерактивное поведение

### Клик на карточку:
1. Карточка плавно расширяется по высоте
2. Chevron меняется с `chevron-right` на `chevron-down`
3. Появляется divider
4. Плавно появляется секция с достижениями

### Повторный клик:
1. Секция достижений плавно скрывается
2. Divider исчезает
3. Chevron меняется обратно на `chevron-right`
4. Карточка сворачивается до исходного размера

### Hover эффект:
- Background меняется на более светлый (#4a2f5e)
- Chevron меняет цвет на accent (#f46036)
- Курсор: pointer

## Цветовая схема

```css
/* Backgrounds */
$color-bg-surface: #372248      /* Карточка по умолчанию */
#4a2f5e                         /* Карточка при hover */

/* Text */
$color-text-primary-dark: #ffffff
$color-text-secondary-dark: #bbbcc4
$color-accent-blue: #5b85aa

/* Accent */
$color-accent: #f46036          /* Bullet points, hover chevron */

/* Divider */
$color-divider: #414770
```

## Анимации (рекомендации для реализации)

### Expand/Collapse:
```css
transition: all 0.3s ease-in-out;
```

### Hover:
```css
transition: background-color 0.2s ease;
```

### Chevron rotation:
```css
transform: rotate(90deg);
transition: transform 0.3s ease;
```

## Accessibility

### Keyboard Navigation:
- Tab: переход между карточками
- Enter/Space: раскрыть/свернуть карточку
- Escape: свернуть все открытые карточки

### ARIA Attributes:
```html
<div 
  role="button" 
  aria-expanded="false"
  aria-label="Module Lead at Edfora Infotech. Click to see achievements"
  tabindex="0"
>
```

### Screen Reader:
- Announce: "Experience card, collapsed. Click to expand and see achievements"
- When expanded: "Experience card, expanded. Showing 3 achievements"

## Responsive Design

### Desktop (> 1024px):
- Card width: 600px
- Full content visible

### Tablet (768px - 1024px):
- Card width: 100% (max 600px)
- Padding: [16, 20]

### Mobile (< 768px):
- Card width: 100%
- Padding: [12, 16]
- Font sizes: slightly reduced
- Achievements: full width, no horizontal scroll

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

### Animation:
```javascript
// Framer Motion example
<motion.div
  initial={false}
  animate={{ height: isExpanded ? 'auto' : 'initial' }}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
>
```

## Варианты использования

1. **Single Expand**: Только одна карточка может быть открыта одновременно
2. **Multiple Expand**: Несколько карточек могут быть открыты (текущая реализация)
3. **Accordion Mode**: Открытие новой карточки закрывает предыдущую

## Будущие улучшения

- [ ] Добавить badge "Current" для текущей позиции
- [ ] Добавить технологии/навыки в виде тегов
- [ ] Добавить ссылки на проекты
- [ ] Добавить изображения компаний
- [ ] Добавить timeline визуализацию
