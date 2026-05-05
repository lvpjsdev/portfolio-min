# Castle Background Animation Design

## Overview
Interactive panoramic castle background in pixel art style for Astro project (tasty-transit) with day/night themes, smooth canvas-based animations, and performance-aware rendering.

## Architecture

### Components
- **CastleBackground.astro**: Main component rendering fullscreen `<canvas>` (fixed positioning)
- **castle-engine.js**: Client-side script managing viewport state, animation loops, and theme logic
- **Points of Interest (POI)**: Data array mapping pages to castle locations

### Technology Choice: Canvas + JS Viewport
Selected over CSS Transform and Parallax Layers for dynamic rendering capabilities while maintaining performance control.

## Castle Asset Generation

### Approach: AI-Generated Pixel Art Panoramas
Using DALL-E or Stable Diffusion via API to generate pixel art castle panoramas in retro gaming style.

### Prompts Strategy
- **Day Version**: "Pixel art panoramic view of a majestic medieval castle on a hill, bright daylight, 16-bit retro game style, detailed pixel architecture, green pixel surroundings, vibrant colors, 8-bit aesthetic, game background art"
- **Night Version**: "Pixel art panoramic view of the same medieval castle at night, moonlight, torch-lit windows, pixel stars in sky, mysterious atmosphere, 16-bit retro game style, 8-bit aesthetic, game background art"
- **Consistency**: Use same seed or image-to-image approach to maintain structure between day/night versions.
- **POI Details**: Generate separate pixel art close-ups for each Point of Interest (zoomed-in views of specific castle areas like tower, gate, courtyard, etc.)

### Output Requirements
- Resolution: 1920x1080 or 2560x1440 (pixel art scales better at moderate resolutions)
- Format: PNG with indexed colors for authentic pixel art feel
- Style: Hard edges, limited color palette (32-64 colors), no anti-aliasing
- Layers: Generate separate pixel stars overlay for night mode

### Integration
- Store in `tasty-transit/src/assets/castle/`:
  - `castle-day.png`
  - `castle-night.png`
  - `stars-overlay.png` (optional, can be procedurally generated in Canvas)
- Load into Canvas via `new Image()` and `image.onload`

## Points of Interest (POI)

### Data Structure
```javascript
{
  id: string,        // 'index', 'about', 'contact', 'experience', 'projects', 'skills'
  x: number,         // Normalized 0..1 (position on canvas)
  y: number,         // Normalized 0..1
  zoom: number,      // Zoom level for detail view
  bonus: boolean     // Hidden/secret points (more than 6 total)
}
```

### POI List
- 6 primary points mapped to pages: index, about, contact, experience, projects, skills
- Additional bonus/secret points triggered by clicking specific canvas areas (hit zones)

## Theme System (Day/Night)

### Automatic Detection
- Time-based: `new Date().getHours()` — 6-18 = day, otherwise night
- Initial load checks system time

### Manual Override
- Toggle button in site header
- Stores preference in `localStorage`
- Canvas redraws with theme-appropriate filters:
  - **Day**: Warm tones, bright colors
  - **Night**: Cool tones, stars overlay, reduced brightness

## Animation System

### Panoramic Transition (Canvas Viewport)
On page change (Astro navigation or URL change):
1. Determine target POI coordinates
2. Start `requestAnimationFrame` loop
3. Interpolate `currentX`, `currentY`, `currentZoom` to target (ease-in-out)
4. Render: `drawImage(castleImg, viewportX, viewportY, viewportW, viewportH, 0, 0, canvasW, canvasH)`
5. Apply theme filter post-render

### Animation Button
- Location: Site header/controls
- Modes:
  - **Play**: Start demo mode (flythrough all points sequentially)
  - **Stop**: Cancel current animation
  - **Disabled**: Low performance mode (button hidden or disabled)
- Visual state indicates active/inactive

## Performance Guard

### Device Capability Check (runs once on load)
1. **Device Memory API**: If `navigator.deviceMemory < 4` GB → `lowPerf = true`
2. **Hardware Concurrency**: If `navigator.hardwareConcurrency < 4` cores → `lowPerf = true`
3. **FPS Benchmark**: Render 60 test frames, calculate average FPS
   - If avg FPS < 30 → `lowPerf = true`

### Behavior on Low Performance
- `lowPerf = true` disables all animations
- Page changes instantly snap viewport to target POI (no interpolation)
- Animation button is hidden or disabled
- Canvas still renders theme-appropriate castle image

## Bonus Points & Secrets

### Hidden POI Activation
- Defined hit areas on canvas (specific pixel regions)
- Hover: `cursor: pointer` when over interactive zone
- Click: Navigate to hidden page or open modal with content
- Discovery feedback: Subtle animation or sound effect

## Integration with Astro

### Page Transitions
- Uses Astro's View Transitions API or listens to `astro:page-load` event
- On transition: trigger panoramic animation to new page's POI
- Canvas persists across page navigations (not recreated)

### File Structure
```
tasty-transit/src/
├── components/
│   └── CastleBackground.astro
├── scripts/
│   └── castle-engine.js
├── assets/
│   ├── castle-day.png (pixel art)
│   ├── castle-night.png (pixel art)
│   ├── poi-details/ (pixel art close-ups for each POI)
│   └── stars-overlay.png (pixel stars)
└── pages/
    └── [existing pages...]
```

## Error Handling
- Canvas not supported: Fallback to static background image
- Images fail to load: Show solid color background with theme-appropriate shade
- Animation loop error: Catch and fallback to instant positioning
- Device APIs unavailable: Assume high performance, run FPS check only

## Testing Criteria
1. Page navigation triggers smooth pan to correct POI on capable devices
2. Low perf devices skip animation, snap to position
3. Theme toggle switches between day/night visuals
4. Secret POI clickable and discoverable
5. Animation button starts/stops demo mode
6. FPS check accurately detects low-performance devices
7. Canvas responsive to viewport resize
