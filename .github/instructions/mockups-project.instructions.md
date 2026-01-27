---
applyTo: '**'
---

# GenAI Instructions: Brainstorm Mockups Project

## Overview
Static HTML/CSS component library for UChicago Library design system. Zero build tools. Web Components + Bootstrap. No JavaScript unless absolutely necessary.

## Quality Requirements
Every component must be:
- **Accessible**: Semantic HTML, ARIA attributes, keyboard navigation (WCAG AA)
- **Responsive**: Mobile-first; test at <576px, ≥768px, ≥992px
- **Low-maintenance**: Bootstrap-first; minimal custom code

## Required / Forbidden

### ✅ Required
- Web Components (reusable JS classes)
- Bootstrap utilities before custom CSS
- Semantic HTML5 + ARIA
- Demo pages for each component
- Test in browser without server

### ❌ Forbidden
- Build tools (npm, webpack, vite, sass)
- Server-side code or databases
- JavaScript frameworks (React, Vue, Angular)
- Custom CSS/JS when Bootstrap can do it
- Module imports/exports

## File Structure
```
components/          → Web Components (component-name.js + optional .css)
demos/              → Demo pages (component-name-demo.html)
pages/              → Full-page mockups
templates/          → Base templates
assets/css/         → Shared styles only
```

## CSS Loading Order (DO NOT CHANGE)
1. Bootstrap CDN
2. UChicago fonts CDN
3. custom-variables.css (overrides)
4. design-system.css
5. Component CSS (if needed)

## Web Component Pattern
```javascript
class MyComponent extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'default';
    const content = this.textContent.trim();
    
    this.innerHTML = `
      <div class="card">
        <h5>${title}</h5>
        <p>${content}</p>
      </div>
    `;
  }
}
customElements.define('my-component', MyComponent);
```

## Brand Guidelines
- **Primary color**: Maroon (#800000) = `--bs-primary`
- **Logo**: White version on dark backgrounds
- **Font**: 'UChicago Sans Serif' (CDN)
- **All colors as CSS variables** in custom-variables.css

## JavaScript Rules
✅ **Use JavaScript for:**
- Web Components only (for reusability)

❌ **Do NOT use JavaScript for:**
- Navigation (use `<a href>` links)
- Animations (use CSS)
- Show/hide (use Bootstrap collapse)
- Dropdowns, tabs, modals (Bootstrap handles these)

## Path References
- From components/demos: `../assets/css/...`
- From root: `./assets/css/...`

## When Creating a Component
1. Copy `templates/component-web-component.js` → `components/name.js`
2. Copy `templates/demo-page.html` → `demos/name-demo.html`
3. Create `components/name.css` ONLY if Bootstrap can't style it
4. Update `index.html` with demo link
5. Test in browser (responsive + accessible)
