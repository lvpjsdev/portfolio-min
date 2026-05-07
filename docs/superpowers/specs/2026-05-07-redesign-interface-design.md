# Redesign Interface Using DESIGN.md

**Date:** 2026-05-07
**Approach:** Gradual Migration (Approach 3)
**Goal:** Redesign portfolio-min interface using DESIGN.md design system specifications while preserving current color palette, Sidebar navigation, SVG icons, expandable cards, and texture overlays.

## User Decisions

1. **Typography:** Use Berkeley Mono for all text (as per DESIGN.md)
2. **Scope:** All pages and components
3. **Cards:** Expandable cards styled in DESIGN.md fashion (keep current behavior)
4. **Navigation:** Keep current Sidebar (not top nav from DESIGN.md)
5. **Theme:** Keep both light and dark themes, restyle both to DESIGN.md
6. **Textures:** Keep SVG noise textures (not fully flat like DESIGN.md)
7. **Icons:** Keep current SVG icons (not ASCII-only like DESIGN.md)

## Section 1: Token System Architecture

Create a new token structure that merges DESIGN.md's organization with current color palette:

### New Token Files
```
tokens/
├── design-md.tokens.json      # DESIGN.md structure with your colors
├── primitives.tokens.json     # Keep current (midnight-violet, tiger-flame, etc.)
├── semantic.tokens.json       # Keep current semantic mappings
├── dark/
│   └── tokens.json           # Migrate to DESIGN.md spacing/radius
└── light/
    └── tokens.json           # Migrate to DESIGN.md spacing/radius
```

### design-md.tokens.json Structure
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

### Migration Strategy
- Keep current primitives.tokens.json (colors stay the same)
- Add DESIGN.md spacing/radius tokens to new design-md.tokens.json
- Typography tokens include Berkeley Mono with current fonts as fallbacks
- Both token systems coexist during transition

## Section 2: Component Migration Strategy

Phased rollout with verification at each stage:

### Phase 1: Core Layout & Navigation (Week 1)
- **Layout.astro**: Apply DESIGN.md spacing (`{spacing.section}` 96px between sections), update container max-width to ~960px
- **Sidebar.astro**: Restyle with Berkeley Mono for all text, 4px radius on interactive elements, hairline borders
- **ThemeToggle.astro**: Update to 4px radius, Berkeley Mono label, remove shadows
- **NavDot.astro**: Keep SVG dots, style with twilight-indigo color, 4px radius

### Phase 2: Card Components (Week 2)
- **ProjectCard.astro** + **ExperienceCard.astro**:
  - Convert to expandable rows with hairline borders (1px solid `var(--color-primitive-twilight-indigo)`)
  - Add Berkeley Mono for all text roles
  - Use 4px radius on interactive elements (expand button)
  - Keep SVG SkillIcons, add ASCII marker [+] before title when collapsed, [-] when expanded
  - Remove shadows, keep texture overlay (SVG noise filter)
- **TechTags.astro** + **SkillTag.astro**: 4px radius tags, Berkeley Mono, tiger-flame for interactive tags

### Phase 3: Page Content Migration (Week 3)
- **index.astro (Home)**: Berkeley Mono display-xl (38px/700) for hero headline, body-md for text, 96px section spacing
- **about.astro**, **experience.astro**, **projects.astro**: Apply new card styles, Berkeley Mono hierarchy
- **skills.astro**, **contact.astro**: Migrate to new token system

### Phase 4: Theme Token Updates (Week 4)
- Update dark/light token files to use DESIGN.md spacing/radius
- Ensure both themes use Berkeley Mono fallbacks
- Test texture overlays in both themes

**Rollout Rule:** Each phase completes with tests passing and visual verification before starting next phase. Old components stay in place until their replacement is verified.

## Section 3: Typography & Color Mapping

### Font Loading
Berkeley Mono is a paid font, so CSS should load it via `@font-face` if licensed, with full fallback stack:
```css
font-family: "Berkeley Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New";
```

### Text Role Mapping (using current colors)
| DESIGN.md Token | Your Color Mapping | Use |
|---|---|---|
| `display-xl` (38px/700) | `--color-text-primary` | Home hero "Hej. My name is Leonid..." |
| `heading-md` (16px/700) | `--color-text-primary` | Section labels ("Experience", "Projects") |
| `body-md` (16px/400) | `--color-text-secondary` | Body text, descriptions, card content |
| `body-strong` (16px/500) | `--color-text-primary` | Nav links, card titles, emphasis |
| `button-md` (16px/500/line-height:2) | `--color-text-primary` on tiger-flame | All buttons |
| `caption-md` (14px/400) | `--color-primitive-silver-mist` | Footer, metadata, timestamps |

