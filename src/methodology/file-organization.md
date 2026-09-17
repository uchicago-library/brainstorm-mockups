---
title: "File Organization"
description: "Learn how the project is organized, where different file types belong, and how to structure your contributions."
layout: base.njk
---

---

## Directory Layout

```text
ucld/
├── src/
│   ├── _includes/              # Reusable HTML partials
│   │   ├── base.njk            # Layout for documentation pages
│   │   ├── header.html         # Site header with navigation
│   │   └── footer.html         # Site footer
│   ├── styles/                 # SCSS files
│   │   ├── _variables.scss     # Bootstrap variable overrides
│   │   ├── base/               # Base/foundational styles
│   │   │   ├── _global.scss    # Global element overrides
│   │   │   └── layout/
│   │   │       └── _layout.scss
│   │   ├── components/         # Component-specific styles
│   │   │   ├── _header.scss
│   │   │   ├── _footer.scss
│   │   │   └── _*.scss         # Additional components
│   │   ├── meta/               # Documentation-only styles, never shipped
│   │   │   ├── _annotations.scss
│   │   │   └── _documentation.scss
│   │   ├── main.scss           # Product entry point
│   │   ├── main-libapps.scss   # LibApps override entry point
│   │   └── meta.scss           # Documentation entry point (imports meta/)
│   ├── design_system/          # Demo pages (HTML) and documentation (Markdown),
│   │                           # grouped into foundation/, guidelines/, implementation/
│   ├── design_mockups/         # Full page mockups (HTML), grouped by topic
│   ├── methodology/            # Development guidelines (this folder)
│   ├── assets/                 # Static assets
│   │   └── images/             # Image files
│   └── index.html              # Homepage
├── _site/                      # Built site (generated output)
├── package.json                # NPM scripts and dependencies
├── .eleventy.js                # Eleventy configuration
└── README.md                   # Project documentation
```

---

## File Organization Rules

### Page Files

- **Component demos**: `src/design_system/` — HTML, because the rendered markup is the documentation
- **Prose documentation**: `src/design_system/` and `src/methodology/` — Markdown, with `layout: base.njk`
- **Page mockups**: `src/design_mockups/` — HTML
- **Reusable partials**: `src/_includes/`

Both `.html` and `.md` are valid page formats. Use Markdown for prose; use HTML when live markup, a `<style>` block, or interactive demos are part of what the page documents.

### SCSS Files

- **All styles live in**: `src/styles/`
- **Bootstrap overrides**: `src/styles/_variables.scss`
- **Base/global styles**: `src/styles/base/_global.scss`
- **Component styles**: `src/styles/components/` (one file per component)
- **Layout styles**: `src/styles/base/layout/`
- **Documentation-only styles**: `src/styles/meta/` (not shipped to production; import from `meta.scss`, never `main.scss`)
- **Entry points**: `src/styles/main.scss` (product), `main-libapps.scss` (LibApps overrides), `meta.scss` (this documentation site)

### Assets

- **Images, fonts, icons**: `src/assets/`
- **Reference in HTML**: `/assets/images/filename.png`

### File Naming Conventions

- **SCSS files**: Prefix with underscore (e.g., `_buttons.scss`)
- **Page files**: Use kebab-case (e.g., `demo-buttons.html`, `design-standards.md`)
- **CSS classes**: Use BEM convention for components (e.g., `.card__header--primary`)

---

## What Goes Where

| Content Type | Location | Notes |
| --- | --- | --- |
| Button component demo | `src/design_system/components/buttons.html` | Show all button variations |
| Prose documentation page | `src/methodology/design-standards.md` | Markdown with `layout: base.njk` |
| Full page mockup | `src/design_mockups/guide-layout.html` | Experimental page layouts |
| Component SCSS | `src/styles/components/_buttons.scss` | Import in main.scss |
| Documentation-only SCSS | `src/styles/meta/_documentation.scss` | Import in meta.scss, never main.scss |
| Global SCSS | `src/styles/base/_global.scss` | Element overrides, not component-specific |
| Layout utilities | `src/styles/base/layout/_layout.scss` | Grid, spacing, alignment |
| Header/Footer | `src/_includes/header.html`, `footer.html` | Included in all pages |
| Logo images | `src/assets/images/` | Reference as `/assets/images/logo.png` |

---

## Important Reminders

<div class="alert alert-warning"><strong>⚠️ Never modify the <code>_site/</code> folder.</strong> It's auto-generated during the build process. All work happens in <code>src/</code>.</div>

<div class="alert alert-info"><strong>ℹ️ Section navigation and per-page listings are generated from the folder structure.</strong> Placing a page inside a section folder is enough for it to appear in that section's landing page and the homepage's documentation navigation — no manual list to update. Cross-links between specific pages (like a "See also" reference) still need to be written and kept up to date by hand.</div>

---

## Next Steps

- **[Learn about system architecture, design tokens, and development standards]({{ '/methodology/system-architecture/' | url }})**
