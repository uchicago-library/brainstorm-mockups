# Quick Start Guide

## For Humans

### View the Project
1. Open `index.html` in your browser
2. Click links to see components and pages

### Create New Component (PowerShell)
```powershell
# Copy template and create CSS file
Copy-Item templates\base.html components\my-component.html
New-Item components\my-component.css

# Edit the files, then update index.html
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

1. **Copy base template structure** from `templates/base.html`
2. **Create TWO files**:
   - `components/component-name.html`
   - `components/component-name.css`
3. **Update paths** in HTML (use `../assets/css/...`)
4. **Use Bootstrap first** - only create custom CSS if necessary
5. **Update** `index.html` with link to new component

### When Asked to Create a Page

Same as component, but put files in `pages/` folder instead.

### CSS Creation Checklist

Before writing custom CSS, ask:
- [ ] Can Bootstrap classes do this?
- [ ] Is this in `design-system.css`?
- [ ] Do I really need custom CSS?

If yes to all → Create minimal custom CSS with comments explaining why.

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
├── templates/
│   └── base.html          → Copy this to start new files
├── components/
│   ├── name.html          → Component markup
│   └── name.css           → Component styles (if needed)
├── pages/
│   ├── name.html          → Page markup
│   └── name.css           → Page styles (if needed)
└── assets/css/
    ├── fonts.css          → Font declarations
    ├── custom-variables.css → Bootstrap overrides
    └── design-system.css  → Production styles (optional)
```

---

**Full documentation**: See [README.md](README.md)
