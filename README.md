# Brainstorm Mockups

GenAI-friendly mockup sandbox: static HTML/CSS/vanilla JS, no build tools, open directly in the browser.

## Purpose
- Local-only prototyping; never deployed
- CDN-loaded dependencies; zero compilation
- Reusable Web Components plus demo pages

## Structure
- `index.html` — navigation hub
- `assets/css/` — fonts, Bootstrap overrides, design system
- `components/` — Web Components (JS + optional CSS)
- `demos/` — full pages showcasing components
- `pages/` — full-page mockups
- `templates/` — base.html, demo-page.html, component-web-component.js

## How to Work
1. Open `index.html` in a browser (or run `python -m http.server 8000` for localhost)
2. Create a component:
   - Copy `templates/component-web-component.js` → `components/my-component.js`
   - (Optional) Copy `templates/demo-page.html` → `demos/my-component-demo.html`
   - Add optional CSS only if Bootstrap or design-system cannot cover it
   - Update `index.html` to link the demo
3. Create a page: copy `templates/base.html` → `pages/my-page.html`; add CSS only if needed

## CSS Loading Order (Keep This)
1. Bootstrap CDN
2. `assets/css/fonts.css`
3. `assets/css/custom-variables.css`
4. `assets/css/design-system.css`
5. Component or page CSS (only if required)

## Web Component Customization
**Currently: Components render fixed default content.** Customizing component instances via attributes or children is not yet supported—the complexity of state management in Web Components without a framework proved too difficult to resolve. Future versions may add this capability.

## Keep It Simple
- Use Bootstrap utilities first; avoid custom CSS unless necessary
- Prefer HTML/CSS and Bootstrap data attributes over JavaScript
- Web Components should render just the component markup (no page layout)
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