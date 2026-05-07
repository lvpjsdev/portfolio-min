# Redesign Interface Using DESIGN.md Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign portfolio-min interface using DESIGN.md design system with Berkeley Mono typography, 4px radius, 96px section spacing, while preserving current color palette, Sidebar navigation, SVG icons, expandable cards, and texture overlays.

**Architecture:** Gradual migration across 4 phases. Phase 1 updates core layout/navigation tokens and components. Phase 2 migrates card components. Phase 3 migrates page content. Phase 4 updates theme token files. New `design-md.tokens.json` file merges DESIGN.md structure with current colors. Components keep current behavior (expandable cards, Sidebar, SVG icons) but adopt new typography, spacing, and border styles.

**Tech Stack:** Astro 6.2.2, Terrazzo CLI (design tokens), Berkeley Mono (paid font with fallback stack), CSS Custom Properties, pnpm

---

## File Structure

### New Files
- `tokens/design-md.tokens.json` — DESIGN.md structure with current color values, Berkeley Mono typography, 96px section spacing, 4px/0px radius tokens

### Files to Modify
- `terrazzo.config.mjs` — Add `design-md.tokens.json` to token processing
- `src/styles/globals.css` — Add Berkeley Mono @font-face, update base typography to use Berkeley Mono
- `src/styles/tokens.css` — Auto-generated (run `pnpm terrazzo` after token changes)

### Phase 1: Core Layout & Navigation
- `src/layouts/Layout.astro` — 96px section spacing, ~960px max-width
- `src/components/Sidebar.astro` — Berkeley Mono, 4px radius, hairline borders, keep texture
- `src/components/ThemeToggle.astro` — 4px radius, remove shadows
- `src/components/NavDot.astro` — 4px radius on tappable area

### Phase 2: Card Components
- `src/components/ProjectCard.astro` — Hairline borders, 4px radius, ASCII markers, remove shadows, keep texture
- `src/components/ExperienceCard.astro` — Same as ProjectCard
- `src/components/TechTags.astro` — 4px radius tags
- `src/components/SkillTag.astro` — 4px radius

### Phase 3: Page Content Migration
- `src/pages/index.astro` — Berkeley Mono display-xl, body-md, 96px spacing
- `src/pages/about.astro` — Berkeley Mono, 96px spacing
- `src/pages/experience.astro` — New card styles, Berkeley Mono
- `src/pages/projects.astro` — New card styles, Berkeley Mono
- `src/pages/skills.astro` — Berkeley Mono, 4px radius tags
- `src/pages/contact.astro` — Berkeley Mono, 4px radius
- `src/pages/[lang]/*.astro` — All localized pages (6 pages)

### Phase 4: Theme Token Updates
- `tokens/dark/tokens.json` — Update to DESIGN.md spacing/radius
- `tokens/light/tokens.json` — Update to DESIGN.md spacing/radius

---

## Task 1: Create design-md.tokens.json

**Files:**
- Create: `tokens/design-md.tokens.json`

- [ ] **Step 1: Create the design-md.tokens.json file**

