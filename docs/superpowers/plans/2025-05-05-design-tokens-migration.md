# Дизайн-токены: миграция с Tailwind CSS

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Заменить Tailwind CSS на DTCG-compliant design-tokens со сторонней темизацией (light/dark).

**Architecture:** Использовать Terrazzo CLI для генерации CSS из JSON-файлов токенов. Три уровня: primitives → semantic → themes (light/dark).

**Tech Stack:** Astro, Terrazzo CLI, CSS Variables, DTCG tokens

---

## Files Structure

```
tokens/
├── primitives.tokens.json    # Сырые значения (цвета, spacing, typography)
├── semantic.tokens.json      # Семантические токены
├── themes/
│   ├── light.tokens.json     # Светлая тема
│   └── dark.tokens.json      # Тёмная тема
└── resolver.json             # Конфиг Terrazzo
terrazzo.config.mjs           # Конфигурация генерации
src/styles/tokens.css         # Сгенерированный CSS (в gitignore)
```

---

### Task 1: Установить Terrazzo CLI

**Files:**
- Create: `terrazzo.config.mjs` — конфигурация генерации CSS

- [ ] **Step 1: Установить зависимости**

```bash
npm install -D @terrazzo/cli @terrazzo/plugin-css
```

- [ ] **Step 2: Создать terrazzo.config.mjs**

```javascript
import { defineConfig } from '@terrazzo/cli';
import pluginCSS from '@terrazzo/plugin-css';

export default defineConfig({
  tokens: ['./tokens/**/*.json'],
  outDir: './src/styles/',
  plugins: [
    pluginCSS({
      filename: 'tokens.css',
      modeSelectors: [
        { mode: 'light', selectors: [':root', "[data-theme='light']"] },
        { mode: 'dark', selectors: ["[data-theme='dark']", '@media (prefers-color-scheme: dark)'] },
      ],
    }),
  ],
});
```

- [ ] **Step 3: Добавить скрипт в package.json**

```bash
npm pkg set scripts.tokens="terrazzo build"
```

- [ ] **Step 4: Проверить установку**

```bash
npx terrazzo --version
```

- [ ] **Step 5: Commit**

```bash
git add terrazzo.config.mjs package.json
git commit -m "feat: add terrazzo configuration"
```

---

### Task 2: Создать primitives.tokens.json

**Files:**
- Create: `tokens/primitives.tokens.json` — базовые токены

- [ ] **Step 1: Создать файл с цветами**

```json
{
  "color": {
    "primitive": {
      "midnight-violet": {
        "$type": "color",
        "$value": { "colorSpace": "srgb", "components": [0.09, 0.07, 0.14], "hex": "#171123" }
      },
      "dark-amethyst": {
        "$type": "color",
        "$value": { "colorSpace": "srgb", "components": [0.22, 0.13, 0.28], "hex": "#372248" }
      },
      "tiger-flame": {
        "$type": "color",
        "$value": { "colorSpace": "srgb", "components": [0.96, 0.38, 0.21], "hex": "#f46036" }
      },
      "dusty-denim": {
        "$type": "color",
        "$value": { "colorSpace": "srgb", "components": [0.36, 0.52, 0.67], "hex": "#5b85aa" }
      },
      "twilight-indigo": {
        "$type": "color",
        "$value": { "colorSpace": "srgb", "components": [0.25, 0.28, 0.44], "hex": "#414770" }
      },
      "white": {
        "$type": "color",
        "$value": { "colorSpace": "srgb", "components": [1, 1, 1], "hex": "#ffffff" }
      },
      "black": {
        "$type": "color",
        "$value": { "colorSpace": "srgb", "components": [0, 0, 0], "hex": "#000000" }
      }
    }
  }
}
```

- [ ] **Step 2: Добавить spacing токены**

```json
{
  "spacing": {
    "$type": "dimension",
    "xs": { "$value": { "value": 4, "unit": "px" } },
    "sm": { "$value": { "value": 8, "unit": "px" } },
    "md": { "$value": { "value": 12, "unit": "px" } },
    "lg": { "$value": { "value": 16, "unit": "px" } },
    "xl": { "$value": { "value": 24, "unit": "px" } },
    "2xl": { "$value": { "value": 32, "unit": "px" } },
    "3xl": { "$value": { "value": 40, "unit": "px" } },
    "4xl": { "$value": { "value": 48, "unit": "px" } },
    "5xl": { "$value": { "value": 64, "unit": "px" } }
  }
}
```

- [ ] **Step 3: Добавить typography токены**

```json
{
  "fontFamily": {
    "sans": {
      "$type": "fontFamily",
      "$value": "Ubuntu, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }
  },
  "fontSize": {
    "$type": "dimension",
    "xs": { "$value": { "value": 14, "unit": "px" } },
    "sm": { "$value": { "value": 16, "unit": "px" } },
    "base": { "$value": { "value": 18, "unit": "px" } },
    "lg": { "$value": { "value": 20, "unit": "px" } },
    "xl": { "$value": { "value": 24, "unit": "px" } },
    "2xl": { "$value": { "value": 32, "unit": "px" } },
    "7xl": { "$value": { "value": 70, "unit": "px" } }
  },
  "fontWeight": {
    "$type": "fontWeight",
    "normal": { "$value": 400 },
    "medium": { "$value": 500 },
    "bold": { "$value": 700 }
  }
}
```

- [ ] **Step 4: Добавить borderRadius токены**

```json
{
  "borderRadius": {
    "$type": "dimension",
    "none": { "$value": { "value": 0, "unit": "px" } },
    "sm": { "$value": { "value": 4, "unit": "px" } },
    "md": { "$value": { "value": 8, "unit": "px" } },
    "lg": { "$value": { "value": 12, "unit": "px" } },
    "xl": { "$value": { "value": 16, "unit": "px" } },
    "full": { "$value": { "value": 50, "unit": "%" } }
  }
}
```

