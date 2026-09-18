# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A static site for the UChicago Library Design System — component documentation and mockups built with **Eleventy**, **Bootstrap 5 (SCSS)**, and **FontAwesome 6**. Deployed to GitHub Pages at `/ucld/`.

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
- Config in [.eleventy.js](.eleventy.js); path prefix `/ucld/` is set there for GitHub Pages, applied in both `npm run dev` and `npm run build`. A dev-server-only middleware in the same file works around a bug in `eleventy-dev-server@1.x` where its missing-trailing-slash redirect drops the prefix from the `Location` header. [src/_data/site.js](src/_data/site.js) points the absolute URLs in `/llms.txt` and reference pages at `http://localhost:8080` outside of a build, so they resolve locally instead of always pointing at production.

### Page structure

Documentation pages use the [base.njk](src/_includes/base.njk) layout, which supplies the
document head, header, breadcrumb, prose column, page title, and footer. A page provides only
front matter and content — **either Markdown or HTML, both render identically**:

```markdown
---
title: "Page Title"
description: "Renders as the lead paragraph and the meta description."
layout: base.njk
---

## First Section

Body content.
```

**Choosing a format.** Use `.md` for prose documentation. Use `.html` when the rendered markup
*is* the documentation — live component demos, type specimens, colour swatches, interactive
controls, or anything needing a `<style>`/`<script>` block.

**Do not mix block-level HTML into a `.md` file.** Markdown-generated output is flat, and
`_documentation.scss` relies on that (see SCSS structure). If a Markdown page needs a live demo,
move the markup to a partial and pull it in with one `{% include %}` line — see
[color-usage-guidelines.md](src/design_system/color-usage-guidelines.md). Inline HTML inside a
table cell (an `<i>` icon, a `<span>`) is fine.

**Markdown gotchas** (all verified against this build):

- Nunjucks runs *before* Markdown. Wrap any documented `{% ... %}` or `{{ ... }}` in `{% raw %}`.
- Internal links must go through the `url` filter: `[Tokens]({{ '/design_system/design-tokens/' | url }})`.
- Indented (4-space) code blocks are disabled. Use fenced blocks.
- Leave a blank line before a `---` horizontal rule, or it becomes an `<h2>` on the line above.
- Pipe tables automatically get `.table.table-bordered.table-sm` and a `.table-responsive` wrapper.
- `##`/`###`/`####` headings automatically get slugified `id`s for in-page anchors.
- External links automatically get `target="_blank" rel="noopener noreferrer"`.

Pages whose demos render outside the constrained prose column keep the hand-rolled include chain —
[layouts.html](src/design_system/layouts.html) is the one remaining example.

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

`src/styles/meta/` holds the documentation-only components (annotations, typography labels, token tables, the 60-30-10 color-ratio illustration, and `_documentation.scss` for the prose container). Import them from `meta.scss`, never from `main.scss`. Styling that only exists to document the system belongs in `meta/`, not `components/`.

`meta/_documentation.scss` styles the prose column using **direct-child selectors only**
(`.documentation > h2`, not `.documentation h2`). This is deliberate: Markdown output is flat, so
`>` reaches everything Markdown emits while leaving nested demo markup untouched — without it, the
prose rules would clobber the `.display-*` specimens on the Typography page and inflate spacing
inside demo cards. Keep new rules direct-child scoped.

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

Annotation prose is rendered as **inline Markdown** via the `inlineMarkdown` filter in [.eleventy.js](.eleventy.js), so backticks become `<code>` and raw HTML is escaped. Block-level Markdown is unsupported (the prose sits in a table cell). Wrap class names containing an asterisk in backticks — a bare `.btn-*` pairs its asterisks into `<em>`.

Two build guards will fail the build rather than publish wrong data: an unresolved Sass function in `_variables.scss`, and disagreement between the `--ucl-*` custom properties and the compiled Sass values. Do not add `!default` to a `$ucl-*` token or reassign one downstream — see the Auto-Exposure Constraint note in `_variables.scss`.

### Content directories

- `src/design_system/` — component documentation and demo pages
- `src/design_mockups/` — full-page layout mockups for brainstorming
- `src/methodology/` — guidelines and process docs (see `src/methodology/system-architecture.md` for the canonical reference)

### Machine-readable endpoints

The site publishes a machine-readable surface for AI agents building *other* projects
against this design system (agents working *on* the design system read the repo directly).

**Every `design_system/` page is reachable as Markdown at `/design_system/<page>.md`**,
regardless of whether its source is `.md` or `.html`. Rendered pages are ~90% chrome,
so the Markdown twins are 69–86% smaller.

