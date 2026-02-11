# Visual Design Blueprint & Artistic UI Patterns

## 1. Visual Design Blueprint

### Core Philosophy

- **Artistic Composition**: Move away from rigid, uniform grids. Embrace asymmetry, varied span widths, and curated spacing.
- **Card-Based Storytelling**: Every distinct piece of content lives in a container that feels tactile and elevated.
- **Visual Depth**: Use a layered approach. Background -> Surface -> Elevated Element -> Floating Accent.
- **Subtle Glassmorphism**: Use glass effects as an accent (e.g., sticky headers, overlay captions), not the entire background.

### Typography

- **Font**: DM Sans (already in use).
- **Scale**:
  - `Hero Heading`: 4rem - 5rem, tight tracking (-0.02em), font-weight 700.
  - `Section Heading`: 2.5rem - 3.5rem, tight tracking (-0.01em), font-weight 600.
  - `Card Heading`: 1.25rem - 1.5rem, normal tracking, font-weight 600.
  - `Body`: 1rem - 1.125rem, relaxed line-height (1.6), font-weight 400.
  - `Caption/Label`: 0.875rem, uppercase, wide tracking (0.05em), font-weight 500, muted color.

### Color & Texture

- **Backgrounds**: Soft, barely-there gradients (e.g., slate-50 to white). Avoid flat single-color backgrounds for large sections.
- **Surfaces**: Pure white with subtle borders (border-gray-100) OR soft grey (slate-50).
- **Primary Accent**: Use the existing primary green heavily for CTAs and key icons, but sparingly for backgrounds to maintain a "clean" look.
- **Shadows**:
  - `shadow-sm`: For non-interactive cards.
  - `shadow-md`: For interactive cards.
  - `shadow-xl` + `color-shadow`: For floating elements and primary CTAs.

### Motion Principles

- **Hover**: Lift up (translate-y-1) + Scale up slightly (scale-102) + Shadow deepen.
- **Entrance**: Staggered fade-up for lists. Smooth opacity transition for images.
- **Interaction**: Buttons should have a "press" effect (scale-95) on click.

---

## 2. Reusable Artistic UI Patterns

### Pattern A: The "Feature Gallery" (Asymmetric Grid)

Instead of a 3-column grid, use a CSS Grid with varying column spans.

- Item 1: Span 2 cols, Row 2.
- Item 2: Span 1 col, Row 1 (Tall).
- Item 3: Span 1 col, Row 1.
  _Goal: Guide the eye in a zest (Z) pattern._

### Pattern B: The "Spotlight Card"

A large, full-width or half-width card that devotes 50% of its area to a high-quality image and 50% to typography.

- **Usage**: Hero sections, Major Product Categories.
- **Style**: Rounded-3xl, overflow-hidden, relative positioning for text overlays.

### Pattern C: The "Floating Glass Info"

Use a glassmorphism container ON TOP of a rich image to display details.

- **Context**: Product details on hover, location maps.
- **Style**: `backdrop-blur-md bg-white/70 border border-white/20`.

### Pattern D: "Rhythmic List"

For lists of features or services, use alternating layouts (Image Left/Text Right -> Text Left/Image Right) with generous whitespace (py-24).

---

## 3. Implementation Guidance

### Component: `ArtisticCard`

- **Props**: `variant` ('feature', 'standard', 'compact'), `image`, `title`, `subtitle`, `cta`.
- **Structure**:
  ```tsx
  <motion.div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
    <div className="aspect-[4/3] overflow-hidden">
      <img className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
    </div>
    <div className="p-6">...content</div>
  </motion.div>
  ```

### Component: `SectionWrapper`

- **Props**: `background` ('white', 'subtle', 'dark'), `pattern` ('grid', 'dots', 'none').
- **Purpose**: Enforce consistent vertical rhythm (`py-20` to `py-32`).

### Animation Hook: `useScrollReveal`

- Simple wrapper around framer-motion's `whileInView` to standardize entrance animations.
