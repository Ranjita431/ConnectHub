# ConnectHub Design System

## 1. Overview

ConnectHub uses a warm, editorial visual language for a social networking and interest-discovery platform. Cream and ivory surfaces, muted plum and lilac accents, charcoal typography, and natural photography keep the interface welcoming and professional.

The product palette is intentionally soft rather than pink-heavy. Shared components use the same tokens, spacing, and interaction patterns throughout the application.

## 2. Color Palette

### Product palette

ConnectHub-specific utilities are defined in `src/app/globals.css` under the `hub-*` namespace. These are the current light-theme values:

| Token                | Value     | Use                                |
| -------------------- | --------- | ---------------------------------- |
| `hub-primary`        | `#685575` | Primary actions and brand emphasis |
| `hub-primary-hover`  | `#51415e` | Primary hover state                |
| `hub-primary-deep`   | `#40324b` | High-contrast plum surfaces        |
| `hub-accent`         | `#90769b` | Secondary plum/lilac accents       |
| `hub-primary-soft`   | `#f0ebf3` | Selected and highlighted surfaces  |
| `hub-primary-wash`   | `#f8f5f8` | Subtle brand-tinted surfaces       |
| `hub-primary-border` | `#d8cbdc` | Brand-tinted borders               |
| `hub-canvas`         | `#f8f6f1` | Warm application canvas            |
| `hub-surface`        | `#fffdfa` | Main content surface               |
| `hub-surface-warm`   | `#faf7f1` | Warm secondary surface             |
| `hub-ink`            | `#342f38` | Primary body text                  |
| `hub-title`          | `#302b34` | Page and section headings          |
| `hub-body`           | `#514c55` | Body text                          |
| `hub-muted`          | `#746e77` | Secondary text                     |
| `hub-border`         | `#e8e1dc` | Standard separators and borders    |
| `hub-focus`          | `#80678f` | Visible focus indicators           |
| `hub-danger`         | `#a65368` | Destructive or negative actions    |
| `hub-success`        | `#586d53` | Positive status details            |

Shared primitives also use semantic CSS variables for primary, secondary, background, surface, text, border, status, and focus states. These remain available for the `.dark` theme; the ConnectHub product palette is currently tuned for the light application design. Illustrations and sample avatars use a restrained set of additional accent colors.

## 3. Typography

### UI and body

Geist Sans is used for body text, navigation, controls, and general interface content.

### Editorial headings

Georgia, with Times New Roman and the system serif as fallbacks, is reserved for selected editorial headings. It is an accent to the UI typography, not a body font.

### Monospace

Geist Mono is available for code-like or technical content.

The hierarchy is:

- Page title: large, clear, and usually sans-serif; editorial serif is used selectively.
- Section title: medium to large, semibold.
- Body: regular weight with comfortable line height.
- Caption: small and muted, while retaining readable contrast.
- Label: small to medium, medium weight.

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
- Rounded corners use the shared radius scale, based on a `0.75rem` base radius.
- Subtle shadows where appropriate
- Clear visual separation between content sections
- Consistent padding and alignment
- Warm surfaces and delicate borders support the editorial palette without excess decoration.

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
- Geist Sans and Geist Mono with a Georgia editorial heading stack

## 10. Implementation Notes

- Shared semantic and `hub-*` design tokens are maintained in `src/app/globals.css`.
- Geist Sans and Geist Mono are loaded in `src/app/layout.tsx`; the editorial serif stack is defined in `src/app/globals.css`.
- Reusable UI components belong in `src/components/ui/`.
- Layout components belong in `src/components/layout/`.
- Dashboard and feature-specific components belong in `src/components/dashboard/` and `src/components/features/`.
- Use named `hub-*` utilities for the core interface palette; reserve component-specific accent colors for illustrative artwork and sample avatars.