- [ ] **Step 5: Добавить transition токены**

```json
{
  "duration": {
    "$type": "duration",
    "fast": { "$value": { "value": 200, "unit": "ms" } },
    "normal": { "$value": { "value": 300, "unit": "ms" } },
    "slow": { "$value": { "value": 550, "unit": "ms" } }
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add tokens/primitives.tokens.json
git commit -m "feat: add primitives design tokens"
```

---

### Task 3: Создать темы (light и dark)

**Files:**
- Create: `tokens/themes/light.tokens.json`
- Create: `tokens/themes/dark.tokens.json`

- [ ] **Step 1: Создать light.tokens.json**

```json
{
  "$extensions": { "mode": "light" },
  "color": {
    "background": {
      "page": { "$type": "color", "$value": { "colorSpace": "srgb", "components": [1, 1, 1], "hex": "#ffffff" } },
      "surface": { "$type": "color", "$value": { "colorSpace": "srgb", "components": [0.97, 0.97, 0.98], "hex": "#f5f5f6" } }
    },
    "text": {
      "primary": { "$type": "color", "$value": { "colorSpace": "srgb", "components": [0.13, 0.13, 0.13], "hex": "#212121" } },
      "secondary": { "$type": "color", "$value": { "colorSpace": "srgb", "components": [0.42, 0.44, 0.46], "hex": "#6b6c74" } }
    }
  }
}
```

- [ ] **Step 2: Создать dark.tokens.json**

```json
{
  "$extensions": { "mode": "dark" },
  "color": {
    "background": {
      "page": { "$type": "color", "$value": { "colorSpace": "srgb", "components": [0.09, 0.07, 0.14], "hex": "#171123" } },
      "surface": { "$type": "color", "$value": { "colorSpace": "srgb", "components": [0.22, 0.13, 0.28], "hex": "#372248" } }
    },
    "text": {
      "primary": { "$type": "color", "$value": { "colorSpace": "srgb", "components": [1, 1, 1], "hex": "#ffffff" } },
      "secondary": { "$type": "color", "$value": { "colorSpace": "srgb", "components": [0.73, 0.74, 0.78], "hex": "#bbbcbe" } }
    }
  }
}
```

- [ ] **Step 3: Сгенерировать CSS и проверить**

```bash
npx terrazzo build
ls -la src/styles/
```

- [ ] **Step 4: Commit**

```bash
git add tokens/themes/
git commit -m "feat: add light and dark theme tokens"
```

---

### Task 4: Создать semantic.tokens.json

**Files:**
- Create: `tokens/semantic.tokens.json` — семантические токены

- [ ] **Step 1: Создать файл со ссылками на примитивы**

```json
{
  "color": {
    "interactive": {
      "primary": { "$type": "color", "$value": "{color.primitive.tiger-flame}" },
      "secondary": { "$type": "color", "$value": "{color.primitive.dusty-denim}" }
    }
  },
  "spacing": {
    "component": {
      "padding": { "$type": "dimension", "$value": "{spacing.lg}" },
      "gap": { "$type": "dimension", "$value": "{spacing.md}" }
    }
  },
  "borderRadius": {
    "button": { "$type": "dimension", "$value": "{borderRadius.lg}" },
    "card": { "$type": "dimension", "$value": "{borderRadius.xl}" }
  }
}
```

- [ ] **Step 2: Сгенерировать и проверить**

```bash
npx terrazzo build
cat src/styles/tokens.css | head -20
```

- [ ] **Step 3: Commit**

```bash
git add tokens/semantic.tokens.json
git commit -m "feat: add semantic design tokens"
```

---

### Task 5: Обновить Layout.astro

**Files:**
- Modify: `src/layouts/Layout.astro` — подключить токены, убрать Tailwind

- [ ] **Step 1: Обновить frontmatter и импорт**

```astro
---
import '../styles/tokens.css';

export interface Props {
  title: string;
}
---
```

- [ ] **Step 2: Удалить Tailwind директивы**

Удалить строки с `@tailwind` из globals.css (если остались)

- [ ] **Step 3: Сгенерировать CSS и проверить билд**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "refactor: use design tokens instead of tailwind"
```

---

### Task 6: Удалить Tailwind CSS

**Files:**
- Modify: `package.json` — удалить tailwind зависимости
- Delete: `tailwind.config.js`, `postcss.config.cjs`
- Delete: `src/styles/globals.css`

- [ ] **Step 1: Удалить зависимости**

```bash
npm uninstall tailwindcss @tailwindcss/postcss
```

- [ ] **Step 2: Удалить конфиги**

```bash
rm tailwind.config.js postcss.config.cjs src/styles/globals.css
```

- [ ] **Step 3: Убедиться что билд работает**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add package.json
git add tailwind.config.js postcss.config.cjs
git rm src/styles/globals.css
git commit -m "chore: remove tailwind dependencies and configs"
```

---

### Task 7: Добавить поддержку переключения темы

**Files:**
- Modify: `src/layouts/Layout.astro` — добавить theme switcher

- [ ] **Step 1: Добавить JavaScript для сохранения темы**

```astro
<script>
  const theme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
</script>
```

- [ ] **Step 2: Добавить CSS для theme switcher**

```css
/* В head или отдельный файл */
[data-theme='dark'] {
  /* Already handled by Terrazzo selectors */
}
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add theme persistence"
```

---

### Task 8: Обновить .gitignore

**Files:**
- Modify: `.gitignore` — добавить сгенерированные файлы

- [ ] **Step 1: Добавить строки**

```
# Design tokens
src/styles/tokens.css
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore generated tokens.css"
```