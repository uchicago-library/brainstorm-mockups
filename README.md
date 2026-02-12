# UChicago Library Design System Documentation

A static site for documenting and demonstrating the University of Chicago Library design system, built with **Eleventy**, **Bootstrap 5 (SCSS)**, and **FontAwesome**. Designed to be hosted on **GitHub Pages** with minimal dependencies and maximum reusability.

## 🎯 Purpose
- **Component Library**: Demonstrates reusable UI components (buttons, forms, cards, etc.)
- **Design Documentation**: Style guide with colors, typography, and spacing
- **Development Guide**: Methodology and best practices for contributors
- **Copy-Paste Ready**: All code can be directly integrated into other projects
- **Static & Fast**: No backend required; optimized for GitHub Pages
- **Accessibility First**: WCAG 2.1 Level AA compliant

## 📅 Status
**Work in Progress** — Aimed to be stabilized for ongoing development by **August 2026**.

## � Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later)
- NPM (comes with Node.js)

### Installation
```bash
git clone <your-repo-url>
cd brainstorm-mockups
npm install
npm run dev
```

Open `http://localhost:8080` in your browser.

### Build for Production
```bash
npm run prod
```

The `docs/` folder is ready to deploy to GitHub Pages.

**For detailed setup instructions, see [Methodology → Setup](./src/methodology/setup.html).**


## 🎨 Design System Overview

Includes:
- Design Tokens
- Components
- Patterns
- Pages
- Experimental Mockups

To know more, see [System Architecture](./src/methodology/system-architecture.html).

## 🚀 Future: Multi-Platform Support

This design system is architected to support distribution across multiple platforms with varying CSS footprints:

### Vision
- **Main output** (`main.scss`): Full design system with all components and Bootstrap modules
- **Platform-specific outputs** (1–2): `libguides.scss`, `satellite.scss`, etc. for platforms with custom CSS needs
- **Minimal output**: Lightweight build for ~10 small platforms that need only core styles (variables, base, Bootstrap utilities)

### Implementation Strategy
When multi-platform support is needed:

1. **Create platform-specific entry points** in `src/styles/`:
   ```
   src/styles/
   ├── main.scss              # Full design system
   ├── libguides.scss         # LibGuides-specific (selective imports)
   ├── minimal.scss           # Minimal for small platforms
   └── _variables.scss
   ```

2. **Selectively import Bootstrap modules** per platform:
   ```scss
   // minimal.scss - lightweight output
   @import "variables";
   @import "../../node_modules/bootstrap/scss/functions";
   @import "../../node_modules/bootstrap/scss/variables";
   @import "../../node_modules/bootstrap/scss/utilities/api";
   // Only utilities, no components—saves ~100KB
   ```

3. **Update build script** to generate multiple CSS files:
   ```json
   "build:sass": "sass src/styles/main.scss:docs/styles/main.css src/styles/libguides.scss:docs/styles/libguides.css src/styles/minimal.scss:docs/styles/minimal.css"
   ```

### Future JavaScript Consideration
If selective Bootstrap module imports become standard, also consider:
- Bundling platform-specific Bootstrap JS modules (if needed)
- Creating lightweight JS entry points for minimal platforms
- Documenting which Bootstrap JS components each platform requires

## 🔧 Dependencies
as of 2026-feb-11
| Dependency       | Version   | Purpose                          |
|------------------|-----------|----------------------------------|
| Eleventy         | 2.0.1+    | Static site generator            |
| Bootstrap        | 5.3.2+    | CSS framework (SCSS)             |
| Sass             | 1.69.5+   | SCSS compilation                 |
| FontAwesome      | CDN       | Icons (via CDN or self-hosted)   |

## 📄 License
MIT License. See [LICENSE](LICENSE) for details.