```json
{
  "color": {
    "primitive": {
      "midnight-violet": { "value": "#171123" },
      "dark-amethyst": { "value": "#372248" },
      "tiger-flame": { "value": "#f46036" },
      "dusty-denim": { "value": "#5b85aa" },
      "twilight-indigo": { "value": "#414770" },
      "silver-mist": { "value": "#bbbcc4" },
      "white": { "value": "#ffffff" },
      "black": { "value": "#000000" }
    }
  },
  "spacing": {
    "xxs": { "value": "1px" },
    "xs": { "value": "4px" },
    "sm": { "value": "8px" },
    "md": { "value": "12px" },
    "lg": { "value": "16px" },
    "xl": { "value": "24px" },
    "xxl": { "value": "32px" },
    "section": { "value": "96px" }
  },
  "rounded": {
    "none": { "value": "0px" },
    "sm": { "value": "4px" },
    "full": { "value": "9999px" }
  },
  "typography": {
    "display-xl": {
      "fontFamily": "Berkeley Mono, IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New",
      "fontSize": "38px",
      "fontWeight": "700",
      "lineHeight": "1.5",
      "letterSpacing": "0"
    },
    "heading-md": {
      "fontFamily": "Berkeley Mono, IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New",
      "fontSize": "16px",
      "fontWeight": "700",
      "lineHeight": "1.5",
      "letterSpacing": "0"
    },
    "body-md": {
      "fontFamily": "Berkeley Mono, IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "1.5",
      "letterSpacing": "0"
    },
    "body-strong": {
      "fontFamily": "Berkeley Mono, IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New",
      "fontSize": "16px",
      "fontWeight": "500",
      "lineHeight": "1.5",
      "letterSpacing": "0"
    },
    "body-tight": {
      "fontFamily": "Berkeley Mono, IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New",
      "fontSize": "16px",
      "fontWeight": "500",
      "lineHeight": "1",
      "letterSpacing": "0"
    },
    "link-md": {
      "fontFamily": "Berkeley Mono, IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New",
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "1.5",
      "letterSpacing": "0"
    },
    "button-md": {
      "fontFamily": "Berkeley Mono, IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New",
      "fontSize": "16px",
      "fontWeight": "500",
      "lineHeight": "2",
      "letterSpacing": "0"
    },
    "caption-md": {
      "fontFamily": "Berkeley Mono, IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New",
      "fontSize": "14px",
      "fontWeight": "400",
      "lineHeight": "2",
      "letterSpacing": "0"
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add tokens/design-md.tokens.json
git commit -m "feat: add design-md.tokens.json with Berkeley Mono typography and DESIGN.md spacing"
```

---

## Task 2: Update Terrazzo Config to Process New Tokens

**Files:**
- Modify: `terrazzo.config.mjs`

- [ ] **Step 1: Read current terrazzo.config.mjs**

```bash
cat /Users/leonidpetrov/Projects/portfolio-min/terrazzo.config.mjs
```

- [ ] **Step 2: Add design-md.tokens.json to token processing**

Current config likely has:
```js
export default {
  tokens: ['tokens/**/*.tokens.json'],
  // ...
}
```

This glob should already pick up `tokens/design-md.tokens.json`. Verify by running:

```bash
pnpm terrazzo
```

Expected: No errors, `src/styles/tokens.css` regenerated with new tokens.

- [ ] **Step 3: Commit (if config changes needed)**

```bash
git add terrazzo.config.mjs src/styles/tokens.css
git commit -m "feat: update terrazzo config to process design-md tokens"
```

If no config changes needed, skip commit and just note tokens.css was regenerated.

---

## Task 3: Update globals.css with Berkeley Mono Font

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Add Berkeley Mono @font-face and base typography**

Add to the top of `src/styles/globals.css`:

```css
/* Berkeley Mono Font - Paid font with fallback stack */
@font-face {
  font-family: 'Berkeley Mono';
  src: url('/fonts/berkeley-mono.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Berkeley Mono';
  src: url('/fonts/berkeley-mono-medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Berkeley Mono';
  src: url('/fonts/berkeley-mono-bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Base typography uses Berkeley Mono */
:root {
  --font-family-mono: "Berkeley Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New";
}
```

Note: If Berkeley Mono font files are not available, the fallbacks (IBM Plex Mono, etc.) will be used. The font files would need to be purchased and placed in `public/fonts/`.

- [ ] **Step 2: Run linter to verify CSS is valid**

```bash
pnpm lint
```

Expected: No errors in globals.css

- [ ] **Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat: add Berkeley Mono font-face and base typography to globals.css"
```

---

## Task 4: Update Layout.astro - Section Spacing & Max-Width

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Read current Layout.astro**

```bash
cat /Users/leonidpetrov/Projects/portfolio-min/src/layouts/Layout.astro
```

- [ ] **Step 2: Update main content container with 96px section spacing and 960px max-width**

Find the main content area and update inline style or add a class:

```astro
<!-- Change from current structure to: -->
<main class="main-content">
  <slot />
