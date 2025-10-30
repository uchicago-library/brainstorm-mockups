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
├── components/                   # PURE HTML SNIPPETS + WEB COMPONENTS
│   ├── component-name.html       # Just the component markup (no <html>, <head>, <body>)
│   ├── component-name.css        # Component-specific styles (if needed)
│   └── component-name.js         # Web Component (optional - for reusability)
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
    ├── component-snippet.html    # Template for component snippets
    └── component-web-component.js # Template for Web Components
```

### Understanding the Structure

1. **`/components`** - Pure HTML snippets OR Web Components
   - **HTML files** (`.html`) = Pure snippets (NO page structure)
     - Just the component markup with usage comments
     - Minimal, focused, copy/paste ready
     - Example: Just a `<button>` or `<div class="card">...</div>`
   
   - **JavaScript files** (`.js`) = Web Components (OPTIONAL)
     - For when you need reusability without copy/paste
     - Use multiple instances with different content
     - Update once, changes everywhere
     - Works without a server! (opens with `file://`)
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

### Creating a New Component (HTML Snippet)

1. Copy `templates/component-snippet.html` to `components/your-component.html`
2. Write **only** the component HTML (no page structure)
3. Add usage comments at the top
4. Create `components/your-component.css` **only if Bootstrap can't do it**
5. Create a demo page in `demos/your-component-demo.html` to showcase it
6. Update `index.html` to link to both

**Example component file (`components/card.html`):**
```html
<!-- 
  Card Component
  Uses Bootstrap's card classes - NO custom CSS needed!
-->

<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

### Creating a Reusable Web Component (OPTIONAL)

**When to use:** You need the same component multiple times with different content and want updates in one place.

1. Copy `templates/component-web-component.js` to `components/your-component.js`
2. Update the class name and `customElements.define()` call
3. Write the component HTML in the `connectedCallback()` method
4. In your pages, include the script: `<script src="../components/your-component.js"></script>`
5. Use the component: `<your-component>Content</your-component>`

**Example Web Component (`components/alert-box.js`):**
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

**Usage in page:**
```html
<script src="../components/alert-box.js"></script>
<alert-box variant="success">Operation successful!</alert-box>
<alert-box variant="danger">Error occurred!</alert-box>
```

**Advantages:**
- ✅ Works without a server (opens with `file://`)
- ✅ Update component once, all instances update
- ✅ Different content per instance
- ✅ No build tools needed
- ✅ Native browser feature

**Trade-offs:**
- ⚠️ Requires JavaScript (minimal, but present)
- ⚠️ Slightly more complex than pure HTML

### Creating a Component Demo Page

1. Copy `templates/demo-page.html` to `demos/component-name-demo.html`
2. Showcase the component with variations
3. Display the HTML snippet in a `<pre><code>` block
4. Explain usage and when custom CSS is needed
5. Link back to `index.html`

### Creating a Full Page

1. Copy `templates/base.html` to `pages/your-page.html`
2. Compose components from `/components` into your layout
3. Create `pages/your-page.css` only for page-specific layout needs
4. Update `index.html` to link to the new page

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

### Primary Strategy: **Component Library Approach** (Design System Documentation)

Build a library of reusable component snippets with demonstrations.

**Two Approaches for Components:**

#### **Approach A: Pure HTML Snippets** (Copy/Paste)
- Component is static HTML in `.html` file
- Copy/paste into pages where needed
- Update manually across pages if component changes
- **Best for**: Design system documentation, reference patterns

#### **Approach B: Web Components** (Reusable)
- Component is JavaScript class in `.js` file
- Include script once, use many times with different content
- Update component once, all instances update automatically
- **Best for**: Components you'll use many times, need different content each time

**Choose based on your needs:**
- **Use pure HTML** when documenting patterns for developers to copy
- **Use Web Components** when you need actual reusability in mockups

---

### Workflow for Pure HTML Components:

1. Identify a UI pattern needed (button, card, form, navigation, etc.)
2. Create pure HTML snippet in `components/component-name.html`
   - **No page structure** - just the component markup
   - Include usage comments
   - Minimize custom CSS (prefer Bootstrap)
3. Create demo page in `demos/component-name-demo.html`
   - Show the component rendered
   - Display variations (sizes, colors, states)
   - Include HTML snippet in `<code>` block
   - Document when to use vs Bootstrap defaults
4. Create `components/component-name.css` **only if necessary**
   - Document why Bootstrap couldn't do it
   - Keep it minimal and focused
5. Update `index.html` with links to component and demo

---

### Workflow for Web Components:

1. Create Web Component in `components/component-name.js`
   - Use `customElements.define()` to register
   - Handle attributes for variants (size, color, etc.)
   - Get content from element's `textContent`
2. Create demo page in `demos/component-name-demo.html`
   - Include the component script
   - Show multiple instances with different content
   - Document available attributes
   - Show HTML usage examples
3. Update `index.html` with links

**Example: Button Component Both Ways**

Pure HTML (`components/button-snippet.html`):
```html
<button type="button" class="btn btn-primary">Click Me</button>
<!-- Copy this into your page, change text manually -->
```

