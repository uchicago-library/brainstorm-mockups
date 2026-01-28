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
- Never modify files inside `dist/` and most work will happen in `src/`.

## Design Principles

### Usability Heuristics (Nielsen's 10)

1. **Visibility of System Status**
   - Always show model loading progress with percentage and visual indicators
   - Display typing indicators during AI response generation
   - Show clear status messages for all actions (cache clearing, search, etc.)
   - Provide real-time feedback for button clicks and interactions

2. **Match Between System and Real World**
   - Use familiar chat interface patterns
   - Natural language conversation flow
   - Portfolio sections follow standard conventions (Experience, Education, Projects)
   - Clear, jargon-free language in UI labels

3. **User Control and Freedom**
   - AI on/off toggle to switch between chat and static portfolio
   - Clear close buttons on all modals and panels
   - Escape key to close overlays
   - Browser back/forward buttons work correctly
   - Ability to clear model cache and start fresh

4. **Consistency and Standards**
   - Consistent button styles and interactions
   - Uniform card layouts across all portfolio sections
   - Standardized color scheme with CSS variables
   - Consistent spacing rhythm (8px base unit)

5. **Error Prevention**
   - Permission prompts before model download
   - Confirmation dialogs for destructive actions (cache clearing)
   - Disable input during processing to prevent duplicate submissions
   - WebGPU support check before attempting model load

6. **Recognition Rather Than Recall**
   - Suggestion chips after bot responses
   - Pre-written example queries visible
   - Search results show relevant context
   - Persistent extracted user information across conversation

7. **Flexibility and Efficiency of Use**
   - Keyboard shortcuts (Enter to send, Escape to close)
   - Textarea auto-resize as user types
   - Search functionality with vector similarity
   - Quick access drawer for settings

8. **Aesthetic and Minimalist Design**
   - Clean, modern interface with generous white space
   - Random primary color on load (playful but not overwhelming)
   - Remove unnecessary elements
   - Focus on content over decoration

9. **Help Users Recognize, Diagnose, and Recover from Errors**
   - Clear error messages in natural language
   - Specific guidance on how to resolve issues
   - Graceful degradation when features unavailable
   - Alert system with different types (info, success, error)

10. **Help and Documentation**
    - Privacy message explains how the system works
    - Feedback form for questions/issues
    - Model information in settings drawer
    - Inline explanations for technical concepts

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

#### Privacy First
- No analytics, tracking, or external API calls
- All data processing happens locally
- No conversation persistence beyond session
- Clear communication about privacy benefits

#### Performance Critical
- Aggressive message pruning to prevent memory bloat
- Performance monitoring with warnings
- Graceful degradation on slower devices
- GPU-accelerated animations only

#### Mobile Only
- Fixed dimensions (375px × 620px)
- No responsive breakpoints
- Simplified interface for small screens
- Touch-friendly targets (minimum 44×44px)

#### Aesthetic Excellence
- Clean, modern, engaging visual design
- Smooth animations respecting reduced motion preferences
- Typography: Young Serif (personality) + Work Sans (readability)
- Random primary color for playful surprise on each load

 ===================== TODO: ======================
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

### **4. HTML Rules**
- **Use Bootstrap classes** for layout and components.
- **Add custom classes** only for unique styling (e.g., `.btn-brand`).
- **Include partials** in HTML files using Eleventy syntax:
  ```html
  {% include "header.html" %}
  ```
- **Keep markup clean**: No inline styles or scripts.

---

### **5. JavaScript Rules**
- **Only use JavaScript for:**
  - Initializing Bootstrap components (e.g., dropdowns, modals) via data attributes.
  - Build-time tasks (e.g., Eleventy plugins).
- **Avoid custom JS** for interactivity unless explicitly required.

---

### **6. Bootstrap Customization**
- **Override Bootstrap variables** in `_variables.scss`:
  ```scss
  $primary: #3498db; // Brand color
  $body-bg: #f8f9fa;
  ```
- **Extend Bootstrap classes** instead of overriding them:
  ```scss
  .btn-brand {
    @extend .btn-primary;
    background-color: $primary;
  }
  ```

---

### **7. Deployment**
- **Build the project** with:
  ```bash
  npm run prod
  ```
- **Deploy the `dist/` folder** to GitHub Pages.
- **Never commit `dist/` or `node_modules/`** to the repo.

---

### **8. Naming Conventions**
- **SCSS files**: Prefix with `_` (e.g., `_buttons.scss`).
- **HTML files**: Use kebab-case (e.g., `demo-buttons.html`).
- **Classes**: Use lowercase and hyphens (e.g., `.btn-brand`).

---

### **9. Future-Proofing**
- **Update dependencies** regularly:
  ```bash
  npm update
  ```
- **Avoid adding new libraries** unless absolutely necessary.
- **Document changes** in `CHANGELOG.md` (create one if missing).

---

### **10. Validation**
- **Test in multiple browsers** (Chrome, Firefox, Safari).
- **Validate HTML/CSS** using [W3C Validator](https://validator.w3.org/).
- **Check accessibility** with [axe DevTools](https://www.deque.com/axe/).

---