</main>

<style>
  .main-content {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg, 16px);
  }
  
  /* 96px section spacing between direct children */
  .main-content > section,
  .main-content > div > section {
    margin-bottom: var(--spacing-section, 96px);
  }
  
  .main-content > section:last-child,
  .main-content > div > section:last-child {
    margin-bottom: 0;
  }
</style>
```

- [ ] **Step 3: Run build to verify no errors**

```bash
pnpm build
```

Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: update Layout.astro with 96px section spacing and 960px max-width"
```

---

## Task 5: Update Sidebar.astro - Berkeley Mono & 4px Radius

**Files:**
- Modify: `src/components/Sidebar.astro`

- [ ] **Step 1: Read current Sidebar.astro**

```bash
cat /Users/leonidpetrov/Projects/portfolio-min/src/components/Sidebar.astro
```

- [ ] **Step 2: Add Berkeley Mono font-family to all text elements and 4px radius to interactive elements**

Update the `<style>` section in Sidebar.astro:

```astro
<style>
  /* Add to existing style block */
  .sidebar {
    font-family: var(--font-family-mono, "Berkeley Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New");
  }
  
  .nav-link {
    border-radius: 4px; /* {rounded.sm} */
    font-family: var(--font-family-mono);
    font-weight: 500; /* {typography.body-strong} */
  }
  
  .sidebar-header {
    font-family: var(--font-family-mono);
  }
  
  /* Hairline bottom rule */
  .sidebar-nav {
    border-bottom: 1px solid rgba(65, 71, 112, 0.3); /* twilight-indigo with alpha */
  }
</style>
```

- [ ] **Step 3: Run component property test**

```bash
pnpm vitest run src/components/__tests__/Sidebar.property.test.ts
```

Expected: PASS (or update test if font-family assertion added)

- [ ] **Step 4: Commit**

```bash
git add src/components/Sidebar.astro
git commit -m "feat: update Sidebar.astro with Berkeley Mono, 4px radius, hairline borders"
```

---

## Task 6: Update ThemeToggle.astro - 4px Radius & Remove Shadows

**Files:**
- Modify: `src/components/ThemeToggle.astro`

- [ ] **Step 1: Read current ThemeToggle.astro**

```bash
cat /Users/leonidpetrov/Projects/portfolio-min/src/components/ThemeToggle.astro
```

- [ ] **Step 2: Update button to 4px radius and remove box-shadow**

```astro
<style>
  .theme-toggle {
    border-radius: 4px; /* {rounded.sm} */
    box-shadow: none; /* Remove shadow per DESIGN.md flat design */
    font-family: var(--font-family-mono);
  }
  
  .theme-toggle:hover {
    box-shadow: none;
  }
</style>
```

- [ ] **Step 3: Run component property test**

```bash
pnpm vitest run src/components/__tests__/ThemeToggle.property.test.ts
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/ThemeToggle.astro
git commit -m "feat: update ThemeToggle.astro with 4px radius, remove shadows"
```

---

## Task 7: Update NavDot.astro - 4px Radius on Tappable Area

**Files:**
- Modify: `src/components/NavDot.astro`

- [ ] **Step 1: Read current NavDot.astro**

```bash
cat /Users/leonidpetrov/Projects/portfolio-min/src/components/NavDot.astro
```

- [ ] **Step 2: Add 4px border-radius to the tappable area**

```astro
<style>
  .nav-dot-container {
    border-radius: 4px; /* {rounded.sm} for tappable area */
    padding: 8px; /* Ensure 44px minimum tappable size */
  }
  
  .nav-dot {
    border-radius: 50%; /* Keep dot circular */
  }
</style>
```

- [ ] **Step 3: Run component property test**

```bash
pnpm vitest run src/components/__tests__/NavDot.property.test.ts
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/NavDot.astro
git commit -m "feat: update NavDot.astro with 4px radius tappable area"
```

---

## Task 8: Update ProjectCard.astro - Hairline Borders, 4px Radius, ASCII Markers

