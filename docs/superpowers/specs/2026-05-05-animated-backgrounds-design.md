# Animated Backgrounds Design

**Date:** 2026-05-05
**Project:** cosmic-pixel (Astro + React)
**Status:** Approved

## Overview

Add animated backgrounds to the entire site (body-level) that respond to the light/dark theme. Dark theme shows a twinkling starry sky with occasional falling meteors. Light theme shows a daytime sky with drifting clouds.

## Architecture

- Component: `AnimatedBackground.astro` (or React if required by Astro setup)
- Position: `position: fixed; inset: 0; z-index: -1`
- Two layers always present in DOM:
  - `.night-sky` — dark theme layer (stars + meteors)
  - `.day-sky` — light theme layer (clouds)
- Visibility controlled via `opacity` + `transition`, driven by `[data-theme]` selector
- Design tokens used for colors and durations

The component is placed in the root layout (`src/layouts/BaseLayout.astro`) to cover the entire site.

## Components and Animations

**Dark theme (night-sky):**
- `Star` — 2-4px dots, random positioning, `twinkle` animation (opacity 0.3→1→0.3), random delay/duration
- `Meteor` — 3px × 80px streaks, gradient fill, `fall` animation (diagonal top-right to bottom-left + fade out), rare (every 3-5 seconds)

**Light theme (day-sky):**
- `Cloud` — ovals or grouped circles (via `box-shadow` or nested divs), white/gray color, `drift` animation (slow horizontal movement), varying speeds

**Object counts (light effect):**
- Stars: ~30
- Meteors: 3-4, staggered animation
- Clouds: 3-5

All sizes and colors come from design tokens where possible. Animations live in `src/styles/animations.css`.

## Theme Switching

Theme switching already uses `data-theme` on `<html>` or `<body>`. The component uses CSS selectors:

```css
.night-sky {
  opacity: 0;
  transition: opacity var(--duration-slow);
}
[data-theme="dark"] .night-sky {
  opacity: 1;
}

.day-sky {
  opacity: 0;
  transition: opacity var(--duration-slow);
}
[data-theme="light"] .day-sky,
:root:not([data-theme]) .day-sky {
  opacity: 1;
}
```

Both layers stay in DOM; CSS smoothly transitions `opacity`. Inner animations run continuously but are invisible at `opacity: 0`.

## Design Tokens

New tokens to add in `tokens/`:

- `--color-sky-day`: light blue (new, for light theme background)
- `--color-star`: white/yellowish
- `--color-meteor`: light yellow gradient
- `--color-cloud`: white with transparency

Existing tokens to reuse:
- `--color-background-page` (night sky background)
- `--duration-slow` (transition timing)
- `--duration-normal`, `--duration-fast` (animation timing)

## Technical Approach

**Approach: HTML elements + CSS animations** (as opposed to CSS background gradients or SVG overlay)

- ✅ Full control over each element
- ✅ Easy color changes via design tokens
- ✅ Smooth theme transitions via `opacity` + `transition`
- ❌ Small DOM overhead (negligible for "light effect")

Element positioning uses `fixed`, with random parameters via CSS custom properties or inline styles.