Web Component (`components/button-component.js`):
```javascript
class ButtonComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button class="btn btn-primary">${this.textContent}</button>`;
  }
}
customElements.define('button-component', ButtonComponent);
```

Usage:
```html
<script src="../components/button-component.js"></script>
<button-component>Click Me</button-component>
<button-component>Submit</button-component>
<button-component>Cancel</button-component>
<!-- Each instance has different text, update component.js to update all -->
```

---

### Secondary Strategy: **Page Mockup Approach**

Build complete page mockups when you need to show full context.

**Workflow:**
1. Copy `templates/base.html` to `pages/page-name.html`
2. Compose layout using components from `/components`
3. Create `pages/page-name.css` for page-specific layout only
4. Update `index.html` with link

**When to use:**
- Stakeholder presentations
- Testing how components work together
- Demonstrating complete user flows
- Showing responsive behavior in context

**When NOT to use:**
- Building reusable components (use Component Library approach)
- Documenting the design system

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
8. **Minimize JavaScript** - Avoid JavaScript unless beneficial
   - Use CSS for animations, transitions, and visual effects
   - Use HTML/CSS for navigation (links between pages)
   - Bootstrap's data attributes for interactive components (modals, dropdowns)
   - **JavaScript IS allowed for**: Web Components (native browser feature for reusability)
   - **Avoid JavaScript for**: Form validation logic, complex data manipulation, event handling when CSS can do it

### ✅ REQUIREMENTS (What TO Do)

1. **Use Bootstrap Classes First** - Leverage Bootstrap utilities before custom CSS
2. **Check Design System** - Look in `design-system.css` before creating new patterns
3. **Follow CSS Loading Order** - As documented above (critical!)
4. **Keep Components Pure** - Component HTML files = snippets only (no page structure)
5. **Create Demo Pages** - Show component usage in `demos/` folder
6. **Use Semantic HTML** - Proper HTML5 elements and accessibility
7. **Use Relative Paths** - For local file references
8. **CDN Only for Dependencies** - Latest Bootstrap, fonts, icons via CDN
9. **Update index.html** - Add links to new components/demos/pages
10. **Prefer HTML/CSS Over JavaScript** - Use CSS animations, Bootstrap data attributes
    - Navigation: Use `<a href="page.html">` links
    - Interactivity: Use Bootstrap components (modals, accordions, tabs)
    - Animations: Use CSS transitions and keyframes
    - State changes: Use `:hover`, `:active`, `:focus` pseudo-classes

---

## Lessons Learned

> This section will be updated as the project evolves with insights discovered during development.

### Lesson 1: Initial Setup
- **Date**: 2025-10-30
- **Discovery**: Established base project structure with clear CSS loading hierarchy
- **Impact**: Sets foundation for consistent styling across all future components

### Lesson 2: Component vs Demo Pages
- **Date**: 2025-10-30
- **Discovery**: Components should be pure HTML snippets (no page structure), with separate demo pages
- **Rationale**: 
  - Reduces noise when inspecting component code
  - Makes copy/paste easier for developers
  - Acts as design system documentation
  - Demo pages provide full context for showcasing
- **Impact**: Changed project structure to separate `/components` (snippets) from `/demos` (showcases)

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

1. **Understand the file types:**
   - **Component snippets** (`components/*.html`) = Pure HTML only, NO page structure
   - **Demo pages** (`demos/*.html`) = Full HTML pages showcasing components
   - **Full pages** (`pages/*.html`) = Complete page mockups

2. **Always create component snippets as pure HTML:**
   ```html
   <!-- components/button.html -->
   <!-- 
     Button Component
     Uses Bootstrap classes
   -->
   <button type="button" class="btn btn-primary">Click Me</button>
   ```
   
3. **Always create a demo page for each component:**
   - Copy from `templates/demo-page.html`
   - Show component variations
   - Display HTML snippet in `<code>` block
   - Link back to index

4. **Check existing resources first:**
   - Can Bootstrap classes achieve this? → Use them
   - Does `design-system.css` have this pattern? → Use it
   - Only create new CSS if absolutely necessary

5. **CSS Creation Rules:**
   - Component CSS goes in matching `.css` file
   - Use specific class names (e.g., `.card-custom` not `.card`)
   - Avoid `!important` unless overriding Bootstrap
   - Comment complex selectors
   - **Document WHY custom CSS was needed**

6. **JavaScript Rules:**
   - **Avoid JavaScript** - Use CSS and Bootstrap data attributes
   - Navigation: `<a href="page.html">` not JavaScript
   - Interactivity: Bootstrap components (modals, dropdowns, tabs)
   - Animations: CSS transitions and keyframes
   - Only use JavaScript if absolutely critical AND document why

7. **File Naming:**
   - Use kebab-case: `my-component.html`, `my-component.css`
   - Match HTML and CSS filenames exactly
   - Descriptive names (e.g., `hero-banner.html` not `component1.html`)

8. **Update Index:**
   - After creating component/demo, update `index.html`
   - Add link in Components section (to snippet file)
   - Add link in Component Demos section (to demo page)
   - Keep list organized

9. **Documentation in Code:**
   - Add HTML comments at top of component snippets
   - Explain Bootstrap class choices if non-obvious
   - Document any CSS hacks or workarounds
   - Include usage instructions

10. **Testing Checklist:**
    - Component snippet has NO page structure
    - Demo page opens correctly in browser
    - All CSS loads in correct order
    - Check browser console for errors
    - Test responsive behavior

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