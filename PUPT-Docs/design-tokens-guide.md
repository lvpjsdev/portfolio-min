# Design Tokens Guide

Руководство по использованию дизайн-токенов портфолио-сайта.

---

## 📦 Структура токенов

### Файлы токенов

```
tokens/
├── primitives.tokens.json    # Примитивные токены (цвета, размеры)
├── semantic.tokens.json      # Семантические токены (компоненты)
├── light/
│   └── tokens.json          # Токены светлой темы
└── dark/
    └── tokens.json          # Токены тёмной темы
```

### Генерация CSS

Токены компилируются в CSS через **Terrazzo**:

```bash
npm run build:tokens
```

Результат: `src/styles/tokens.css`

---

## 🎨 Примитивные токены

### Цвета (Primitives)

```json
{
  "color": {
    "primitive": {
      "midnight-violet": "#171123",
      "dark-amethyst": "#372248",
      "tiger-flame": "#f46036",
      "dusty-denim": "#5b85aa",
      "twilight-indigo": "#414770",
      "silver-mist": "#bbbcc4",
      "white": "#ffffff",
      "black": "#000000"
    }
  }
}
```

**Использование в CSS:**

```css
background: var(--color-primitive-midnight-violet);
color: var(--color-primitive-tiger-flame);
```

---

### Отступы (Spacing)

```json
{
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "12px",
    "lg": "16px",
    "xl": "24px",
    "2xl": "32px",
    "3xl": "40px",
    "4xl": "48px",
    "5xl": "64px"
  }
}
```

**Использование:**

```css
padding: var(--spacing-lg);
gap: var(--spacing-md);
margin: var(--spacing-xl);
```

---

### Типографика

**Размеры шрифтов:**

```json
{
  "fontSize": {
    "xs": "14px",
    "sm": "16px",
    "base": "18px",
    "lg": "20px",
    "xl": "24px",
    "2xl": "32px",
    "7xl": "70px"
  }
}
```

**Семейство шрифтов:**

```json
{
  "fontFamily": {
    "sans": "Ubuntu, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  }
}
```

**Вес шрифта:**

```json
{
  "fontWeight": {
    "normal": 400,
    "medium": 500,
    "bold": 700
  }
}
```

**Использование:**

```css
font-family: var(--font-family-sans);
font-size: var(--font-size-2xl);
font-weight: var(--font-weight-bold);
```

---

### Радиусы скругления

```json
{
  "borderRadius": {
    "none": "0",
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px",
    "full": "9999px"
  }
}
```

**Использование:**

```css
border-radius: var(--border-radius-lg);
border-radius: var(--border-radius-full); /* для кругов */
```

---

### Длительность анимаций

```json
{
  "duration": {
    "fast": "200ms",
    "normal": "300ms",
    "slow": "550ms"
  }
}
```

**Использование:**

```css
transition: all var(--duration-normal);
animation-duration: var(--duration-slow);
```

---

## 🎯 Семантические токены

### Интерактивные цвета

```json
{
  "color": {
    "interactive": {
      "primary": "{color.primitive.tiger-flame}",
      "secondary": "{color.primitive.dusty-denim}"
    }
  }
}
```

**Использование:**

```css
/* Кнопки, ссылки */
color: var(--color-interactive-primary);

/* Вторичные элементы */
color: var(--color-interactive-secondary);
```

---

### Компоненты

```json
{
  "spacing": {
    "component": {
      "padding": "{spacing.lg}",
      "gap": "{spacing.md}"
    }
  },
  "borderRadius": {
    "button": "{borderRadius.lg}",
    "card": "{borderRadius.xl}"
  }
}
```

**Использование:**

```css
/* Карточки */
.card {
  padding: var(--spacing-component-padding);
  border-radius: var(--border-radius-card);
}

/* Кнопки */
.button {
  padding: var(--spacing-component-padding);
  border-radius: var(--border-radius-button);
}
```

---

## 🌓 Темы (Light/Dark)

### Тёмная тема (по умолчанию)

```css
[data-theme="dark"],
:root {
  --color-background-page: rgb(9% 7% 14%);
  --color-background-surface: rgb(22% 13% 28%);
  --color-text-primary: rgb(100% 100% 100%);
  --color-text-secondary: rgb(73% 74% 78%);
}
```

### Светлая тема

```css
[data-theme="light"] {
  --color-background-page: rgb(100% 100% 100%);
  --color-background-surface: rgb(97% 97% 98%);
  --color-text-primary: rgb(13% 13% 13%);
  --color-text-secondary: rgb(42% 44% 46%);
}
```

### Переключение темы

