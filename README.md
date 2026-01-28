# Design System Documentation Site

A static site for documenting and demonstrating a design system, built with **Eleventy**, **Bootstrap 5 (SCSS)**, and **FontAwesome**. Designed to be hosted on **GitHub Pages** with minimal dependencies and maximum reusability.
- Demonstrates reusable components (buttons, forms, etc.)
- Provides demo and mockup pages
- Uses **Bootstrap 5 (SCSS)** for styling, with custom overrides
- Uses **FontAwesome** for icons
- Is **static** and requires no backend
- Is optimized for **GitHub Pages** deployment

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

## 📝 Usage Guidelines
- Branding variables (e.g., colors, typography) are defined in `src/styles/_variables.scss` and override Bootstrap’s default variables.
- Elements like buttons, forms, inputs are styled using Bootstrap’s utility classes and custom SCSS.
   - Custom classes should only be added when necessary (e.g., `.btn-brand` for branded buttons).
   - Each bespoke element (e.g., buttons, cards) has its own SCSS file in `src/styles/` (e.g., `_buttons.scss`, `_forms.scss`).
- Global components (e.g., header, footer) are defined as HTML partials in `src/_includes/` (e.g., `header.html`, `footer.html`).
   - Markup: Dedicated HTML partial files.
   - Styling: Follows the same SCSS structure as elements (separate files in `src/styles/`).
- Demo pages (`src/demo/`) showcase individual styles, elements, and components in isolation.
- Mockup pages (`src/mockups/`) simulate real-world page layouts using the design system.


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