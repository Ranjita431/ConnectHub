# ConnectHub Design System

## 1. Overview

ConnectHub uses a clean, modern, responsive visual language designed for a social networking and interest-discovery platform.

The design system provides consistent colors, typography, spacing, components, and interaction patterns throughout the application.

## 2. Color Palette

### Named UI Tokens

ConnectHub-specific utilities are defined in `src/app/globals.css` and use the `hub-*` namespace. The core palette is:

| Token                | Value     | Use                                |
| -------------------- | --------- | ---------------------------------- |
| `hub-primary`        | `#5141cf` | Primary actions and brand emphasis |
| `hub-primary-hover`  | `#40369b` | Primary hover state                |
| `hub-primary-soft`   | `#f0edfc` | Selected and highlighted surfaces  |
| `hub-primary-border` | `#d7cff5` | Brand-tinted borders               |
| `hub-focus`          | `#6553d2` | Visible focus indicators           |
| `hub-canvas`         | `#f7f6f2` | Warm application canvas            |
| `hub-surface`        | `#ffffff` | Main content surface               |
| `hub-ink`            | `#302d39` | Primary body text                  |
| `hub-title`          | `#292733` | Page and section headings          |
| `hub-muted`          | `#77747b` | Secondary text                     |
| `hub-border`         | `#e7e4dc` | Standard separators and borders    |
| `hub-divider`        | `#efede7` | Subtle internal separators         |
| `hub-danger`         | `#a9485b` | Destructive or negative actions    |
| `hub-success`        | `#536b48` | Positive status details            |

Semantic CSS variables for primary, secondary, background, surface, text, border, success, warning, danger, and focus states remain available for shared primitives. Community illustrations and sample avatar colors use a small set of intentionally varied accent colors.

The shared semantic tokens support a `.dark` theme; the ConnectHub product palette is currently tuned for the light application design.

## 3. Typography

Font family: Geist Sans

Monospace font: Geist Mono

Typography hierarchy:

- Page title: Large, bold
- Section title: Medium to large, semibold
- Body: Regular
- Caption: Small, muted
- Label: Small to medium, medium weight

## 4. Spacing System

Use Tailwind CSS spacing utilities consistently.

Common spacing values:

- 1: 4px
- 2: 8px
- 3: 12px
- 4: 16px
- 6: 24px
- 8: 32px
- 12: 48px

Avoid arbitrary spacing values unless necessary.

## 5. Responsive Breakpoints

Use Tailwind CSS default breakpoints:

- Mobile: Below 640px
- Tablet: 640px to 1023px
- Desktop: 1024px and above

The interface follows a mobile-first development approach.

## 6. Component Styling

- Consistent border colors
- Rounded corners using shared radius tokens
- Subtle shadows where appropriate
- Clear visual separation between content sections
- Consistent padding and alignment

## 7. Interaction States

All interactive components should support:

- Default
- Hover
- Active
- Focus
- Disabled
- Error, where applicable

Keyboard users must have visible focus indicators.

## 8. Accessibility

- Use semantic HTML elements.
- Maintain sufficient text contrast.
- Provide visible keyboard focus.
- Use accessible labels for inputs.
- Provide accessible names for icon-only buttons.
- Respect reduced-motion preferences.

## 9. Technology

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui with Base UI
- Lucide React
- Geist typography

## 10. Implementation Notes

- Shared semantic and `hub-*` design tokens are maintained in `src/app/globals.css`.
- Reusable UI components belong in `src/components/ui/`.
- Layout components belong in `src/components/layout/`.
- Dashboard and feature-specific components belong in `src/components/dashboard/` and `src/components/features/`.
- Use named `hub-*` utilities for the core interface palette; reserve component-specific accent colors for illustrative artwork and sample avatars.