- **`/llms.txt`** — discovery index following the [llms.txt convention](https://llmstxt.org),
  listing every `design_system/` page with its title, description, and `.md` URL.
  Source: [src/llms.njk](src/llms.njk).
- **Prose pages** (`.md` source) are passthrough-copied verbatim, front matter included.
- **Reference pages** (`.html` source) get a *generated* twin from
  [src/reference-md.njk](src/reference-md.njk): each top-level `<section>` becomes a
  heading plus a fenced `html` block holding that section's real markup. Built from
  `templateContent`, i.e. the final rendered output, so it **cannot drift** from the page.

All of it regenerates on build — **no manual step when pages are added or changed**.

Consequences for authoring:

- **`description` front matter is published** in `/llms.txt` and in every `.md`. Write a
  real one-line summary, not a placeholder.
- **Reference pages depend on top-level `<section>` elements.** A section with no `<h2>`
  gets an untitled heading; a page with no sections (currently `design-intent.html`)
  degrades to a stub pointing at the rendered page. Keep demo content inside sections.
- The generated markup includes the `.row` / `.col-*` scaffolding that lays each demo out
  beside its description. `/llms.txt` tells agents to drop it. If this becomes a problem,
  the fix is to mark the copy-pasteable element explicitly and extract only that.
- CLAUDE.md's "do not add code examples to documentation pages" rule still holds for the
  pages themselves. These are generated build artifacts, not authored content.

`methodology/` is deliberately excluded: it documents how to work *on* the design system,
not how to consume it, and agents doing that work have the repo.

### Navigation

Edit [src/_data/globalNav.json](src/_data/globalNav.json) to change header nav. The `header.html` include renders it via a Nunjucks loop.

Whenever pages are added, removed, or renamed, also update the navigation in `src/index.html` to maintain the `design_system/`, `design_mockups/`, and `methodology/` sections with appropriate nesting. `/llms.txt` regenerates itself and needs no manual update.

## Deployment

Push to `main` triggers `.github/workflows/deploy-pages.yml`, which runs `npm run build` and deploys `_site/` to GitHub Pages.

---

## Authoring Rules

### File boundaries

- **Never modify files inside `/docs/`.** All work happens in `src/`.
- **Do not add code examples** to documentation pages.
- Each bespoke element or component should have a corresponding demo page in `src/design_system/`.

### HTML

- Documentation pages (`src/design_system/`, `src/methodology/`) are documental. Prefer Markdown; focus on clean, semantic markup and basic Bootstrap styling.
  - Do not apply heading display classes (e.g., `h1`, `h2`) to heading elements.
  - Do not apply `mb-*` classes on `<p>` tags.
  - Do not restate the page title or lead in the body — `base.njk` renders them from the `title` and `description` front matter.
- Mockup pages (`src/design_mockups/`) and page-specific demo styles go in a `<style>` block at the top of the file — no inline styles. Move to a dedicated SCSS file once finalized.
- Use semantic elements: `<header>`, `<main>`, `<article>`, `<nav>`, etc.
- Always include `alt` text on images.

### CSS / SCSS

- Use the highest-level Bootstrap classes and custom component classes available. Avoid utility classes when a proper semantic class covers the need. Avoid inline styles.
- Never hardcode values — use SCSS variables.
- Avoid `!important` unless absolutely necessary.
- Follow BEM for custom components (`block__element--modifier`). Do not BEM layout/structural rules or simple one-off spacing — use Bootstrap utilities for those.
- Use IDs for unique landmarks (`header`, `footer`, `main-content`), ARIA references (`aria-labelledby`), and one-to-one JS hooks. Use BEM classes for appearance and reusable structure. Never use IDs on repeatable components.

### Accessibility

`npm run a11y` checks the built site and **fails CI**. Run it after `npm run build`, or run `npm test` for both. It covers only what is decidable from static markup — meaningful alt text, tab order and screen-reader phrasing still need a human.

- Every page needs **exactly one** `<main id="main-content" tabindex="-1">`. `meta/document-start.html` emits the skip link that targets it, so a page that opens its own `<body>` must supply its own skip link too.
- Every form control needs an accessible name: a `<label for>`, `aria-label`, or `aria-labelledby`. A visible heading next to a control is not a label.
- Every `<img>` needs `alt`. Use `alt=""` for decorative images — omitting the attribute is the error.
- Do not skip heading levels (`h2` → `h4`). Bootstrap's card examples use `<h5 class="card-title">`, which will skip if the card sits under an `h2`.
- IDs must be unique per rendered page. Watch partials included more than once.
- Bespoke transitions go through Bootstrap's `@include transition(...)`, never a bare `transition:` property — the mixin is what honours `prefers-reduced-motion`.
- Pages under `src/pages/libapps/` reproduce Springshare's own markup so the LibApps stylesheet can be validated against it. Findings there are reported as warnings and must not be "fixed" by editing the reproduction.

### Bootstrap pitfalls

- Before relying on native HTML features, verify Bootstrap class overrides don't suppress them (e.g., `appearance: none` disabling `<datalist>` ticks, `width: 100%` overriding flex shrink).
- When adding sizing constraints (min-width, fixed widths, etc.), verify behavior at all breakpoints — especially mobile.
- When nesting interactive elements inside other interactive elements, account for event propagation conflicts upfront.

### Judgment calls

- If any instruction is unclear, conflicting, or appears to be a bad idea, ask for clarification before proceeding.
