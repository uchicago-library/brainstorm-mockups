# Quick Start Guide

## For Humans

### View the Project
1. Open `index.html` in your browser
2. View component demos to see examples
3. View Web Components demo to see reusability in action
4. Inspect component snippets for copy/paste code

### Create New Component - Pure HTML Snippet (PowerShell)

```powershell
# 1. Create component snippet (pure HTML, no page structure)
New-Item components\my-component.html

# 2. Create demo page
Copy-Item templates\demo-page.html demos\my-component-demo.html

# 3. Only if Bootstrap can't do it - create CSS
New-Item components\my-component.css

# 4. Edit files and update index.html
```

### Create New Component - Web Component (PowerShell)

```powershell
# 1. Create Web Component JavaScript file
Copy-Item templates\component-web-component.js components\my-component.js

# 2. Create demo page
Copy-Item templates\demo-page.html demos\my-component-demo.html

# 3. Edit files and update index.html
```

### Create New Page (PowerShell)
```powershell
# Copy template and create CSS file
Copy-Item templates\base.html pages\my-page.html
New-Item pages\my-page.css

# Edit the files, then update index.html
```

---

## For GenAI

### When Asked to Create a Component

**First, ask: "Does this need to be reusable with different content?"**

#### If NO (design pattern reference):

1. **Create Component Snippet** (`components/name.html`)
   - **NO** `<!doctype>`, `<html>`, `<head>`, or `<body>` tags
   - Just the component markup with usage comments
   - Think: "What would a developer copy/paste?"

2. **Create Demo Page** (`demos/name-demo.html`)
   - Copy from `templates/demo-page.html`
   - Showcase component with variations
   - Display HTML snippet in `<pre><code>` block
   - Explain when to use vs Bootstrap

3. **Create CSS ONLY if necessary** (`components/name.css`)
   - First check: Can Bootstrap do this?
   - Second check: Is this in `design-system.css`?
   - If yes to either: DON'T create CSS
   - If no to both: Create minimal CSS with comments explaining why

4. **Update `index.html`**
   - Add link in "Components" section (to snippet file)
   - Add link in "Component Demos" section (to demo page)

---

#### If YES (need actual reusability):

1. **Create Web Component** (`components/name.js`)
   - Copy from `templates/component-web-component.js`
   - Update class name and `customElements.define()` call
   - Handle attributes for variants (size, color, etc.)
   - Get content from `this.textContent`

2. **Create Demo Page** (`demos/name-demo.html`)
   - Copy from `templates/demo-page.html`
   - Include script: `<script src="../components/name.js"></script>`
   - Show multiple instances with different content
   - Document available attributes
   - Display usage examples in `<pre><code>` block

3. **Update `index.html`**
   - Add link in "Component Demos" section

**Example Web Component:**
```javascript
class AlertBox extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'info';
    const content = this.textContent.trim();
    
    this.innerHTML = `
      <div class="alert alert-${variant}" role="alert">
        ${content}
      </div>
    `;
  }
}
customElements.define('alert-box', AlertBox);
```

**Usage:**
```html
<script src="../components/alert-box.js"></script>
<alert-box variant="success">Success message!</alert-box>
<alert-box variant="danger">Error message!</alert-box>
```

### When Asked to Create a Page

Same as before: Copy `templates/base.html` to `pages/` folder.

### CSS Creation Checklist

Before writing custom CSS, ask:
- [ ] Can Bootstrap classes do this?
- [ ] Is this in `design-system.css`?
- [ ] Do I really need custom CSS?

If yes to all → Create minimal custom CSS with comments explaining why.

### JavaScript Checklist

Before writing JavaScript, ask:
- [ ] Can CSS do this? (animations, transitions, hover effects)
- [ ] Can Bootstrap data attributes do this? (modals, dropdowns, tabs, collapse)
- [ ] Can HTML links do this? (navigation between pages)
- [ ] Is this absolutely critical to the demo?

If yes to all → Write minimal JavaScript with comments explaining why.

**Prefer:**
- CSS animations over JavaScript animations
- `<a href="page.html">` over JavaScript navigation
- Bootstrap `data-bs-toggle` over JavaScript event handlers
- CSS `:hover` over JavaScript mouseover events

### Mandatory CSS Loading Order

```html
<!-- Never change this order! -->
<link href="[Bootstrap CDN]" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/fonts.css">
<link rel="stylesheet" href="../assets/css/custom-variables.css">
<link rel="stylesheet" href="../assets/css/design-system.css">
<link rel="stylesheet" href="../components/your-file.css">
```

---

## Common Tasks

### Update Primary Color
Edit `assets/css/custom-variables.css`:
```css
:root {
  --bs-primary: #800000;  /* Change this value */
  --bs-primary-rgb: 128, 0, 0;
}
```

### Add Custom Font
1. Add font CDN or @font-face in `assets/css/fonts.css`
2. Reference in `custom-variables.css`:
```css
:root {
  --bs-body-font-family: 'YourFont', sans-serif;
}
```

### View Design System
Open `assets/css/design-system.css` to see production styles available.

---

## File Structure Quick Reference

```
├── index.html              → Main navigation
│
├── templates/
│   ├── component-snippet.html → Copy for new component snippets
│   ├── demo-page.html         → Copy for new demo pages  
│   └── base.html              → Copy for new full pages
│
├── components/             → PURE HTML SNIPPETS (no page structure!)
│   ├── name.html          → Just the component markup
│   └── name.css           → Component styles (if needed)
│
├── demos/                  → FULL PAGES showcasing components
│   └── name-demo.html     → Demo page with examples
│
├── pages/                  → FULL PAGE MOCKUPS
│   ├── name.html          → Page markup
│   └── name.css           → Page styles (if needed)
│
└── assets/css/
    ├── fonts.css          → Font declarations
    ├── custom-variables.css → Bootstrap overrides
    └── design-system.css  → Production styles
```

**Key distinction:**
- **Components** = Snippets (no `<html>`, `<head>`, `<body>`)
- **Demos & Pages** = Full HTML documents

---

**Full documentation**: See [README.md](README.md)
