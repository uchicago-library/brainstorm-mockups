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

This documentation site serves the **UChicago Library Design System** which is based on official brand guidelines. It includes:

- **Design Principles** ([View](./src/design_system/design-principles.html)): Nielsen's usability heuristics and WCAG 2.1 accessibility standards
- **Color Palette** ([View](./src/design_system/color-palette.html)): Official brand colors with semantic mappings
- **Component Library** ([View](./src/design_system/)): Reusable components (buttons, forms, cards, etc.)
- **Development Guide** ([View](./src/methodology/)): Best practices for building and extending the system
- **Page Mockups** ([View](./src/design_mockups/)): Full-page layouts demonstrating how components work together

**Design Tokens**: Colors, typography, spacing, shadows, and other design tokens are defined as SCSS/CSS variables for easy system-wide updates.

### Design Atomization
Examples.
#### A. Design Tokens
Design Tokens will be mostly defined by Bootstrap with our customizing overrides.
- Colors (primary, secondary, neutrals, semantic colors)
- Typography (font families, weights, sizes, line heights)
- Spacing (margins, paddings, gaps)
- Shadows, borders, radii
- Transitions, animations
#### B. Components
- Buttons (primary, secondary, tertiary, sizes, states, specific)
   - Search button
   - Dropdown
   - Subject (tag/badge/pill)
   - Clickable headings
- Forms (inputs, selects, checkboxes, radios, validation states)
   - Search input
- Navigation (headers, footers, breadcrumbs, menus)
- Cards, thumbnails, accordions, modals, tooltips, panels(book a room)
- Tables, lists, pagination, tabs
- Icons (Font Awesome usage guidelines)
- Utility classes (for spacing, alignment, etc.)
- All Wagtail body blocks (streamfield blocks)
- All Wagtail Widgets?
   - Search Widget
   - Quicklinks
   - Auto-generated Sitemap
   - Granular hours
   - Banner
   - Workshops and Events
   - News
   - Find Spaces
   - Featured Collection
   - Rich Text
   - Carousel items
   - Custom Icon Links
   - Reusable Content Blocks
   - Featured Expert Link*
   - Featured library expert fallback
   - Featured library experts
   - CGIMail Form
   - Social media
#### C. Patterns 
Components that may contain other components or likely page specific.
- AAL chat
- Main Search box
- Home page widgets
- Sidebar widgets, quick links, 
- Left sidebar secondary navigation
- Listings
      - Staff listing, org chart, subjects listing, exhibits listing, collections listing, 
      - Catalog item listing
      - Events Listing
      - Search results listing
#### D. Layouts and Templates
- Grid system (Bootstrap’s grid, custom breakpoints)
- Page templates (all page types)
- Responsive behaviors
- Graphical Landing pages, CDS, SCRC, Exhibits
- Services, buildings? (if we end up making a list of services and resources as a data type)
#### E. Documentation
- Design principles and guidelines
- Usage examples (when to use what)
- Contribution guidelines (how to add/update components)
- Bootstrap customization (SCSS variables, overrides)
- Font Awesome usage (icons, sizing, customization)


## 📝 Usage Guidelines
- Branding variables (e.g., colors, typography) are defined in `src/styles/_variables.scss` and override Bootstrap’s default variables.
- Elements like buttons, forms, inputs are styled using Bootstrap’s utility classes and custom SCSS.
   - Custom classes should only be added when necessary (e.g., `.btn-brand` for branded buttons).
   - Each bespoke element (e.g., buttons, cards) has its own SCSS file in `src/styles/` (e.g., `_buttons.scss`, `_forms.scss`).
- Global components (e.g., header, footer) are defined as HTML partials in `src/_includes/` (e.g., `header.html`, `footer.html`).
   - Markup: Dedicated HTML partial files.
   - Styling: Follows the same SCSS structure as elements (separate files in `src/styles/`).
- Demo pages (`src/design_system/`) showcase individual styles, elements, and components in isolation, as well as finalized pages.
- Mockup pages (`src/design_mockups/`) to brainstorm and experiment with page layouts using the design system.

### BEM (Block–Element–Modifier) Naming convention
Having a naming convention can make it much easier to learn the system and find out where to make changes.
`.block__elem—mod`
1.	**Layout rules** (columns, grids used across templates)
	Don’t BEM these. They’re structural, not semantic. Use utilities from BS.
2.	**Bespoke components** (search box, news thumbnail, quick-links box)
	Perfect BEM territory.
3.	**Custom one-off elements** (like a specific spacer)
	Don’t force BEM here. Use utilities for spacing, sizing, or alignment.


### Adding a New Component

1. **Create a new SCSS file** in the appropriate `src/styles/` subfolder:
   - **For components** (buttons, cards, search boxes, etc.): Create `src/styles/components/_component-name.scss`
   - **For layout utilities**: Add to `src/styles/base/layout/_layout.scss` or create a new file in `src/styles/base/layout/`
   - **For global styles**: Add to `src/styles/base/_global.scss`

   Example: For a new "card" component:
   ```bash
   # Create the file
   src/styles/components/_cards.scss
   ```

2. **Import the new file** in `src/styles/main.scss`:
   ```scss
   // In the components section:
   @import "components/cards";
   
   // Or if adding a new layout file:
   @import "base/layout/layout-name";
   ```

3. **Follow naming conventions**:
   - File names: `_component-name.scss` (lowercase, kebab-case, with underscore prefix)
   - Class names: Use BEM convention for bespoke components (e.g., `.card__header—primary`)
   - Or use Bootstrap utilities for simple styling (no BEM needed)

4. **Create a demo page** in `src/design_system/` to showcase the component:
   ```html
   <!-- src/design_system/components/cards.html -->
   {% include "header.html" %}
   
   <main class="container">
     <h1>Cards Component</h1>
     <!-- Show examples here -->
   </main>
   
   {% include "footer.html" %}
   ```

5. **The build system will automatically**:
   - Compile your SCSS to CSS
   - Include it in the main stylesheet
   - Hot-reload your changes during development

### Adding a New Page
1. **Create a new HTML file** in `src/design_system/` or `src/design_mockups/`.
2. **Include reusable components** (header/footer) using Eleventy's `include` tag:
   ```html
   {% include "header.html" %}
   ```
3. **If creating reusable page patterns:** If you notice page-level patterns or layouts being reused across multiple pages, create a `src/pages/` folder to store shared page layouts and templates for future scaling.

### Customizing Bootstrap
- Override Bootstrap variables in `src/styles/_variables.scss`:
  ```scss
  $primary: #your-brand-color;
  $body-bg: #f8f9fa;
  ```
- Use Bootstrap's [SCSS documentation](https://getbootstrap.com/docs/5.3/customize/overview/) for reference.

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
