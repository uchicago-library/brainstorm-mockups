---
applyTo: '**'
---

## **🚨 Critical Reminders**
- **This is a static site.** No backend, no database.
- **GitHub Pages is the host.** Optimize for performance and simplicity.
- **Reusability is key.** Developers should copy/paste HTML/SCSS directly into other projects.

## **📌 Instructions**
### **1. General Rules**
- Always start with the provided `README.md`.
- Never modify files inside `/docs/` and most work will happen in `/src/`.
- Aks for clarifications if any instruction is unclear or conflicting.

## Design Principles

### Usability Heuristics (Nielsen's 10)
1. **Visibility of System Status**
2. **Match Between System and Real World**
3. **User Control and Freedom**
4. **Consistency and Standards**
5. **Error Prevention**
6. **Recognition Rather Than Recall**
7. **Flexibility and Efficiency of Use**
8. **Aesthetic and Minimalist Design**
9. **Help Users Recognize, Diagnose, and Recover from Errors**
10. **Provide Help and Documentation**

### Accessibility Standards (WCAG 2.1 Level AA)

#### Perceivable
- **Text Alternatives**: All images have descriptive alt text
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Adaptable Layout**: Semantic HTML (header, main, article, nav, etc.)
- **Distinguishable**: Text is resizable, no information conveyed by color alone
- **Accessibility Mode**: Optional high-contrast mode with larger fonts

#### Operable
- **Keyboard Accessible**: All functionality available via keyboard
- **Focus Visible**: Clear focus indicators on all interactive elements
- **Skip Links**: Allow bypassing repeated content blocks
- **Timing**: No time limits on interactions
- **Seizures**: No flashing content, respect `prefers-reduced-motion`

#### Understandable
- **Readable**: Language attribute set on HTML element
- **Predictable**: Consistent navigation and component behavior
- **Input Assistance**: Clear labels, error identification, and suggestions
- **Form Labels**: All inputs have associated labels

#### Robust
- **Compatible**: Valid HTML5, ARIA roles and attributes where appropriate
- **Name, Role, Value**: All custom controls have proper ARIA
- **Status Messages**: ARIA live regions for dynamic content updates

### Additional Design Principles

#### Aesthetic Excellence
- Mind the primary colors.
- Clean, modern, engaging visual design
- Smooth animations respecting reduced motion preferences
- Typography: UChicago Sans Serif

### **2. File Structure Rules**
- **HTML files** go in:
  - `src/demo/` (for component demos)
  - `src/mockups/` (for page mockups)
- **SCSS files** go in `src/styles/`:
  - Use `_variables.scss` for Bootstrap overrides.
  - Create a new file (e.g., `_cards.scss`) for each custom component.
- **Reusable HTML partials** (header/footer) go in `src/_includes/`.
- **Assets** (images, fonts) go in `src/assets/`.

### **3. SCSS/CSS Rules**
- **Use SCSS variables** for colors, spacing, etc. Never hardcode values.
- **Avoid `!important`** unless absolutely necessary.
- **Follow BEM conventions** for custom classes, but apply them judiciously:
  1. Layout rules (columns, grids used across templates)
    Don’t BEM these. They’re structural, not semantic. Use utilities from BS.
  2. Bespoke components (search box, news thumbnail, quick-links box)
    Perfect BEM territory.
  3. Custom one-off elements (like a specific spacer)
    Don’t force BEM here. Use utilities for spacing, sizing, or alignment.

### **4. HTML Rules**
- **Use Bootstrap classes** for layout and components.
- **Add custom classes** only for unique styling (e.g., `.btn-brand`).
- **Include partials** in HTML files using Eleventy syntax:
  ```html
  {% include "header.html" %}
  ```
- **Keep markup clean**: No inline styles or scripts.

### **5. JavaScript Rules**
- **Only use JavaScript for:**
  - Initializing Bootstrap components (e.g., dropdowns, modals) via data attributes.
  - Build-time tasks (e.g., Eleventy plugins).
- **Avoid custom JS** for interactivity unless explicitly required.

### **6. Bootstrap Customization**
- **Override Bootstrap variables** in `_variables.scss`:
  ```scss
  $primary: #800000; // Brand color
  $body-bg: #ffffff;
  ```
- **Extend Bootstrap classes** instead of overriding them:
  ```scss
  .btn-brand {
    @extend .btn-primary;
    background-color: $primary;
  }
  ```

### **7. Naming Conventions**
- **SCSS files**: Prefix with `_` (e.g., `_buttons.scss`).
- **HTML files**: Use kebab-case (e.g., `demo-buttons.html`).
- **Classes**: Use the BEM convention `.block__elem—mod` (e.g., `.btn-brand`).

### **9. Future-Proofing**
- **Avoid adding new libraries** unless absolutely necessary.

### **10. Validation**
- **Test in multiple browsers** (Chrome, Firefox, Safari).
- **Validate HTML/CSS** using [W3C Validator](https://validator.w3.org/).
- **Check accessibility** with [axe DevTools](https://www.deque.com/axe/).

