---
applyTo: '**'
---

# GenAI Instructions for Brainstorm Mockups Project

## Overview
This project is for creating static HTML/CSS mockups with zero build complexity. Follow these rules strictly.

## Critical Rules

### File Creation
1. **Always start from `templates/base.html`** - Copy it for new components/pages
2. **One component/page = Two files**: `name.html` + `name.css`
3. **Use kebab-case naming**: `my-component.html`, not `MyComponent.html`

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

### Required Actions
- ✅ Use Bootstrap utilities first
- ✅ Check design-system.css before creating CSS
- ✅ Update index.html after creating component/page
- ✅ Use semantic HTML5
- ✅ Add HTML comments for complex structures
- ✅ Test by opening HTML directly in browser

## File Locations
- **Components**: `components/component-name.html` + `components/component-name.css`
- **Pages**: `pages/page-name.html` + `pages/page-name.css`
- **Templates**: `templates/base.html` (copy this to start)
- **Shared CSS**: `assets/css/` (don't create new files here without asking)

## After Creating Files
1. Test by opening HTML in browser
2. Update `index.html` with link to new file
3. Document any lessons learned in README.md

## Questions to Ask Before Creating CSS
1. Can Bootstrap do this with existing classes?
2. Is this pattern in design-system.css?
3. Is this truly custom, or am I reinventing Bootstrap?

## Example Component Creation
```powershell
# Copy base template
Copy-Item templates\base.html components\my-button.html
New-Item components\my-button.css

# Edit my-button.html:
# - Update title
# - Link to my-button.css
# - Add markup

# Edit my-button.css:
# - Only if Bootstrap can't do it
# - Add comments explaining why

# Update index.html:
# - Add link in components section
```

---

**Read the full README.md for complete project documentation.**