# Дизайн-токены: миграция с Tailwind CSS

## Цель

Заменить Tailwind CSS на DTCG-compliant design-tokens со сторонней темизацией (light/dark).

## Архитектура

```
tokens/
├── primitives.tokens.json    # основные значения
├── semantic.tokens.json      # семантические токены  
├── themes/
│   ├── light.tokens.json     # светлая тема
│   └── dark.tokens.json      # тёмная тема
└── resolver.json             # конфиг Terrazzo
```

## Содержание токенов

### Primitives

**Colors (sRGB):**
- `color.primitive.midnight-violet` — #171123
- `color.primitive.dark-amethyst` — #372248
- `color.primitive.tiger-flame` — #f46036
- `color.primitive.dusty-denim` — #5b85aa
- `color.primitive.twilight-indigo` — #414770
- `color.primitive.white` — #ffffff
- `color.primitive.black` — #000000

**Spacing:**
- 4, 8, 12, 16, 24, 32, 40, 48, 64 (px)

**Typography:**
- Font family: Ubuntu (Google Fonts)
- Sizes: 14, 16, 18, 20, 24, 32, 40, 70 (px)
- Weights: 300, 400, 500, 700

**Border radius:** 0, 4, 8, 12, 16, 50%

**Shadows:** none, small, medium, large

**Transitions:** 0.2s, 0.3s, 0.5s ease

### Semantic

- `color.background.page` — основной фон
- `color.background.surface` — карточки, модальные окна
- `color.text.primary` — основной текст
- `color.text.muted` — вторичный текст
- `color.interactive.primary` — основной интерактивный цвет
- `color.interactive.hover` — hover состояния

## Инструменты

- `@terrazzo/cli` + `@terrazzo/plugin-css`
- Удалить: `tailwindcss@4`, `autoprefixer`, `postcss` (или оставить для Terrazzo)

## Генерация CSS

```javascript
// terrazzo.config.mjs
export default defineConfig({
  tokens: ['./tokens/**/*.json'],
  plugins: [
    pluginCSS({
      modeSelectors: [
        { mode: 'light', selectors: [':root', "[data-theme='light']"] },
        { mode: 'dark', selectors: ["[data-theme='dark']", '@media (prefers-color-scheme: dark)'] }
      ]
    })
  ]
})
```

## Компоненты

### Layout.astro
- Убрать `@tailwind` директивы
- Подключить `tokens.css`
- Добавить `data-theme` атрибут

### Стилизация
- Все значения через CSS-переменные: `var(--color-background-page)`
- Удалить inline стили, использовать CSS-классы или стили в компонентах

## Темы

Поддержка:
1. Автоматическое определение via `prefers-color-scheme`
2. Ручное переключение via `data-theme` атрибута
3. Хранение выбранной темы в localStorage

## Файлы для удаления

- `tailwind.config.js`
- `postcss.config.cjs` (если не нужен для Terrazzo)

## Файлы для добавления

- `tokens/**/*.json`
- `terrazzo.config.mjs`
- `src/styles/tokens.css` (сгенерированный)