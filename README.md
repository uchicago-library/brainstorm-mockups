# Brainstorming Mockups

A GenAI-powered mockup development environment for rapid prototyping of UI components and pages without complex build processes.

## 📋 Table of Contents

- [Purpose](#purpose)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Strategies](#development-strategies)
- [Restrictions & Guidelines](#restrictions--guidelines)
- [Lessons Learned](#lessons-learned)
- [Architecture & Design Decisions](#architecture--design-decisions)
- [GenAI Development Best Practices](#genai-development-best-practices)

---

## Purpose

This repository serves as a simple, local-only testing ground where GenAI can generate mockups of pages and components with zero complexity overhead:

✅ **No server required** - Open HTML files directly in browser  
✅ **No compilation** - Pure HTML, CSS, and vanilla JavaScript  
✅ **No backend** - Static files only (no auth, database, or file uploads)  
✅ **CDN-based** - All dependencies loaded via CDN  
✅ **Isolated components** - Each component/page lives in its own files  

This project will **never** be published to a production server.

---

## Project Structure

```
brainstorm-mockups/
├── index.html                    # Main navigation/index page
├── README.md                     # This file
├── LICENSE
├── .gitignore
│
├── assets/
│   ├── css/
│   │   ├── fonts.css            # Custom font declarations
│   │   ├── custom-variables.css # Bootstrap variable overrides
│   │   └── design-system.css    # Production design system
│   └── images/                   # (future) Image assets
│
├── components/                   # WEB COMPONENTS
│   ├── component-name.js         # Web Component (reusable JavaScript class)
│   └── component-name.css        # Component-specific styles (if needed)
│
├── demos/                        # COMPONENT DEMONSTRATIONS
│   └── component-demo.html       # Full page showcasing a component
│
├── pages/                        # FULL PAGE MOCKUPS
│   ├── page-name.html            # Complete page layout
│   └── page-name.css             # Page-specific styles (if needed)
│
└── templates/
    ├── base.html                 # Template for full pages
    ├── demo-page.html            # Template for component demos
    └── component-web-component.js # Template for Web Components
```

### Understanding the Structure

1. **`/components`** - Web Components (reusable JavaScript classes)
   - **JavaScript files** (`.js`) = All components are Web Components
     - Reusable across pages with different content
     - Update once, changes everywhere
     - Works without a server! (opens with `file://`)
     - Use attributes for variants (size, color, etc.)
     - Get content from element's `textContent`
     - Example: `<example-button>Click Me</example-button>`

2. **`/demos`** - Full pages to demonstrate components
   - Complete HTML pages with proper structure
   - Show component variations and usage examples
   - Include HTML snippets in `<pre><code>` tags
   - Explain when to use Bootstrap vs custom CSS
   - Acts as design system documentation

3. **`/pages`** - Complete page mockups
   - Full page layouts composing multiple components
   - May include multiple components from `/components`
   - Representative of actual application pages
   - Good for stakeholder demos

---

## Getting Started

### Opening the Project

1. Clone this repository
2. Open `index.html` in your browser (double-click or right-click → Open with browser)
3. Navigate to component demos or pages

### Creating a New Web Component

**All components in this project use Web Components for reusability.**

### Creating a Reusable Web Component

1. Copy `templates/component-web-component.js` to `components/your-component.js`
2. Copy `templates/demo-page.html` to `demos/your-component-demo.html`
3. Edit the component class (attributes, markup) and the demo examples
4. Update `index.html` to link to the new demo page
5. Create `components/your-component.css` **only if** Bootstrap or `design-system.css` cannot cover the styling

**Example Web Component (`components/alert-box.js`):**
```javascript
class AlertBox extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'info';
    const content = this.textContent.trim();
    
    this.innerHTML = `
      <div class="alert alert-${variant}" role="alert">
        ${content}
      # Brainstorming Mockups

      GenAI-friendly mockup sandbox: static HTML/CSS/vanilla JS, no build tools, open directly in the browser.

      ## Purpose
      - Local-only prototyping; never deployed
      - CDN-loaded dependencies; zero compilation
      - Reusable Web Components plus demo pages

      ## Structure
      - index.html — navigation hub
      - assets/css — fonts, Bootstrap overrides, design system
      - components/ — Web Components (JS + optional CSS)
      - demos/ — full pages showcasing components
      - pages/ — full-page mockups
      - templates/ — base.html, demo-page.html, component-web-component.js

      ## How to work
      1) Open `index.html` in a browser (or run `python -m http.server 8000` if you prefer localhost).
      2) Create a component:
         - Copy `templates/component-web-component.js` → `components/my-component.js`
         - (Optional) Copy `templates/demo-page.html` → `demos/my-component-demo.html`
         - Add optional CSS only if Bootstrap or design-system cannot cover it
         - Update `index.html` to link the demo
      3) Create a page: copy `templates/base.html` → `pages/my-page.html`; add `pages/my-page.css` only if needed.

      ## CSS loading order (keep this)
      1. Bootstrap CDN
      2. assets/css/fonts.css
      3. assets/css/custom-variables.css
      4. assets/css/design-system.css
      5. Component or page CSS (only if required)

      ## Keep it simple
      - Use Bootstrap utilities first; avoid custom CSS unless necessary
      - Prefer HTML/CSS and Bootstrap data attributes over JavaScript
      - Web Components should render just the component markup (no page layout)

      ## See also
      - QUICKSTART.md for command snippets
      - CHANGELOG.md for notable updates
      - LICENSE for licensing