**Files:**
- Modify: `src/components/ProjectCard.astro`

- [ ] **Step 1: Read current ProjectCard.astro**

```bash
cat /Users/leonidpetrov/Projects/portfolio-min/src/components/ProjectCard.astro
```

- [ ] **Step 2: Update card with hairline border, 4px radius on interactive elements, ASCII markers, remove shadows**

```astro
---
// Keep existing props and logic
---

<article class="project-card" data-expanded={isExpanded}>
  <button class="card-header" onclick="toggleExpand">
    <span class="ascii-marker">[+]</span>
    <span class="card-title">{title}</span>
    <!-- Keep existing expand chevron SVG -->
  </button>
  
  <div class="card-content" style={isExpanded ? 'display:block' : 'display:none'}>
    <p class="card-description">{description}</p>
    <!-- Keep TechTags -->
  </div>
</article>

<style>
  .project-card {
    border: 1px solid rgba(65, 71, 112, 0.3); /* Hairline border */
    border-radius: 0px; /* {rounded.none} for container */
    box-shadow: none; /* Remove shadow */
    font-family: var(--font-family-mono);
    margin-bottom: var(--spacing-lg, 16px);
  }
  
  .card-header {
    border-radius: 4px; /* {rounded.sm} for interactive element */
    font-weight: 500; /* {typography.body-strong} */
    padding: 8px 0;
  }
  
  .ascii-marker {
    font-family: var(--font-family-mono);
    margin-right: 8px;
    color: var(--color-interactive-primary); /* tiger-flame */
  }
  
  .card-title {
    font-weight: 500; /* {typography.body-strong} */
  }
  
  .card-description {
    font-weight: 400; /* {typography.body-md} */
    color: var(--color-text-secondary);
    line-height: 1.5;
  }
  
  /* Keep SVG noise filter texture */
  .project-card::before {
    /* Existing texture overlay */
  }
</style>
```

Note: Update the ASCII marker in JavaScript when card expands/collapses:
```js
function toggleExpand() {
  isExpanded = !isExpanded;
  const marker = document.querySelector('.ascii-marker');
  marker.textContent = isExpanded ? '[-]' : '[+]';
}
```

- [ ] **Step 3: Run component property test**

```bash
pnpm vitest run src/components/__tests__/ProjectCard.property.test.ts
```

Expected: PASS (update test if new elements added)

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.astro
git commit -m "feat: update ProjectCard.astro with hairline borders, 4px radius, ASCII markers"
```

---

## Task 9: Update ExperienceCard.astro - Same as ProjectCard

**Files:**
- Modify: `src/components/ExperienceCard.astro`

- [ ] **Step 1: Read current ExperienceCard.astro**

```bash
cat /Users/leonidpetrov/Projects/portfolio-min/src/components/ExperienceCard.astro
```

- [ ] **Step 2: Apply same changes as ProjectCard (hairline border, 4px radius, ASCII markers, remove shadows)**

Follow same pattern as Task 8.

- [ ] **Step 3: Run component property test**

```bash
pnpm vitest run src/components/__tests__/ExperienceCard.property.test.ts
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/ExperienceCard.astro
git commit -m "feat: update ExperienceCard.astro with hairline borders, 4px radius, ASCII markers"
```

---

## Task 10: Update TechTags.astro & SkillTag.astro - 4px Radius

**Files:**
- Modify: `src/components/TechTags.astro`
- Modify: `src/components/SkillTag.astro`

- [ ] **Step 1: Update TechTags.astro with 4px radius on tags**

```astro
<style>
  .tech-tags {
    font-family: var(--font-family-mono);
  }
  
  .tag {
    border-radius: 4px; /* {rounded.sm} */
  }
</style>
```

- [ ] **Step 2: Update SkillTag.astro with 4px radius**

```astro
<style>
  .skill-tag {
    border-radius: 4px; /* {rounded.sm} */
    font-family: var(--font-family-mono);
    font-size: 14px; /* {typography.caption-md} */
    line-height: 2;
  }
