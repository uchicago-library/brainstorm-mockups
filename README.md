# Design System Documentation Site

A static site for documenting and demonstrating a design system, built with **Eleventy**, **Bootstrap 5 (SCSS)**, and **FontAwesome**. Designed to be hosted on **GitHub Pages** with minimal dependencies and maximum reusability.
- Demonstrates reusable components (buttons, forms, etc.)
- Provides demo and mockup pages
- Uses **Bootstrap 5 (SCSS)** for styling, with custom overrides
- Uses **FontAwesome** for icons
- Is **static** and requires no backend
- Is optimized for **GitHub Pages** deployment
- Also a test to see if we can use this to run quick genAI brainstroming mockups.

## 📦 Project Structure
```
project-root/
├── src/
│   ├── _includes/          # HTML partials (header, footer, etc.)
│   ├── styles/             # SCSS files
│   │   ├── _variables.scss # Bootstrap variable overrides, design tokens
│   │   ├── base/           # Base/foundational styles
│   │   │   ├── _global.scss # Global element overrides
│   │   │   └── layout/     # Layout utilities and spacing
│   │   │       └── _layout.scss
│   │   ├── components/     # Component-specific styles
│   │   │   ├── _header.scss # Header component
│   │   │   ├── _footer.scss # Footer component
│   │   │   └── _*.scss     # Additional components as needed
│   │   └── main.scss       # Main SCSS entry point (imports everything)
│   ├── design_system/      # Demo pages (HTML)
│   ├── design_mockups/     # Mockup pages (HTML)
│   ├── pages/              # (Optional) Reusable page-level layouts and patterns
│   └── index.html          # Homepage
├── docs/                   # Built site (deployed to GitHub Pages)
├── package.json            # NPM scripts and dependencies
└── .eleventy.js            # Eleventy configuration
```

> **Note:** The `pages/` folder may be created in the future if reusable page-level patterns and layouts need to be shared across multiple pages.

```

## 🛠 Setup Instructions

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later)
- NPM (comes with Node.js)

### 2. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```
- This will start Eleventy's dev server with live reload and watch for SCSS changes.

### 5. Build for Production
```bash
npm run prod
```
- This generates the `docs/` folder, which is ready for deployment.


## 🎨 Design System

This repo aims at structuring, demoeing, and documenting the UChicago Library Design System. For more information about it, consult the [planning document](https://uchicago.box.com/s/jf05ybrn63rgky5f66j8uhms6ljr26ez) (work in progress).

### Design Tokens

Design token are SCSS and CSS variables. Their structure allows to easily update the whole styling (for example, brighten the primary color). They are loosely organized into three levels of abstraction.
- **Level 1**: Core Brand/utility (foundational) `primary, secondary, red-500, gray-200`
- **Level 2**: Semantic Generic roles
(reusable)
`background, text-muted, border-subtle`
- **Level 3**: Component Component/ role-specific `btn-primary-bg, search-placeholder-text`
```
scss/
├── _variables.scss # Level 1 & 2 tokens
├── _components.scss # Level 3 tokens + component styles
├── _utilities.scss # Custom utilities (if needed)
└── main.scss # Imports everything
```
Consider using CSS classes when a value is prone to be changed, like dark-light themes.

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
| Dependency       | Version   | Purpose                          |
|------------------|-----------|----------------------------------|
| Eleventy         | 2.0.1     | Static site generator            |
| Bootstrap        | 5         | CSS framework (SCSS)             |
| FontAwesome      | 5         | Icons (CDN or self-hosted)       |
| Sass             | Latest    | SCSS compilation                 |

## 📄 License
MIT License. See [LICENSE](LICENSE) for details.
