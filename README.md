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
│   │   ├── _variables.scss # Bootstrap variable overrides
│   │   ├── _buttons.scss   # Custom button styles
│   │   └── main.scss       # Main SCSS entry point
│   ├── demo/               # Demo pages (HTML)
│   ├── mockups/            # Mockup pages (HTML)
│   └── index.html          # Homepage
├── dist/                   # Built site (deployed to GitHub Pages)
├── package.json            # NPM scripts and dependencies
└── .eleventy.js            # Eleventy configuration
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
- This generates the `dist/` folder, which is ready for deployment.


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
- Demo pages (`src/demo/`) showcase individual styles, elements, and components in isolation, as well as finalized pages.
- Mockup pages (`src/mockups/`) to brainstorm and experiment with page layouts using the design system.

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
1. **Create a new SCSS file** in `src/styles/` (e.g., `_cards.scss`).
2. **Import it** in `main.scss`:
   ```scss
   @import "cards";
   ```
3. **Create a demo page** in `src/demo/` or `src/mockups/` to showcase the component.

### Adding a New Page
1. **Create a new HTML file** in `src/demo/` or `src/mockups/`.
2. **Include reusable components** (header/footer) using Eleventy's `include` tag:
   ```html
   {% include "header.html" %}
   ```

### Customizing Bootstrap
- Override Bootstrap variables in `src/styles/_variables.scss`:
  ```scss
  $primary: #your-brand-color;
  $body-bg: #f8f9fa;
  ```
- Use Bootstrap's [SCSS documentation](https://getbootstrap.com/docs/5.3/customize/overview/) for reference.


## 🔧 Dependencies
| Dependency       | Version   | Purpose                          |
|------------------|-----------|----------------------------------|
| Eleventy         | Latest    | Static site generator            |
| Bootstrap        | Latest    | CSS framework (SCSS)             |
| FontAwesome      | Latest    | Icons (CDN or self-hosted)       |
| Sass             | Latest    | SCSS compilation                 |

## 📄 License
MIT License. See [LICENSE](LICENSE) for details.