</style>
```

- [ ] **Step 3: Run SkillTag test**

```bash
pnpm vitest run src/components/__tests__/SkillTag.test.ts
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/TechTags.astro src/components/SkillTag.astro
git commit -m "feat: update TechTags and SkillTag with 4px radius, Berkeley Mono"
```

---

## Task 11: Update Pages - Berkeley Mono & 96px Spacing

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/experience.astro`
- Modify: `src/pages/projects.astro`
- Modify: `src/pages/skills.astro`
- Modify: `src/pages/contact.astro`
- Modify: `src/pages/[lang]/index.astro`
- Modify: `src/pages/[lang]/about.astro`
- Modify: `src/pages/[lang]/experience.astro`
- Modify: `src/pages/[lang]/projects.astro`
- Modify: `src/pages/[lang]/skills.astro`
- Modify: `src/pages/[lang]/contact.astro`

- [ ] **Step 1: Update index.astro with Berkeley Mono typography classes**

Add to the page's `<style>` or use inline styles:

```astro
<style>
  .hero-headline {
    font-family: var(--font-family-mono);
    font-size: 38px; /* {typography.display-xl} */
    font-weight: 700;
    line-height: 1.5;
  }
  
  .hero-text {
    font-family: var(--font-family-mono);
    font-size: 16px; /* {typography.body-md} */
    font-weight: 400;
    line-height: 1.5;
    color: var(--color-text-secondary);
  }
  
  /* 96px section spacing */
  .section {
    margin-bottom: var(--spacing-section, 96px);
  }
</style>
```

- [ ] **Step 2: Update all other pages with Berkeley Mono and 96px spacing**

Apply similar pattern to all pages listed above.

- [ ] **Step 3: Run build to verify all pages compile**

```bash
pnpm build
```

Expected: Build succeeds with no errors

- [ ] **Step 4: Commit all page changes**

```bash
git add src/pages/
git commit -m "feat: update all pages with Berkeley Mono typography and 96px section spacing"
```

---

## Task 12: Update Theme Token Files - Spacing & Radius

**Files:**
- Modify: `tokens/dark/tokens.json`
- Modify: `tokens/light/tokens.json`

- [ ] **Step 1: Read current dark tokens**

```bash
cat /Users/leonidpetrov/Projects/portfolio-min/tokens/dark/tokens.json
```

- [ ] **Step 2: Add DESIGN.md spacing and radius tokens to dark theme**

```json
{
  "spacing": {
    "section": { "$value": "{spacing.section}" },
    "lg": { "$value": "{spacing.lg}" }
  },
  "rounded": {
    "sm": { "$value": "{rounded.sm}" },
    "none": { "$value": "{rounded.none}" }
  }
}
```

- [ ] **Step 3: Apply same changes to light theme**

```bash
cat /Users/leonidpetrov/Projects/portfolio-min/tokens/light/tokens.json
```

- [ ] **Step 4: Regenerate tokens.css and commit**

```bash
pnpm terrazzo
git add src/styles/tokens.css tokens/dark/tokens.json tokens/light/tokens.json
git commit -m "feat: update dark/light theme tokens with DESIGN.md spacing and radius"
```

---

## Task 13: Final Verification

- [ ] **Step 1: Run linter**

```bash
pnpm lint
```

Expected: No errors

- [ ] **Step 2: Run all tests**

```bash
pnpm vitest run
```

Expected: All tests pass

- [ ] **Step 3: Run build**

```bash
pnpm build
```

Expected: Build succeeds

- [ ] **Step 4: Manual visual check**

Start dev server:
```bash
pnpm dev
```

Check:
- Berkeley Mono font loading (or fallbacks)
- 4px radius on buttons and interactive elements
- 96px spacing between sections
- Hairline borders on cards
- ASCII markers [+]/[-] on expandable cards
- Textures preserved
- SVG icons unchanged
- Both light and dark themes working

- [ ] **Step 5: Commit any final fixes**

```bash
git add -A
git commit -m "fix: final adjustments after visual verification"
```
