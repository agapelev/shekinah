# Mantine Theme Architecture Guide

## Overview

This document explains the **centralized theme system** that powers all styling in the Shekinah project. All component styling, colors, spacing, and responsive behavior is defined in one place and applied globally.

## Core Principle

> **Single Source of Truth**: All styling is defined in the Mantine theme object, NOT scattered across components.

### Why This Matters
- **Consistency**: Every page and component follows the same design system
- **Maintainability**: Change colors or spacing once, and it updates everywhere
- **Scalability**: Adding 10 new pages requires NO per-page styling
- **Performance**: CSS is generated once during build, not at runtime

## How It Works

### 1. Theme Definition
**File**: `src/components/BlogSearchWrapper.jsx`

```jsx
const theme = createTheme({
  colors: { ... },        // Color palettes
  fontFamily: "...",      // Typography
  breakpoints: { ... },   // Responsive sizes
  radius: { ... },        // Border radius
  spacing: { ... },       // Margins/padding scale
  shadows: { ... },       // Shadow effects
  components: { ... },    // Component styles
});
```

**Key**: The `components` section defines how ALL Mantine components look:

```jsx
components: {
  Card: {
    styles: {
      root: {
        backgroundColor: 'var(--bg-main)',
        color: 'var(--text-main)',
      }
    }
  },
  Text: { ... },
  Button: { ... },
  Badge: { ... },
}
```

### 2. Color Variables with Light/Dark Support
**File**: `src/styles/global.css`

```css
:root {
  --primary-color: #2563eb;   /* Light mode */
  --bg-main: #ffffff;
  --text-main: #1f2937;
}

[data-mantine-color-scheme="dark"] {
  --primary-color: #3b82f6;   /* Dark mode */
  --bg-main: #111827;
  --text-main: #f3f4f6;
}
```

**How it works**:
1. Mantine sets `data-mantine-color-scheme="light"` or `"dark"` on the `<html>` element
2. CSS cascade automatically applies the correct color variables
3. Components using `var(--bg-main)` automatically respond to theme changes

### 3. Theme Initialization & Persistence
**File**: `src/layouts/BaseLayout.astro`

```astro
<ColorSchemeScript defaultColorScheme="light" />
<MantineProvider theme={theme} defaultColorScheme={initialColorScheme}>
```

- `ColorSchemeScript`: Prevents flash of wrong color on page load (SSR)
- `MantineProvider`: Makes theme available to all React components
- Reads from localStorage to restore user's color preference

### 4. Theme Toggle Control
**File**: `src/components/ThemeToggleButton.svelte`

```svelte
htmlEl.setAttribute('data-mantine-color-scheme', 'dark');
localStorage.setItem('mantine-color-scheme', 'dark');
```

This updates:
1. The `data-mantine-color-scheme` attribute (Mantine components respond)
2. CSS variables (via `[data-mantine-color-scheme]` selector in CSS)
3. localStorage (persists across page reloads)

## Adding New Pages or Components

### For New Pages (Astro)
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="My Page" description="..." permalink="...">
  <h1>My Content</h1>
</BaseLayout>
```

✅ **That's it!** The page automatically gets:
- Mantine theme styling
- Light/dark mode support
- CSS variables
- Responsive breakpoints

### For New React Components
```jsx
import { Button, Card, Text } from '@mantine/core';

export default function MyComponent() {
  return (
    <Card>
      <Text>Content automatically styled by theme</Text>
      <Button>Click me</Button>
    </Card>
  );
}
```

✅ Styling comes from the theme automatically. NO inline styles needed.

### For Custom Styling (CSS)
If you need custom CSS, add it to a `.astro` or `.css` file:

```css
.my-custom-element {
  color: var(--text-main);        /* Uses theme colors */
  background: var(--bg-main);
  border: 1px solid var(--border-color);
  padding: var(--mantine-spacing-md);  /* Uses Mantine spacing */
}
```

**NEVER use hardcoded colors like `#1f2937`** - use CSS variables instead.

