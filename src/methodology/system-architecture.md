---
title: "System Architecture"
description: "Complete reference for the design system's structure, design tokens, naming conventions, code standards, and development workflow."
layout: base.njk
---

## Quick Navigation

- [Core Concepts](#core-concepts)
- [Design Tokens](#design-tokens)
- [Naming Conventions](#naming-conventions)
- [File Organization](#file-organization)
- [Code Rules & Best Practices](#code-rules-best-practices)
- [Resources & References](#resources-references)

## Core Concepts

- **Brand:** variables (e.g., colors, typography) are defined in `src/styles/_variables.scss` and override Bootstrap's default variables.
- **Elements** like buttons, forms, and inputs are styled using Bootstrap utilities and custom SCSS.
  - Custom classes should only be added when necessary (e.g., `.btn-brand` for branded buttons).
- **Global components** (e.g., header, footer) are defined as HTML partials in `src/_includes/` (e.g., `header.html`, `footer.html`).
  - Markup: Dedicated HTML partial files.
- **Design System pages** (`src/design_system/`) showcase individual styles, elements, and components in isolation, as well as finalized pages.
- **Mockup pages** (`src/design_mockups/`) are for brainstorming and experimenting with page layouts using the design system. Add styling as a `<style>` block inside the HTML.
- **Styling:** One SCSS file per **bespoke element, component, or page** in `src/styles/`.
- **Importing:** Each custom SCSS file in `src/styles/` should be imported in `src/styles/main.scss`.
- **Demonstration:** Each bespoke element, component, or page should (in principle) have a corresponding demo page in `src/design_system/`.
- Demonstration pages do not need code examples.

---

## Design Tokens

Design tokens are SCSS and CSS variables. Their structure allows you to update the full styling system (for example, brightening the primary color). They are loosely organized into three levels of abstraction for this purpose: Core (brand or utility), Semantic (generic roles), and Component (role-specific).

| Level | Scope | Examples |
| --- | --- | --- |
| **Level 1: Core** | Brand/utility (foundational) | `primary`, `secondary`, `red-500`, `gray-200` |
| **Level 2: Semantic** | Generic roles (reusable) | `background`, `text-muted`, `border-subtle` |
| **Level 3: Component** | Component/role-specific | `btn-primary-bg`, `search-placeholder-text` |

```text
├── _variables.scss       # Level 1 & 2 tokens
├── base/                 # Global element styles
├── components/           # Level 3 tokens + component styles
├── meta/                 # Styles for this documentation site only
├── main.scss             # Product entry point
├── main-libapps.scss     # LibApps override entry point
└── meta.scss             # Documentation entry point
```

### Where token documentation lives

The [Token Tables]({{ '/design_system/token-tables/' | url }}) page is generated from the stylesheets at build time, so no token value, CSS variable name or utility class is ever transcribed by hand. The authoring conventions that drive it — the comment markers, the naming rule, the guidance on when to use an SCSS variable versus a CSS variable — are documented in the header of `src/styles/_variables.scss` rather than on the rendered page, because that is the file you are looking at when you need them.

Documenting a token therefore costs nothing beyond the comment you would write anyway. Tokens are listed exhaustively, appearing with empty cells if undocumented; component classes are opt-in, appearing only if annotated, since a stylesheet is mostly internal structure. The build prints a coverage report and fails outright if a token's published CSS variable disagrees with its compiled Sass value.

---

## Naming Conventions

Consistent naming ensures clarity and maintainability across the project.

### File Naming

- **SCSS:** `_component-name.scss` (underscore prefix, kebab-case)
- **Pages:** `component-name.html` or `page-name.md` (kebab-case, descriptive)
- **Folders:** kebab-case or underscore format

### CSS Class Naming: BEM (Block–Element–Modifier)

**Pattern:** `.block__element--modifier`

- **Block:** Top-level component (e.g., `.card`)
- **Element:** Child of a block, preceded by `__` (e.g., `.card__header`)
- **Modifier:** Variation, preceded by `--` (e.g., `.card--featured`)

**Avoid:**

- ❌ Over-nesting: `.card__content__inner__text`
- ❌ Mixing BEM with Bootstrap utilities randomly
- ❌ Using BEM for simple spacing or alignment

| When to use BEM | Guidance |
| --- | --- |
| **Layout rules** (columns, grids used across templates) | Don't BEM these. They are structural, not semantic. Use utilities from Bootstrap. |
| **Bespoke components** (search box, news thumbnail, quick-links box) | Perfect BEM territory. |
| **Custom one-off elements** (like a specific spacer) | Don't force BEM here. Use utilities for spacing, sizing, or alignment. |

### ID Naming & Usage

Use IDs to identify unique document-level structure and stable behavior hooks; use BEM classes for reusable styling and component internals.

- **Use IDs for unique landmarks:** e.g., `header`, `footer`, `main-content`.
- **Use IDs for one-to-one relationships:** e.g., ARIA references like `aria-labelledby` and label/control pairing.
- **Use IDs for stable JS/test hooks only when unique:** prefer data attributes for repeated instances.
- **Use BEM classes for appearance and structure:** e.g., `.card`, `.card__header`, `.card--featured`.
- **Do not replace BEM with IDs on reusable components:** IDs must be unique per page and do not scale across multiple instances.
- **Name IDs in kebab-case and keep them durable:** avoid renaming shared IDs unless there is a coordinated migration.

---

## File Organization

### Directory Structure

```text
src/
├── _includes/              # Reusable partials (base layout, header, footer)
├── assets/                 # Images, fonts
├── design_system/          # Design documentation and component demos
├── design_mockups/         # Full-page mockups for brainstorming
├── methodology/            # Usage and contribution guidelines
└── styles/
    ├── _variables.scss     # Bootstrap overrides + custom tokens
    ├── main.scss           # Product entry point
    ├── main-libapps.scss   # LibApps override entry point
    ├── meta.scss           # Documentation entry point
    ├── base/
    │   ├── _global.scss    # Global element overrides
    │   └── layout/
    │       └── _layout.scss
    ├── components/
    │   ├── _header.scss
    │   ├── _footer.scss
    │   └── _*.scss         # One file per custom component
    └── meta/               # Documentation-only styles
        ├── _annotations.scss
        └── _documentation.scss
```

---

## Code Rules & Best Practices

### Page Rules

- **Choose the right format:** Markdown (`.md`) for prose documentation, HTML for pages whose rendered markup is the documentation. Both use `layout: base.njk`.
- **Include partials** using Eleventy: {% raw %}`{% include "header.html" %}`{% endraw %}
- **Keep markup clean:** No inline styles or scripts
- **Use semantic HTML:** `<header>`, `<main>`, `<article>`, `<nav>`
- **Always include alt text** on images for accessibility
- **Experimental styles:** Use a `<style>` block at the top of mockup files (not inline). Move to dedicated SCSS once finalized.

### SCSS/CSS Rules

- **Use SCSS variables** for colors, spacing, etc. Never hardcode values
- **Avoid `!important`** unless absolutely necessary
- **Define variables in `_variables.scss`** or at the top of component files
- **Follow BEM conventions** for custom components
- **Use Bootstrap utilities** for common patterns instead of custom CSS
- **Create one file per component:** `src/styles/components/_component-name.scss`
- **Import all files in `src/styles/main.scss`** to ensure compilation

### JavaScript Rules

**Minimize custom JavaScript.** Only use JavaScript for:

- Initializing Bootstrap components (dropdowns, modals, etc.) via data attributes
- Build-time tasks (e.g., Eleventy plugins)
- When no alternative exists for critical functionality

<div class="alert alert-info"><strong>Tip:</strong> Bootstrap components typically work with just HTML data attributes—no custom JS needed.</div>

### Testing & Quality Assurance

- **Run dev server:** `npm run dev` and navigate to your page
- **Test responsive behavior:** Check mobile, tablet, and desktop views
- **Check accessibility:** Use axe DevTools to audit for issues
- **Validate HTML/CSS:** Use [W3C Validator](https://validator.w3.org/)
- **Test on multiple browsers:** Chrome, Firefox, Safari

### Future-Proofing

- Avoid adding new libraries unless absolutely necessary
- Keep components modular so they can be copied into other projects
- Document your code with comments explaining why, not what
- Test edge cases and different screen sizes

---

## Resources & References

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Customization Guide](https://getbootstrap.com/docs/5.3/customize/overview/)
- [Sass Documentation](https://sass-lang.com/documentation)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [W3C HTML Validator](https://validator.w3.org/)
- [axe DevTools (Accessibility)](https://www.deque.com/axe/)
