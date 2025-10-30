---
applyTo: '**'
---

# GenAI Instructions for Brainstorm Mockups Project

## Overview
This project creates a design system documentation library with pure HTML/CSS component snippets. Zero build complexity. Zero JavaScript (unless absolutely necessary).

## Critical Rules

### File Structure Understanding
1. **`/components`** = Pure HTML snippets OR Web Components
   - **`.html` files** = Pure snippets (NO page structure, just markup)
   - **`.js` files** = Web Components (for reusability without copy/paste)
   - **`.css` files** = Component styles (only if Bootstrap can't do it)
   
2. **`/demos`** = Full pages showcasing components
   - Complete HTML structure
   - Display component with variations
   - Show HTML snippet in `<pre><code>` blocks
   - Acts as design system documentation
   
3. **`/pages`** = Complete page mockups
   - Full page layouts
   - Compose multiple components

### Two Approaches for Components

**Approach A: Pure HTML Snippet** (copy/paste)
- Use when documenting design patterns
- Component is reference documentation
- Developers copy into their pages
- Updates are manual

**Approach B: Web Component** (reusable)
- Use when you need the same component many times with different content
- Component is actual reusable instance
- Include script once, use many times
- Updates happen automatically
- **Works without a server!** (opens with `file://`)

### Creating a New Component

**Ask first: "Do I need reusability or is this a reference pattern?"**

#### Option 1: Pure HTML Snippet (for reference documentation)

**Step 1: Create Component Snippet**
```html
<!-- components/card.html -->
<!-- 
  Card Component
  Uses Bootstrap card classes - NO custom CSS needed!
  
  USAGE:
  Copy this markup into your page.
  No additional CSS required.
-->

<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Card content here.</p>
  </div>
</div>
```

**Step 2: Create Demo Page**
- Copy `templates/demo-page.html` to `demos/card-demo.html`
- Showcase component with variations
- Include HTML snippet display
- Link back to index

**Step 3: Only if needed - Create CSS**
- `components/card.css` (only if Bootstrap can't do it)
- Document WHY custom CSS is needed

**Step 4: Update index.html**
- Add links to both component and demo

---

#### Option 2: Web Component (for actual reusability)

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
- Add links to component and demo

**When to use Web Components:**
- Component used multiple times in same page
- Need different content per instance
- Want updates in one place to affect all instances
- Acceptable to use JavaScript for reusability

### CSS Loading Order (NEVER CHANGE THIS)
```html
<!-- 1. Bootstrap CDN -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- 2. Fonts -->
<link rel="stylesheet" href="../assets/css/fonts.css">
<!-- 3. Bootstrap Overrides -->
<link rel="stylesheet" href="../assets/css/custom-variables.css">
<!-- 4. Design System -->
<link rel="stylesheet" href="../assets/css/design-system.css">
<!-- 5. Component CSS -->
<link rel="stylesheet" href="../components/your-component.css">
```

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
- ❌ NO unnecessary JavaScript
  - Don't write JavaScript for animations (use CSS)
  - Don't write JavaScript for navigation (use `<a>` links)
  - Don't write JavaScript for simple interactivity (use Bootstrap data attributes)
  - Don't write JavaScript for state changes (use CSS pseudo-classes)
- ❌ NO page structure in component HTML files (no `<html>`, `<head>`, `<body>`)

### Required Actions
- ✅ Use Bootstrap utilities first
- ✅ Check design-system.css before creating CSS
- ✅ Keep component HTML files pure (snippets only, no page structure)
- ✅ Create demo pages to showcase components
- ✅ Update index.html after creating component/demo
- ✅ Use semantic HTML5
- ✅ Add comments explaining usage
- ✅ Prefer CSS over JavaScript for visual effects
- ✅ Use Bootstrap data attributes for interactivity (modals, dropdowns, tabs)
- ✅ **JavaScript IS allowed for**: Web Components (native feature for reusability)
- ✅ Test by opening HTML directly in browser (no server needed)

## File Locations
- **Component Snippets**: `components/component-name.html` (pure HTML, no page structure)
- **Web Components**: `components/component-name.js` (for reusability)
- **Component CSS**: `components/component-name.css` (only if Bootstrap can't do it)
- **Component Demos**: `demos/component-name-demo.html` (full page showcasing component)
- **Full Pages**: `pages/page-name.html` + `pages/page-name.css` (optional)
- **Templates**: 
  - `templates/component-snippet.html` (for new HTML snippets)
  - `templates/component-web-component.js` (for new Web Components)
  - `templates/demo-page.html` (for new demo pages)
  - `templates/base.html` (for new full pages)
- **Shared CSS**: `assets/css/` (don't create new files here without asking)

## After Creating Files
1. Verify component snippet has NO page structure
2. Test demo page by opening in browser
3. Update `index.html` with links to both component and demo
4. Document any lessons learned in README.md if significant

## Questions to Ask Before Creating CSS
1. Can Bootstrap do this with existing classes?
2. Is this pattern in design-system.css?
3. Is this truly custom, or am I reinventing Bootstrap?
4. Can I achieve this with pure CSS instead of JavaScript?

## Example Component Creation
```powershell
# Create component snippet (NO page structure)
New-Item components\my-button.html

# Edit my-button.html:
# - Add usage comment header
# - Write ONLY the component markup
# - NO <html>, <head>, or <body> tags

# Create demo page
Copy-Item templates\demo-page.html demos\my-button-demo.html

# Edit demo page:
# - Update title
# - Show component variations
# - Display HTML snippet in <pre><code>
# - Link to component CSS if needed

# Only if Bootstrap can't do it:
New-Item components\my-button.css
# - Add comments explaining why custom CSS is needed

# Update index.html:
# - Add link in components section (to view snippet)
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