# ConnectHub Design System

## 1. Overview

ConnectHub uses a clean, modern, responsive visual language designed for a social networking and interest-discovery platform.

The design system provides consistent colors, typography, spacing, components, and interaction patterns throughout the application.

## 2. Color Palette

### Brand Colors

- Primary: Indigo
- Primary foreground: White
- Secondary: Slate
- Accent: Light indigo

### Surface Colors

- Background: Light slate
- Surface: White
- Card: White
- Popover: White

### Text Colors

- Foreground: Dark slate
- Muted foreground: Slate gray
- Secondary foreground: Dark slate

### Semantic Colors

- Success: Green
- Warning: Amber
- Danger: Red
- Focus: Indigo

### Additional Theme

A dark theme is defined using the `.dark` CSS class.

All color values are maintained as CSS custom properties in `src/app/globals.css`.

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

- Shared design tokens are maintained in `src/app/globals.css`.
- Reusable UI components belong in `src/components/ui/`.
- Layout components belong in `src/components/layout/`.
- Feature-specific components belong in their respective feature folders.
- Avoid duplicating styles and arbitrary color values.
