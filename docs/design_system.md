# EchoOS Design System Manual
> "The World's First Personal Cognitive Operating System."

This document serves as the absolute source of truth for the styling, components, layouts, and interactive conventions of **EchoOS**. It ensures every screen feels minimal, premium, calm, and Timeless.

---

## 1. Design Tokens & Core Variables

All tokens are defined in [variables.css](file:///c:/Users/Parnav/Documents/summers%20ai/echo%20os/frontend/styles/variables.css) and are available as CSS Custom Properties.

### Color System
EchoOS operates exclusively on a monochrome, high-contrast, yet soft grays palette. **No colors (no blue, no purple, no gradients) are permitted** unless explicitly mapped to destructive/danger actions.

| Token | Hex Value | Primary Purpose |
| :--- | :--- | :--- |
| `--color-primary` | `#000000` | Deep text, main buttons, solid fills, active nodes |
| `--color-secondary` | `#6E6E6E` | Sub-titles, captions, inline descriptions, muted labels |
| `--color-neutral` | `#A8A8A8` | Inactive nodes, slider handles, light borders |
| `--color-surface` | `#E3E3E3` | Card backgrounds, hover track fills, scrollbar thumbs |
| `--color-background`| `#F5F5F5` | Primary canvas backdrop |
| `--color-white` | `#FFFFFF` | Text in dark elements, glass content panels |
| `--color-danger` | `#D83C3C` | Severe pathways, error states, delete triggers |

---

### Typography Scale
EchoOS utilizes **Geist** and **Inter** as core sans-serif fonts. Headings feature tight letter spacing, and paragraphs are readable with loose, calm line-spacing.

*   **Sans-Serif Font**: `var(--font-sans)` (`'Geist', 'Inter', sans-serif`)
*   **Mono-spaced Font**: `var(--font-mono)` (`'Geist Mono', monospace`)

```css
--font-size-xs: 0.75rem;     /* 12px - Badges, metadata */
--font-size-sm: 0.875rem;    /* 14px - Sidebar links, lists, form labels */
--font-size-base: 1rem;      /* 16px - Standard paragraphs, buttons, input fields */
--font-size-lg: 1.125rem;    /* 18px - Card subheadings, alerts */
--font-size-xl: 1.25rem;     /* 20px - Card headers, modal titles */
--font-size-2xl: 1.5rem;     /* 24px - Section headers */
--font-size-3xl: 2rem;       /* 32px - Page level titles */
--font-size-4xl: 2.5rem;     /* 40px - Intro banners, large hero statements */
```

---

### Spacing Scale
Layout spacing follows a strict 4px grid system:

*   `--space-1`: `4px`
*   `--space-2`: `8px`
*   `--space-3`: `12px`
*   `--space-4`: `16px` (Standard grid gaps, card interior paddings)
*   `--space-6`: `24px` (Section paddings)
*   `--space-8`: `32px` (Outer page container padding)
*   `--space-12`: `48px` (Hero margin spacing)

---

### Border Radii & Soft Elevation
Elements must follow strict rounded corners for continuity:

*   **Buttons & Inputs**: `16px` (`--radius-button`, `--radius-input`)
*   **Cards**: `20px` (`--radius-card`)
*   **Dialogs / Modals**: `24px` (`--radius-dialog`)
*   **Avatar & Pills**: `50%` / `9999px`

**Shadows** must be extremely soft and modern:
*   `--shadow-sm`: `0 2px 8px rgba(0, 0, 0, 0.02)` (Default floating cards)
*   `--shadow-md`: `0 4px 16px rgba(0, 0, 0, 0.04)` (Hovered cards, dropdown panels)
*   `--shadow-lg`: `0 12px 32px rgba(0, 0, 0, 0.06)` (Command palettes, modallic dialogs)

---

## 2. Animation Rules (Framer Motion)

Animations represent the "breathing" nature of the cognitive operating system. Easing functions are built using a premium custom `easeOutExpo` curve: `[0.16, 1, 0.3, 1]`.

*   **Transitions**:
    *   `--transition-fast`: `0.15s cubic-bezier(0.16, 1, 0.3, 1)` (button hovers, tooltips)
    *   `--transition-normal`: `0.25s cubic-bezier(0.16, 1, 0.3, 1)` (page swaps, toggles, card expands)
    *   `--transition-slow`: `0.4s cubic-bezier(0.16, 1, 0.3, 1)` (modals opening, chart drawing)

*   **Interactive Effects**:
    *   **Magnetic Pull**: Wrapped buttons or icons pull slightly toward the user cursor within a 60px activation range.
    *   **Hover Lift**: Cards raise by `4px` (`y: -4`) on hover and cast a slightly larger soft shadow.
    *   **Ripples**: Button click events trigger a growing, fading inline circle overlay.
    *   **Particles**: Fulscreen backgrounds host slow, upward-drifting canvas-based particles.

---

## 3. Component Architecture & Code Examples

All React components reside in `frontend/components/ui/` and `frontend/components/animations/`.

### 1. Button Usage
```tsx
import Button from '@/components/ui/Button';
import { Plus } from 'lucide-react';

<Button variant="primary" size="md" magnetic ripple iconLeft={<Plus size={16} />}>
  New Memory
</Button>
```

### 2. Specialized Cards
```tsx
import Card, { CardHeader, CardBody } from '@/components/ui/Card';

// Available variants: 'standard' | 'glass' | 'insight' | 'decision' | 'memory' | 'goal'
<Card variant="insight" hoverable>
  <CardHeader>
    <h3>Cognitive Link Detected</h3>
  </CardHeader>
  <CardBody>
    <p>We noticed you make more confident decisions when starting with research nodes.</p>
  </CardBody>
</Card>
```

### 3. Dialogs & Modals
```tsx
import { DeleteModal } from '@/components/ui/Dialog';

<DeleteModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  targetName="Vague Goal Pathway"
  onDelete={() => handleConfirmDelete()}
/>
```

---

## 4. Layout & Responsive System

1.  **Desktop Container width**: `--container-max-width: 1440px` (centered dynamically).
2.  **Dashboard Layout**: Left-aligned sidebar with a width of `280px` (`--sidebar-width`), collapsing down to `80px` (`--sidebar-collapsed-width`). Main panel stretches dynamically.
3.  **Command Palette**: Activates via standard shortcut `Cmd + K` or `Ctrl + K`. Shows a modal dialog with glassmorphism filters.