### Color Application
**Your palette mapped to DESIGN.md semantic structure:**
- **Ink/Primary** → `midnight-violet` (#171123) dark theme / `black` light theme
- **Canvas** → `dark-amethyst` (#372248) dark / `white` light
- **Surface Soft** → `twilight-indigo` (#414770) dark / light gray light
- **Body Text** → `silver-mist` (#bbbcc4) dark / `dusty-denim` light
- **Accent** → `tiger-flame` (#f46036) — primary interactive color
- **Secondary** → `dusty-denim` (#5b85aa) — secondary accent

**Key Difference from DESIGN.md:** Warm colors (tiger-flame, dusty-denim) kept as accents, while DESIGN.md uses monochrome with Apple Blue only in TUI mockup.

## Section 4: Component Specifications

### Sidebar.astro (Phase 1 - Core Layout)
- **Structure:** Keep current 64px collapsed / 240px expanded behavior
- **Typography:** All nav labels, theme toggle use Berkeley Mono `{typography.body-strong}` (16px/500)
- **Colors:** Background stays `var(--color-background-surface)` (dark-amethyst / light gray), text `var(--color-text-primary)`
- **Interactive Elements:** Nav links and theme toggle get `{rounded.sm}` (4px) radius
- **Borders:** 1px hairline bottom rule using `var(--color-primitive-twilight-indigo)`
- **Texture:** Keep SVG noise filter overlay (per user preference)
- **NavDot.astro:** SVG dots colored `var(--color-interactive-primary)` (tiger-flame), 4px radius on tappable area

### ProjectCard.astro + ExperienceCard.astro (Phase 2 - Cards)
- **Expandable Behavior:** Keep current accordion functionality (Enter/Space keyboard support, aria-expanded)
- **Borders:** Remove shadows, add 1px hairline border (`var(--color-primitive-twilight-indigo)`)
- **ASCII Markers:** [+] before title when collapsed, [-] when expanded, bold title (`{typography.body-strong}`), description (`{typography.body-md}`)
- **Expand Button:** 4px radius, transparent background, tiger-flame color, Berkeley Mono
- **SkillTags:** 4px radius (`{rounded.sm}`), tiger-flame background for interactive tags, Berkeley Mono text
- **Texture:** Keep SVG noise filter inside card
- **SkillIcon.astro:** Keep current SVG icons, inherit color from parent

### ThemeToggle.astro (Phase 1 - Core Layout)
- **Style:** Remove shadows, 4px radius, Berkeley Mono if text labels used
- **Icons:** Keep sun/moon SVG icons, color `var(--color-text-primary)`
- **Size:** 36px height (WCAG AA touch target)
- **Behavior:** Keep localStorage persistence and system preference detection

### Buttons (All Phases)
- All interactive buttons (expand, toggle, links) use `{typography.button-md}` (16px/500/line-height:2) with 4px radius
- Primary interactive color: `var(--color-interactive-primary)` (tiger-flame)
- Secondary: `var(--color-interactive-secondary)` (dusty-denim)

## Section 5: Page Layouts & Spacing

### Spacing Rhythm (DESIGN.md Principle)
- **Section Gap:** Every page section uses `{spacing.section}` (96px) vertical gap
- **Internal Padding:** Content rows inside sections use `{spacing.lg}` (16px) vertical, no horizontal padding
- **Content Max-Width:** ~960px centered column (matching DESIGN.md)
- **Whitespace:** Left-flush text against column edge, no internal indentation

### Page Layouts

**index.astro (Home):**
- Hero section: `display-xl` (38px/700) for "Hej. My name is Leonid..."
- Body text: `body-md` (16px/400) in `--color-text-secondary`
- Section rhythm: 96px between hero → about preview → featured projects → contact CTA
- ASCII markers for any bullet lists

**experience.astro + projects.astro:**
- Section header: `heading-md` (16px/700) "Experience" / "Projects"
- Expandable cards: 96px between cards, 16px internal padding
- Card title: `body-strong` (16px/500) with [+]/[-] ASCII marker
- Card content: `body-md` (16px/400) in `--color-text-secondary`
- Tech tags: `caption-md` (14px/400) with 4px radius

**about.astro:**
- `body-md` for bio text, 96px section spacing
- Any lists use ASCII markers [+] / [-]

**skills.astro:**
- TechTags with 4px radius, Berkeley Mono labels
- SkillIcon SVG icons kept, colored with `--color-interactive-primary`

**contact.astro:**
- ContactLink components with SVG icons (kept per user preference)
- `body-md` text, 4px radius on any interactive elements

### Responsive Behavior
- **Desktop (1024px+):** Sidebar 64px→240px, 960px content
- **Tablet (768px):** Sidebar becomes top navbar (per current behavior)
- **Mobile (640px):** Single column, hero headline scales to ~28px, section padding tightens to 64px
- **Touch Targets:** All interactive elements minimum 36-40px height (WCAG AA)

## Key Principles

1. **Berkeley Mono for all text** — full font stack with fallbacks
2. **4px radius** on all interactive elements, 0px on containers
3. **96px section rhythm** with hairline borders between sections
4. **Keep current colors** — tiger-flame, dusty-denim, twilight-indigo
5. **Keep textures** — SVG noise filter overlays preserved
6. **Keep SVG icons** — SkillIcon, ContactLink, ThemeToggle icons unchanged
7. **Gradual migration** — each phase verified before proceeding to next
8. **Both themes** — light and dark restyled to match new system
