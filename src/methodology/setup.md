---
title: "Setup & Installation"
description: "Get the design system documentation site up and running on your local machine."
layout: base.njk
---

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or later) — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for version control)

---

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ucld
```

### 2. Install Dependencies

```bash
npm install
```

This installs Eleventy, Bootstrap 5 (SCSS), the Sass compiler, markdown-it and its anchor plugin, and npm-run-all.

### 3. Run Development Server

```bash
npm run dev
```

This command will:

- Start Eleventy's dev server with live reload
- Watch and compile SCSS files automatically
- Open your browser to `http://localhost:8080/ucld/`

The site will automatically reload when you make changes to HTML or SCSS files.

### 4. Build for Production

```bash
npm run prod
```

This creates an optimized production build in the `_site/` directory with:

- Compiled and minified CSS
- Static HTML files
- Copied assets

---

## Available npm Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server with live reload |
| `npm run build` | Build the site for production |
| `npm run prod` | Alias for `npm run build` |
| `npm run dev:eleventy` | Run only Eleventy dev server |
| `npm run dev:sass` | Run only Sass watcher |
| `npm run build:eleventy` | Build only Eleventy |
| `npm run build:sass` | Build only Sass (minified) |
| `npm run a11y` | Run accessibility checks against the built site |
| `npm test` | Build, then run the accessibility checks |

---

## Troubleshooting

### Port 8080 is already in use

Kill the process using port 8080 or specify a different port:

```bash
npx @11ty/eleventy --serve --port=3000
```

### SCSS not compiling

Ensure Sass is installed:

```bash
npm install sass
```

### Bootstrap styles not working

Check that Bootstrap is installed and imported in `main.scss`:

```bash
npm install bootstrap
```

---

## Next Steps

- **[System architecture: structure, tokens, and what the build generates]({{ '/methodology/architecture/' | url }})**
- **[Conventions and the definition of done]({{ '/methodology/conventions/' | url }})**

---

## Viewing the Site

### Development

- Local: `http://localhost:8080/ucld/`
- Automatically reloads on file changes

### Production

The build writes to `_site/`. Because the site is served under the `/ucld/` path prefix, opening those files directly from disk will not resolve stylesheets or links. Serve the folder over HTTP to preview a production build.

---

## Deployment to GitHub Pages

1. Push changes to `main` (or run the workflow manually)
2. GitHub Actions builds and deploys the generated `_site/` artifact
3. Set GitHub Pages source to `GitHub Actions` in repository settings
