---
applyTo: '**'
---

# GenAI Instructions for Brainstorm Mockups Project

## Overview
This project creates a design system documentation library with pure HTML/CSS component snippets. Zero build complexity. Zero JavaScript (unless absolutely necessary).

## ⚠️ IMPORTANT: Response Guidelines

**Answer ONLY what is asked:**
- If the user asks for information or clarification → Provide the answer ONLY, do not make changes
- If the user asks "Is there a way to...?" → Explain the approach, do not implement unless explicitly requested
- If the user asks "Can you...?" → Confirm you can, then wait for explicit approval before proceeding
- Do NOT offer additional changes, improvements, or "helpful" modifications beyond the specific request
- Do NOT create files, scripts, or documentation unless explicitly asked

**Make changes ONLY when:**
- User explicitly requests: "Create...", "Add...", "Update...", "Fix...", "Change..."
- User approves your proposed solution after you've explained it
- User says: "Yes", "Go ahead", "Do it", "Please proceed"

## 🎯 Core Principles

### ALWAYS Prioritize:
1. **Accessibility (WCAG AA minimum)**
   - Semantic HTML5 elements
   - ARIA labels and attributes where needed
   - Keyboard navigation support
   - Screen reader compatibility
   - Sufficient color contrast ratios
   - Alt text for all images
   - Focus indicators visible
   - `aria-current`, `aria-expanded`, `aria-controls` where appropriate

2. **Responsive Design (Mobile-First)**
   - Use Bootstrap's responsive utilities
   - Test breakpoints: mobile (<576px), tablet (≥768px), desktop (≥992px)
   - Collapsible navigation for mobile
   - Touch-friendly tap targets (min 44x44px)
   - Flexible images and media
   - Responsive typography

3. **Performance**
   - Lazy loading for images (`loading="lazy"`)
   - Minimal custom CSS/JS
   - Leverage Bootstrap's built-in features

## Critical Rules

