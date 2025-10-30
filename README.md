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
│   │   └── design-system.css    # Production design system (optional)
│   └── images/                   # (future) Image assets
│
├── components/
│   ├── component-name.html       # Component HTML
│   └── component-name.css        # Component-specific styles
│
├── pages/
│   ├── page-name.html            # Full page mockup
│   └── page-name.css             # Page-specific styles
│
└── templates/
    └── base.html                 # Base HTML template for new files
```

---

## Getting Started

### Opening the Project

1. Clone this repository
2. Open `index.html` in your browser (double-click or right-click → Open with browser)
3. Navigate to components or pages as they are created

### Creating a New Component or Page

1. Copy `templates/base.html` to either:
   - `components/your-component.html` for components
   - `pages/your-page.html` or `your-page.html` for full pages

2. Create a corresponding CSS file:
   - `components/your-component.css`
   - `pages/your-page.css`

3. Update the HTML file:
   - Change the `<title>` tag
   - Link to the component/page CSS file
   - Add your markup

4. Update `index.html` to link to the new file

### CSS Loading Order (CRITICAL)

All HTML files must load CSS in this exact order:

1. **Bootstrap CSS CDN** (latest)
2. **Custom Fonts** (`assets/css/fonts.css`)
3. **Bootstrap Variable Overrides** (`assets/css/custom-variables.css`)
4. **Design System** (`assets/css/design-system.css`)
5. **Component/Page CSS** (specific to that file)

**Example:**
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/fonts.css">
<link rel="stylesheet" href="../assets/css/custom-variables.css">
<link rel="stylesheet" href="../assets/css/design-system.css">
<link rel="stylesheet" href="../components/your-component.css">
```

---

## Development Strategies

### Strategy 1: **Component-First Approach**

Build small, reusable components that can be composed into larger pages.

**Workflow:**
1. GenAI creates individual components in `components/` folder
2. Each component is self-contained with its own HTML + CSS
3. Components can be tested in isolation
4. Compose components into full pages by copying markup

**Pros:**
- Easier to test and debug
- Promotes reusability
- Clear separation of concerns
- GenAI can focus on one thing at a time

**Cons:**
- Requires manual composition
- May need to adjust styles when combining

### Strategy 2: **Page-First Approach**

Build complete page mockups and extract components later if needed.

**Workflow:**
1. GenAI creates full page mockups in `pages/` or root
2. Each page includes all necessary components inline
3. Extract reusable patterns into components as needed

**Pros:**
- Faster for complete page visualizations
- Better for seeing full design context
- Good for stakeholder demos

**Cons:**
- Can lead to code duplication
- Harder to maintain consistency
- May need refactoring later

### Recommended Hybrid Strategy

Start with **Component-First** for common UI elements (buttons, cards, forms, navigation), then use **Page-First** for specific page layouts that compose these components.

---

## Restrictions & Guidelines

### ❌ RESTRICTIONS (What NOT to Do)

1. **No Build Tools** - No npm, webpack, vite, sass, etc.
2. **No Server-Side Code** - No Node.js, PHP, Python servers
3. **No Backend Features** - No databases, authentication, file uploads
4. **No Module Bundlers** - No ES6 module imports/exports
5. **No Package Managers** - All dependencies via CDN only
6. **No CSS Preprocessors** - Use vanilla CSS only (no SASS/LESS)
7. **No Complex JavaScript Frameworks** - No React, Vue, Angular
   - Vanilla JavaScript or simple libraries (jQuery via CDN) are OK

### ✅ REQUIREMENTS (What TO Do)

1. **Use Bootstrap Classes First** - Leverage Bootstrap utilities before custom CSS
2. **Check Design System** - Look in `design-system.css` before creating new patterns
3. **Follow CSS Loading Order** - As documented above (critical!)
4. **One Component/Page = One HTML + One CSS** - Keep files paired
5. **Use Semantic HTML** - Proper HTML5 elements and accessibility
6. **Use Relative Paths** - For local file references
7. **CDN Only for Dependencies** - Latest Bootstrap, fonts, icons via CDN
8. **Update index.html** - Add links to new components/pages

---

## Lessons Learned

> This section will be updated as the project evolves with insights discovered during development.

### Lesson 1: Initial Setup
- **Date**: 2025-10-30
- **Discovery**: Established base project structure with clear CSS loading hierarchy
- **Impact**: Sets foundation for consistent styling across all future components

---

## Architecture & Design Decisions