```javascript
// JavaScript
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-theme', 'light');

// Сохранение в localStorage
localStorage.setItem('theme', 'dark');
```

---

## 🧩 Примеры использования

### Карточка опыта работы

```css
.experience-card {
  background: var(--color-primitive-dark-amethyst);
  padding: var(--spacing-lg) var(--spacing-xl);
  border-radius: var(--border-radius-card);
  gap: var(--spacing-sm);
}

.experience-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.experience-card__company {
  font-size: var(--font-size-sm);
  color: var(--color-interactive-secondary);
}

.experience-card__dates {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}
```

---

### Тег навыка

```css
.skill-tag {
  display: inline-flex;
  padding: 6px 12px;
  background: var(--color-primitive-twilight-indigo);
  color: var(--color-primitive-white);
  font-size: var(--font-size-xs);
  border-radius: var(--border-radius-sm);
  transition: background var(--duration-fast);
}

.skill-tag--accent {
  background: var(--color-interactive-primary);
}

.skill-tag:hover {
  opacity: 0.8;
}
```

---

### Навигационная точка

```css
.nav-dot {
  width: 10px;
  height: 10px;
  border-radius: var(--border-radius-full);
  background: var(--color-primitive-twilight-indigo);
  transition: all var(--duration-fast);
}

.nav-dot--active {
  background: var(--color-primitive-white);
  transform: scale(1.2);
}

.nav-dot:hover {
  transform: scale(1.5);
}
```

---

### Карточка контакта

```css
.contact-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) var(--spacing-xl);
  background: var(--color-background-surface);
  border-radius: var(--border-radius-card);
  transition: transform var(--duration-normal);
}

.contact-card:hover {
  transform: translateY(-2px);
}

.contact-card__icon {
  width: 24px;
  height: 24px;
  color: var(--color-interactive-primary);
}

.contact-card__text {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
}
```

---

## 📱 Адаптивность

### Breakpoints (рекомендуемые)

```css
/* Mobile */
@media (max-width: 767px) {
  :root {
    --spacing-component-padding: var(--spacing-md);
    --font-size-hero: 48px;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  :root {
    --spacing-component-padding: var(--spacing-lg);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  :root {
    --spacing-component-padding: var(--spacing-xl);
  }
}
```

---

## ✅ Best Practices

### 1. Всегда используйте токены

❌ **Плохо:**
```css
.card {
  background: #372248;
  padding: 20px 24px;
  border-radius: 12px;
}
```

✅ **Хорошо:**
```css
.card {
  background: var(--color-primitive-dark-amethyst);
  padding: var(--spacing-lg) var(--spacing-xl);
  border-radius: var(--border-radius-card);
}
```

---

### 2. Используйте семантические токены для компонентов

❌ **Плохо:**
```css
.button {
  color: var(--color-primitive-tiger-flame);
}
```

✅ **Хорошо:**
```css
.button {
  color: var(--color-interactive-primary);
}
```

---

### 3. Не переопределяйте токены напрямую

❌ **Плохо:**
```css
:root {
  --color-primitive-tiger-flame: #ff0000; /* Не делайте так! */
}
```

✅ **Хорошо:**
Измените значение в `tokens/primitives.tokens.json` и пересоберите:
```bash
npm run build:tokens
```

---

### 4. Используйте CSS-переменные для динамических значений

```css
.card {
  --card-padding: var(--spacing-lg);
  padding: var(--card-padding);
}

.card--large {
  --card-padding: var(--spacing-2xl);
}
```

---

## 🔄 Обновление токенов

### Процесс обновления

1. Измените значения в `tokens/*.tokens.json`
2. Пересоберите CSS: `npm run build:tokens`
3. Проверьте изменения в браузере
4. Закоммитьте изменения в Git

### Пример изменения цвета

```json
// tokens/primitives.tokens.json
{
  "color": {
    "primitive": {
      "tiger-flame": {
        "$type": "color",
        "$value": "#ff5722"  // Новый цвет
      }
    }
  }
}
```

```bash
npm run build:tokens
```

Все элементы, использующие `--color-primitive-tiger-flame`, автоматически обновятся.

---

## 📚 Дополнительные ресурсы

- [Terrazzo Documentation](https://terrazzo.app/)
- [Design Tokens Community Group](https://www.w3.org/community/design-tokens/)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---

## 🎯 Итоги

Дизайн-токены обеспечивают:
- ✅ Консистентность дизайна
- ✅ Легкость обновления
- ✅ Поддержку тем (светлая/тёмная)
- ✅ Масштабируемость
- ✅ Единый источник правды (Single Source of Truth)

Всегда используйте токены вместо хардкода значений!
