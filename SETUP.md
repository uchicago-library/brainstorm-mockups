# Project Setup Guide

This guide will help you get the design system documentation site up and running.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or later) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for version control)

## Quick Start

### 1. Install Dependencies

```powershell
npm install
```

This will install:
- Eleventy (static site generator)
- Bootstrap 5 (SCSS)
- Sass compiler
- npm-run-all (for running multiple scripts)

### 2. Run Development Server

```powershell
npm run dev
```

This command will:
- Start Eleventy's dev server with live reload
- Watch and compile SCSS files automatically
- Open your browser to `http://localhost:8080`

The site will automatically reload when you make changes to HTML or SCSS files.

### 3. Build for Production

```powershell
npm run prod
```

This creates an optimized production build in the `dist/` directory with:
- Compiled and minified CSS
- Static HTML files
- Copied assets

## Project Structure

```
brainstorm-mockups/
├── src/                          # Source files
│   ├── _includes/                # Reusable HTML partials
│   │   ├── header.html          # Site header with navigation
│   │   └── footer.html          # Site footer
│   ├── styles/                   # SCSS files
│   │   ├── _variables.scss      # Bootstrap variable overrides
│   │   ├── _header.scss         # Header/nav styles
│   │   ├── _footer.scss         # Footer styles
│   │   └── main.scss            # Main SCSS entry point
│   ├── demo/                     # Demo pages
│   │   └── typography.html      # Typography showcase
│   ├── mockups/                  # Full page mockups (empty for now)
│   ├── assets/                   # Static assets
│   │   └── images/              # Image files
│   └── index.html               # Homepage
├── dist/                         # Built site (generated, not in git)
├── .eleventy.js                 # Eleventy configuration
├── package.json                 # NPM dependencies and scripts
├── .gitignore                   # Git ignore rules
├── README.md                    # Project documentation
└── BRAND-COLORS.md              # Brand color palette

```

## Adding Content

### Create a New Page

1. Create an HTML file in `src/demo/` or `src/mockups/`
2. Include the header and footer:

```html
{% include "header.html" %}

<main class="container my-5">
  <!-- Your content here -->
</main>

{% include "footer.html" %}
```

3. The page will be automatically built to `dist/`

### Create a New Component Style

1. Create a new SCSS file in `src/styles/` (e.g., `_buttons.scss`)
2. Import it in `src/styles/main.scss`:

```scss
@import "buttons";
```

3. The styles will be compiled automatically

### Add Images

1. Place images in `src/assets/images/`
2. Reference them in HTML: `/assets/images/filename.png`

**Note:** The header and footer reference logo images that need to be added:
- `color-logo.png` (header logo)
- `unvlogo-white.png` (footer logo)

## Available npm Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with live reload |
| `npm run build` | Build the site for production |
| `npm run prod` | Alias for `npm run build` |
| `npm run dev:eleventy` | Run only Eleventy dev server |
| `npm run dev:sass` | Run only Sass watcher |
| `npm run build:eleventy` | Build only Eleventy |
| `npm run build:sass` | Build only Sass (minified) |

## Viewing the Site

### Development
- Local: `http://localhost:8080`
- Automatically reloads on file changes

### Production Build
Open `dist/index.html` in your browser or deploy the `dist/` folder to a web server.

## Deployment to GitHub Pages

1. Build the site: `npm run prod`
2. The `dist/` folder contains the deployable site
3. Configure GitHub Pages to serve from the `dist/` folder (or use a deployment action)

## Troubleshooting

### Port 8080 is already in use
Kill the process using port 8080 or specify a different port:
```powershell
npx @11ty/eleventy --serve --port=3000
```

### SCSS not compiling
Ensure Sass is installed:
```powershell
npm install sass
```

### Bootstrap styles not working
Check that Bootstrap is installed and imported in `main.scss`:
```powershell
npm install bootstrap
```

## Next Steps

1. **Add Logo Images**: Place the required logo files in `src/assets/images/`
2. **Customize Colors**: Edit `src/styles/_variables.scss` to adjust brand colors
3. **Create Components**: Add new component demos in `src/demo/`
4. **Build Mockups**: Create full page layouts in `src/mockups/`

## Resources

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Sass Documentation](https://sass-lang.com/documentation)
- [Project README](README.md) - Project overview and guidelines
- [Brand Colors](BRAND-COLORS.md) - Official color palette

## Support

For issues or questions about the design system, please contact the UChicago Library web team.
