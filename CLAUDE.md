# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A static site for the UChicago Library Design System — component documentation and mockups built with **Eleventy**, **Bootstrap 5 (SCSS)**, and **FontAwesome 6**. Deployed to GitHub Pages at `/brainstorm-mockups/`.

## Commands

```bash
npm run dev       # Start dev server + Sass watcher (http://localhost:8080)
npm run prod      # Production build (minified CSS)
npm run build     # Same as prod (used by CI)
```

`dev` runs Eleventy and Sass in parallel via `npm-run-all`. There are no tests.

## Architecture

### Build pipeline

- **Eleventy** (`src/` → `_site/`) compiles HTML and Nunjucks templates
- **Sass** compiles `src/styles/main.scss` → `_site/assets/css/main.css`
- Config in [.eleventy.js](.eleventy.js); path prefix `/brainstorm-mockups/` is set there for GitHub Pages

### Page structure

Every page follows this include pattern:

```html
---
title: "Page Title"
---
{% include "meta/document-start.html" %}
{% include "header.html" %}
{% include "breadcrumb.html" %}
<main class="container-md">
  <div class="col-lg-10 mx-auto"><!-- content --></div>
</main>
{% include "footer.html" %}
```

Templates live in [src/_includes/](src/_includes/). Data files in [src/_data/](src/_data/) are available as global Nunjucks variables — notably `globalNav.json` drives the header navigation.

### SCSS structure

There are three entry points, each compiling to `_site/styles/`:

- **`main.scss`** — the product stylesheet, loaded by every page.
- **`main-libapps.scss`** — overrides for Springshare LibApps/LibGuides pages, which load their own Bootstrap at runtime.
- **`meta.scss`** — styles for this documentation site itself, never shipped with the product. Loaded alongside `main.css` by `meta/document-start.html`.

Load order in `main.scss` matters, and Bootstrap is imported in parts rather than as a bundle:

1. `bootstrap/scss/functions` — **must precede `_variables.scss`** so Bootstrap's colour helpers are in scope. An unresolved Sass function does not error; it degrades to a literal, so this ordering is load-bearing.
2. `_variables.scss` — Bootstrap variable overrides + UChicago brand tokens. Holds Level 1 (core/brand) and Level 2 (semantic) design tokens. `$ucl-*` names are ours; unprefixed names are Bootstrap variables we override.
3. The rest of Bootstrap's config layer, then its components, then `utilities/api`
4. `base/` — global resets, typography, layout
5. `components/` — per-component files, each holding Level 3 (component-specific) tokens and styles

`src/styles/meta/` holds the documentation-only components (annotations, typography labels, token tables). Import them from `meta.scss`, never from `main.scss`.

To add a component: create `src/styles/components/_name.scss` and `@import` it in `main.scss` (the codebase uses `@import`, not `@use`, apart from one deliberate `@use` in `base/_global.scss`). Each bespoke element, component, or page gets its own SCSS file — one file per concept.

### Generated token documentation

`src/design_system/token-tables.html` is generated at build time by [src/_data/tokens.js](src/_data/tokens.js) from the SCSS itself — values, CSS variable names, utility classes and notes are never transcribed by hand. Four comment forms in `_variables.scss` drive it:

| Form | Effect |
|---|---|
| `// === Tab Name ===` | Opens a tab; sections below belong to it |
| `// == Section Name ==` | Section heading, grouping the rows that follow |
| `//! prose` | Guidance block above that section's table |
| `/// prose` | Note for the token declared immediately below |

A trailing `// prose` on a declaration is the inline equivalent of `///`. The same `///` form documents a **class** in `base/` and `components/`, where it is opt-in — a class appears on the page only if it carries a note. Tokens are exhaustive; classes are not.

Two build guards will fail the build rather than publish wrong data: an unresolved Sass function in `_variables.scss`, and disagreement between the `--ucl-*` custom properties and the compiled Sass values. Do not add `!default` to a `$ucl-*` token or reassign one downstream — see the Auto-Exposure Constraint note in `_variables.scss`.

### Content directories

- `src/design_system/` — component documentation and demo pages
- `src/design_mockups/` — full-page layout mockups for brainstorming
- `src/methodology/` — guidelines and process docs (see `src/methodology/system-architecture.html` for the canonical reference)

### Navigation

Edit [src/_data/globalNav.json](src/_data/globalNav.json) to change header nav. The `header.html` include renders it via a Nunjucks loop.

Whenever pages are added, removed, or renamed, also update the navigation in `src/index.html` to maintain the `design_system/`, `design_mockups/`, and `methodology/` sections with appropriate nesting.

## Deployment

Push to `main` triggers `.github/workflows/deploy-pages.yml`, which runs `npm run build` and deploys `_site/` to GitHub Pages.

---

## Authoring Rules

### File boundaries

- **Never modify files inside `/docs/`.** All work happens in `src/`.
- **Do not add code examples** to documentation pages.
- Each bespoke element or component should have a corresponding demo page in `src/design_system/`.

### HTML

- Documentation pages (`src/design_system/`, `src/methodology/`) are documental. Focus on clean, semantic markup and basic Bootstrap styling.
  - Do not apply heading display classes (e.g., `h1`, `h2`) to heading elements.
  - Do not apply `mb-*` classes on `<p>` tags.
- Mockup pages (`src/design_mockups/`) and page-specific demo styles go in a `<style>` block at the top of the file — no inline styles. Move to a dedicated SCSS file once finalized.
- Use semantic elements: `<header>`, `<main>`, `<article>`, `<nav>`, etc.
- Always include `alt` text on images.

### CSS / SCSS

- Use the highest-level Bootstrap classes and custom component classes available. Avoid utility classes when a proper semantic class covers the need. Avoid inline styles.
- Never hardcode values — use SCSS variables.
- Avoid `!important` unless absolutely necessary.
- Follow BEM for custom components (`block__element--modifier`). Do not BEM layout/structural rules or simple one-off spacing — use Bootstrap utilities for those.
- Use IDs for unique landmarks (`header`, `footer`), ARIA references (`aria-labelledby`), and one-to-one JS hooks. Use BEM classes for appearance and reusable structure. Never use IDs on repeatable components.

### Bootstrap pitfalls

- Before relying on native HTML features, verify Bootstrap class overrides don't suppress them (e.g., `appearance: none` disabling `<datalist>` ticks, `width: 100%` overriding flex shrink).
- When adding sizing constraints (min-width, fixed widths, etc.), verify behavior at all breakpoints — especially mobile.
- When nesting interactive elements inside other interactive elements, account for event propagation conflicts upfront.

### Judgment calls

- If any instruction is unclear, conflicting, or appears to be a bad idea, ask for clarification before proceeding.