### CSS Cascade Strategy

**Decision**: Use CSS custom properties (variables) to override Bootstrap defaults  
**Rationale**: 
- Avoids modifying Bootstrap source
- Maintains upgrade path for Bootstrap
- Clear override location (`custom-variables.css`)
- Easy to see what's customized

### File Organization

**Decision**: Separate `components/` and `pages/` folders  
**Rationale**:
- Clear distinction between reusable parts and full pages
- Easier for GenAI to understand context
- Supports both development strategies
- Scalable as project grows

### No Templating Engine

**Decision**: Manual HTML duplication instead of template engine  
**Rationale**:
- Keeps project simple (no build process)
- GenAI can copy/paste boilerplate easily
- Trade-off: manual updates vs. zero complexity
- Acceptable for mockup/prototype use case

### CDN-First Approach

**Decision**: All external dependencies via CDN  
**Rationale**:
- No local dependency management
- Always get latest versions (or pin via integrity hash)
- Works offline-first after initial load (browser cache)
- No npm/node_modules complexity

---

## GenAI Development Best Practices

### For GenAI Creating Components/Pages

1. **Always start from `templates/base.html`**
   - Copy the entire file
   - Update paths if component is in subfolder

2. **Check existing resources first:**
   - Can Bootstrap classes achieve this? → Use them
   - Does `design-system.css` have this pattern? → Use it
   - Only create new CSS if absolutely necessary

3. **CSS Creation Rules:**
   - Component CSS goes in matching `.css` file
   - Use specific class names (e.g., `.card-custom` not `.card`)
   - Avoid `!important` unless overriding Bootstrap
   - Comment complex selectors

4. **File Naming:**
   - Use kebab-case: `my-component.html`, `my-component.css`
   - Match HTML and CSS filenames exactly
   - Descriptive names (e.g., `hero-banner.html` not `component1.html`)

5. **Update Index:**
   - After creating component/page, update `index.html`
   - Add link with brief description
   - Keep list organized

6. **Documentation in Code:**
   - Add HTML comments for complex structures
   - Document any CSS hacks or workarounds
   - Explain Bootstrap class choices if non-obvious

7. **Testing Checklist:**
   - Open directly in browser (not via server)
   - Check responsive behavior (resize browser)
   - Verify CSS loading order
   - Check browser console for errors

### When to Create New CSS

Create component CSS **only** when:
- Bootstrap classes cannot achieve the design
- Design system doesn't have the pattern
- Need to override specific Bootstrap behavior
- Custom layout or styling needed

### Handling Bootstrap Overrides

If you need to override Bootstrap:
1. Try `custom-variables.css` first (for global changes)
2. Use component CSS for specific overrides
3. Use specific selectors to avoid conflicts
4. Document why override is needed

---

## Issues & Considerations

### ✅ No Issues Identified

Your project requirements are **well-suited** for this approach:

- **Simple static mockups** → Perfect for no-build setup
- **Local testing only** → No deployment complexity
- **GenAI-driven** → Clear, documented structure helps AI
- **Bootstrap + custom CSS** → Industry standard approach
- **Component isolation** → Easy to manage and test

### Future Considerations

If the project grows, you might consider:

1. **Static Site Generator** (optional) - If duplication becomes painful
   - Jekyll, 11ty, Hugo
   - Still no server needed for viewing
   - Trade-off: adds build step

2. **Version Control for Design System** - If `design-system.css` changes frequently
   - Document version/date in comments
   - Keep changelog

3. **Browser Compatibility** - Currently assumes modern browsers
   - Add browserslist if needed
   - Consider polyfills if supporting older browsers

---

## Contributing

Since this is a GenAI-driven mockup repository:

1. GenAI should follow all guidelines in this README
2. All new components/pages should follow the structure
3. Update this README if new patterns/lessons emerge
4. Keep `index.html` updated with new files

---

## License

See [LICENSE](LICENSE) file for details.

---

## Quick Reference

### Create New Component
```bash
# Copy base template (PowerShell)
Copy-Item templates\base.html components\my-component.html
New-Item components\my-component.css
```

### Create New Page
```bash
# Copy base template (PowerShell)
Copy-Item templates\base.html pages\my-page.html
New-Item pages\my-page.css
```

### Update Paths
- Components: `../assets/css/...`
- Pages: `../assets/css/...`
- Root level: `./assets/css/...`

---

**Last Updated**: 2025-10-30  
**Project Status**: ✅ Ready for GenAI mockup development