---
applyTo: '**'
---

# GenAI Instructions for Brainstorm Mockups Project

## Overview
This project creates a design system documentation library with pure HTML/CSS component snippets. Zero build complexity. Zero JavaScript (unless absolutely necessary). Low-maintenance, accessible, responsive design.

## ⚠️ CRITICAL: Workflow & Response Rules

### Response Style
- **Be concise**: No verbose explanations, no "Next steps" sections
- **Answer only what's asked**: Don't offer unsolicited improvements
- **Challenge bad practices**: Point out accessibility issues, non-responsive designs, high-maintenance solutions, overengineering
- **After completing work**: Briefly confirm what was done, then stop

### When to Act vs. Wait
- **Information request** → Answer only, make NO changes
- **"Is there a way...?"** → Explain approach, don't implement unless explicitly requested
- **"Can you...?"** → Confirm capability, wait for approval
- **Explicit request** ("Create...", "Add...", "Update...", "Fix...") → Implement immediately
- **After approval** ("Yes", "Go ahead", "Do it", "Please proceed") → Implement immediately

### Mandatory Workflow
1. **Analyze**: Gather context (read files, check existing code)
2. **Propose**: If complex, show what will be done (brief summary only)
3. **Implement**: Make changes efficiently (batch related edits)
4. **Commit**: Always commit with brief message after completing work

### Git Commits (REQUIRED)
- ✅ Commit ALL changes after completing work
- ✅ Use brief, descriptive messages (e.g., "Add card component with demo")
- ✅ Batch related changes into single commit
- ❌ Never leave uncommitted changes

## 🎯 Quality Requirements

**Every component MUST be:**
1. **Accessible** (WCAG AA): Semantic HTML, ARIA attributes, keyboard navigation, screen reader compatible
2. **Responsive** (mobile-first): Test at <576px, ≥768px, ≥992px breakpoints
3. **Low-maintenance**: Use Bootstrap first, avoid custom code, no build tools

**Challenge requests that:**
- ❌ Skip accessibility (missing ARIA, non-semantic HTML, no keyboard support)
- ❌ Ignore responsiveness (fixed widths, no mobile testing, tiny tap targets <44px)
- ❌ Add unnecessary complexity (custom CSS/JS when Bootstrap exists, build tools, frameworks)
- ❌ Create high-maintenance code (non-standard patterns, heavy customization)

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

### Forbidden (High-Maintenance / Overengineering)
- ❌ Build tools (npm, webpack, vite, etc.)
- ❌ Server-side code
- ❌ CSS preprocessors (SASS/LESS)
- ❌ JavaScript frameworks (React/Vue/Angular)
- ❌ Module imports/exports
- ❌ Package managers
- ❌ Modifying Bootstrap source files
- ❌ JavaScript when CSS/Bootstrap can do it (animations, navigation, hover, show/hide, tabs, modals, dropdowns)

### Required (Low-Maintenance / Standard)
- ✅ Bootstrap utilities first, then design-system.css, then custom CSS (in that order)
- ✅ Web Components for reusable UI (see templates)
- ✅ Demo pages for each component (update index.html)
- ✅ Semantic HTML5 + ARIA attributes
- ✅ Bootstrap data attributes for interactivity
- ✅ Test: Open HTML in browser (no server), check mobile/tablet/desktop breakpoints
- ✅ Commit changes after completing work

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
1. Test in browser (open HTML directly, no server)
2. Test responsiveness (resize to <576px, ≥768px, ≥992px)
3. Test accessibility (keyboard navigation, ARIA, semantic HTML)
4. Update `index.html` with link to demo
5. Commit all changes with brief message

## Pre-Implementation Checklist
**Before writing any code, verify:**
1. Can Bootstrap do this? (check utilities, components)
2. Is this in design-system.css? (read file if uncertain)
3. Can CSS do this instead of JavaScript?
4. Is this accessible? (semantic HTML, ARIA, keyboard nav)
5. Is this responsive? (mobile-first, Bootstrap utilities)
6. Is this low-maintenance? (standard patterns, minimal custom code)

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

## Common Mistakes to Avoid

### Mistake: Creating custom CSS when Bootstrap has the solution
- **Fix**: Check Bootstrap utilities first (spacing, colors, layout, typography)
- **Example**: Use `d-flex justify-content-between` instead of custom flexbox CSS

### Mistake: Missing responsive behavior
- **Fix**: Use Bootstrap grid (`col-md-6`) and responsive utilities (`d-none d-md-block`)
- **Example**: Navbar must collapse on mobile with `navbar-toggler`

### Mistake: Missing accessibility attributes
- **Fix**: Add ARIA labels, use semantic HTML, ensure keyboard navigation
- **Example**: Buttons need `aria-label`, nav needs `aria-current`, modals need `aria-labelledby`

### Mistake: Using JavaScript when not necessary
- **Fix**: Use Bootstrap data attributes or CSS
- **Example**: `data-bs-toggle="modal"` instead of `onclick="showModal()"`

### Mistake: Not committing changes
- **Fix**: Always commit after completing work with brief message

---

**Reference README.md for complete documentation.**