## Responsive Design

Mantine breakpoints are pre-defined:

```jsx
breakpoints: {
  xs: '36em',   // Phone
  sm: '48em',   // Tablet
  md: '62em',   // Desktop
  lg: '75em',   // Large Desktop
  xl: '88em',   // Extra Large
}
```

Use in components:
```jsx
<Grid>
  <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
    Responsive layout
  </Grid.Col>
</Grid>
```

## Customizing the Theme

### Change Primary Color
Edit `src/components/BlogSearchWrapper.jsx`:

```jsx
colors: {
  brand: [
    '#dbeafe',  // Lightest
    ...
    '#172554',  // Darkest
  ]
}
```

All components using `primaryColor: 'brand'` automatically update.

### Change Font
```jsx
fontFamily: 'Roboto, sans-serif',
headings: {
  fontFamily: 'Playfair, serif',
}
```

### Change Spacing
```jsx
spacing: {
  xs: rem(8),   // Default 8px
  sm: rem(12),  // Update any value
  md: rem(16),
  ...
}
```

## Color Scheme: Light vs Dark

### Default Behavior
```jsx
<MantineProvider defaultColorScheme="light">
```

- Default is light mode
- User preference persists in localStorage
- System preference as fallback if not saved

### Force Color Scheme (if needed)
```jsx
<MantineProvider forceColorScheme="dark">
```

This locks the theme (no user toggle).

### System Preference
```jsx
<MantineProvider defaultColorScheme="auto">
<ColorSchemeScript defaultColorScheme="auto" />
```

Automatically matches OS dark/light mode.

## Common Issues & Solutions

### "I want to style the background differently in dark mode"

❌ **Wrong**: Add a `.dark` CSS class
✅ **Right**: Use the `[data-mantine-color-scheme="dark"]` selector

```css
/* ❌ Doesn't work with new system */
:root.dark { ... }

/* ✅ Works with Mantine */
[data-mantine-color-scheme="dark"] {
  --bg-main: #111827;
}
```

### "My component doesn't respond to theme changes"

**Cause**: Using hardcoded colors instead of theme variables.

```jsx
// ❌ Doesn't respond to theme
style={{ color: '#1f2937' }}

// ✅ Uses theme colors
style={{ color: 'var(--text-main)' }}
```

### "I want custom styling for a component"

**Option 1**: Update the theme (preferred)
```jsx
// In BlogSearchWrapper.jsx
components: {
  MyComponent: {
    styles: {
      root: { /* your styles */ }
    }
  }
}
```

**Option 2**: Use CSS variables (fallback)
```jsx
style={{
  backgroundColor: 'var(--bg-main)',
  color: 'var(--text-main)',
}}
```

**Option 3**: Add CSS class (only if truly custom)
```css
.my-special-style {
  color: var(--text-main);
  border: 2px solid var(--border-color);
}
```

## Files Summary

| File | Purpose |
|------|---------|
| `src/components/BlogSearchWrapper.jsx` | Theme definition & initialization |
| `src/layouts/BaseLayout.astro` | Layout + ColorSchemeScript |
| `src/styles/global.css` | CSS variables for light/dark modes |
| `src/components/ThemeToggleButton.svelte` | Theme switcher control |

## Next Steps

When you add new pages tomorrow:

1. ✅ Create page in `src/pages/`
2. ✅ Wrap content in `BaseLayout` component
3. ✅ Use Mantine components (`<Card>`, `<Button>`, `<Text>`, etc.)
4. ✅ If custom styling needed, use CSS variables (`var(--*)`)
5. ✅ Test in both light and dark modes

**That's all you need to do.** No per-page styling, no duplicated theme logic.

## Resources

- [Mantine Theme Documentation](https://mantine.dev/theming/mantine-provider/)
- [Mantine Color Schemes](https://mantine.dev/theming/color-schemes/)
- [Mantine Components](https://mantine.dev/components/)