### File Structure Understanding
1. **`/components`** = Web Components (reusable JavaScript components)
   - **`.js` files** = Web Components for reusability
   - **`.css` files** = Component styles (only if Bootstrap can't do it)
   
2. **`/demos`** = Full pages showcasing components
   - Complete HTML structure
   - Display component with variations
   - Show usage examples in `<pre><code>` blocks
   - Acts as design system documentation
   
3. **`/pages`** = Complete page mockups
   - Full page layouts
   - Compose multiple components

### Web Components Approach

- Components are reusable JavaScript classes
- Include script once, use many times with different content
- Each instance can have different attributes and content
- Update component once, all instances update automatically
- **Works without a server!** (opens with `file://`)

### Web Component Code Style

**Use `html` tagged template for better syntax highlighting:**
```javascript
// Add this helper at the top of component files
const html = (strings, ...values) => String.raw({ raw: strings }, ...values);

class MyComponent extends HTMLElement {
  connectedCallback() {
    const content = this.innerHTML.trim();
    
    // Use html`` instead of plain `` for better VSCode highlighting
    this.innerHTML = html`
      <div class="card">
        <div class="card-body">
          ${content}
        </div>
      </div>
    `;
  }
}
```

**Formatting Tips:**
- Use 2-space indentation inside template literals
- Put each HTML attribute on its own line for complex elements
- Include comments inside HTML templates
- Install VSCode extension "es6-string-html" for syntax highlighting

### Creating a New Component

**Step 1: Create Web Component**
```javascript
// components/card.js
class CardComponent extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'Card title';
    const content = this.textContent.trim();
    
    this.innerHTML = `
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${content}</p>
        </div>
      </div>
    `;
  }
}
customElements.define('card-component', CardComponent);
```

**Step 2: Create Demo Page**
- Copy `templates/demo-page.html` to `demos/card-demo.html`
- Include script: `<script src="../components/card.js"></script>`
- Show usage: `<card-component title="Title">Content</card-component>`
- Document available attributes

**Step 3: Update index.html**
- Add link to demo in "Component Demos" section

### CSS Loading Order (NEVER CHANGE THIS)
```html
<!-- 1. Bootstrap CDN -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- 2. UChicago Brand Font -->
<link rel="stylesheet" href="https://www.lib.uchicago.edu/web-resources/css/uchicagoSansSerif.css">
<!-- 3. Bootstrap Overrides (Brand Colors) -->
<link rel="stylesheet" href="../assets/css/custom-variables.css">
<!-- 4. Design System -->
<link rel="stylesheet" href="../assets/css/design-system.css">
<!-- 5. Component CSS (if needed) -->
<link rel="stylesheet" href="../components/your-component.css">
```

### Brand Guidelines (UChicago Library)

**Colors:**
- Primary: Maroon (#800000) - `--bs-primary` or `.bg-primary`
- Use Bootstrap semantic colors mapped to brand palette (see `BRAND-COLORS.md`)
- Reference: All brand colors available as CSS variables (`--brand-maroon`, `--brand-ivy`, etc.)

**Typography:**
- Font: 'UChicago Sans Serif' (loaded from CDN)
- Fallbacks: system-ui fonts
- Headings: Maroon color
- Body: Black text on white background

**Assets:**
- Logo (white, for dark backgrounds): `https://www.lib.uchicago.edu/web-resources/img/white-logo.png`
- Logo (color, for light backgrounds): `https://www.lib.uchicago.edu/web-resources/img/color-logo.png`
- Favicon: Located at `./assets/images/favicon.svg` (maroon with rounded corners)

**Navbar:**
- Use `navbar-component` with hardcoded branding
- Background: Maroon (`bg-primary`)
- Logo: White version on maroon
- Brand text: "Library"

### CSS Creation Priority
1. **First**: Can Bootstrap classes do this? → Use them
2. **Second**: Is this in `design-system.css`? → Use it
3. **Last Resort**: Create custom CSS in component file

### Path Handling
- **Components**: `../assets/css/...` (components are in subfolder)
- **Pages**: `../assets/css/...` (pages are in subfolder)
- **Root files**: `./assets/css/...` (root level)

### Forbidden Actions
- ❌ NO build tools (npm, webpack, vite, etc.)
- ❌ NO server-side code
- ❌ NO CSS preprocessors (SASS/LESS)
- ❌ NO JavaScript frameworks (React/Vue/Angular)
- ❌ NO module imports/exports
- ❌ NO package managers
- ❌ NO modifying Bootstrap source files
- ❌ NO unnecessary JavaScript outside of Web Components
  - Don't write JavaScript for animations (use CSS)
  - Don't write JavaScript for navigation (use `<a>` links)
  - Don't write JavaScript for simple interactivity (use Bootstrap data attributes)
  - Don't write JavaScript for state changes (use CSS pseudo-classes)

### Required Actions
- ✅ Use Bootstrap utilities first
- ✅ Check design-system.css before creating CSS
- ✅ Create Web Components for all reusable UI elements
- ✅ Create demo pages to showcase components
- ✅ Update index.html after creating component demo
- ✅ Use semantic HTML5 within Web Components
- ✅ Add comments in Web Component code explaining attributes and usage
- ✅ Prefer CSS over JavaScript for visual effects
- ✅ Use Bootstrap data attributes for interactivity (modals, dropdowns, tabs)
- ✅ Web Components are the standard for all components
- ✅ Test by opening HTML directly in browser (no server needed)
- ✅ **EVERY component MUST be responsive** (mobile-first approach)
- ✅ **EVERY component MUST be accessible** (WCAG AA minimum)
- ✅ Include ARIA labels, keyboard navigation, and semantic HTML
- ✅ Test components at mobile, tablet, and desktop breakpoints
- ✅ Use Bootstrap's responsive utilities (d-none, d-md-block, etc.)
- ✅ Ensure touch targets are at least 44x44px on mobile

## File Locations
- **Web Components**: `components/component-name.js` (all components are Web Components)
- **Component CSS**: `components/component-name.css` (only if Bootstrap can't do it)
- **Component Demos**: `demos/component-name-demo.html` (full page showcasing component)
- **Full Pages**: `pages/page-name.html` + `pages/page-name.css` (optional)
- **Templates**: 
  - `templates/component-web-component.js` (for new Web Components)
  - `templates/demo-page.html` (for new demo pages)
  - `templates/base.html` (for new full pages)
- **Shared CSS**: `assets/css/` (don't create new files here without asking)

## After Creating Files
1. Test Web Component by opening demo page in browser
2. Verify component works with different attributes and content
3. **Test responsiveness** - resize browser to mobile, tablet, desktop sizes
4. **Test accessibility** - verify keyboard navigation, screen reader support, ARIA attributes
5. Update `index.html` with link to demo
6. Document any lessons learned in README.md if significant

## Accessibility Checklist (EVERY Component)
- ✅ Use semantic HTML (`<nav>`, `<button>`, `<header>`, etc.)
- ✅ Include ARIA attributes where needed (`aria-label`, `aria-controls`, `aria-expanded`, `aria-current`)
- ✅ Ensure keyboard navigation works (Tab, Enter, Esc)
- ✅ Provide alt text for images
- ✅ Use sufficient color contrast (test with brand colors)
- ✅ Include visible focus indicators
- ✅ Label form inputs properly
- ✅ Use heading hierarchy correctly (h1, h2, h3...)
- ✅ Test with screen reader if possible

## Responsive Design Checklist (EVERY Component)
- ✅ Mobile-first approach (design for small screens first)
- ✅ Test at breakpoints: <576px (mobile), ≥768px (tablet), ≥992px (desktop)
- ✅ Use Bootstrap responsive utilities (`d-none d-md-block`, `col-md-6`, etc.)
- ✅ Collapsible content for mobile (use Bootstrap collapse/navbar-toggler)
- ✅ Touch targets minimum 44x44px on mobile
- ✅ Readable font sizes on all devices
- ✅ Images scale properly (`img-fluid` class or max-width: 100%)
- ✅ No horizontal scrolling on mobile

## Questions to Ask Before Creating CSS
1. Can Bootstrap do this with existing classes?
2. Is this pattern in design-system.css?
3. Is this truly custom, or am I reinventing Bootstrap?
4. Can I achieve this with pure CSS instead of JavaScript?

## Example Component Creation
```powershell
# Create Web Component
Copy-Item templates\component-web-component.js components\my-button.js

# Edit my-button.js:
# - Update class name and customElements.define()
# - Handle attributes (variant, size, etc.)
# - Build component HTML in connectedCallback()

# Create demo page
Copy-Item templates\demo-page.html demos\my-button-demo.html

# Edit demo page:
# - Include script: <script src="../components/my-button.js"></script>
# - Show component with different attributes
# - Display usage examples in <pre><code>
# - Document available attributes

# Only if Bootstrap can't do it:
New-Item components\my-button.css
# - Add comments explaining why custom CSS is needed

# Update index.html:
# - Add link in demos section (to view demo page)
```

## JavaScript Guidelines

### When to Avoid JavaScript (99% of cases)
- **Animations**: Use CSS transitions and keyframes
- **Navigation**: Use `<a href="page.html">` links
- **Hover effects**: Use `:hover` pseudo-class
- **Show/hide**: Use Bootstrap collapse with data attributes
- **Tabs**: Use Bootstrap tabs with data attributes
- **Modals**: Use Bootstrap modals with data attributes
- **Dropdowns**: Use Bootstrap dropdowns with data attributes

### When JavaScript is Allowed (rare exceptions)
- Bootstrap component requires initialization AND data attributes aren't enough
- Complex behavior that's impossible with CSS and critical to demo
- **Always document why JavaScript was necessary**

### Example: Prefer This (No JS)
```html
<!-- Bootstrap Modal - No JavaScript needed -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Open Modal
</button>

<div class="modal fade" id="exampleModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
    </div>
  </div>
</div>
```

### Not This (Unnecessary JS)
```html
<!-- DON'T DO THIS -->
<button onclick="openModal()">Open Modal</button>
<script>
  function openModal() {
    // ... JavaScript to show modal
  }
</script>
```

---

**Read the full README.md for complete project documentation.**