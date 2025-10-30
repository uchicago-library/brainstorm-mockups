# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- Separate `/demos` folder for component demonstration pages
- Template files:
  - `templates/component-snippet.html` - For pure component HTML
  - `templates/demo-page.html` - For component showcases
- Enhanced JavaScript avoidance guidelines
- Clarified component vs demo page structure

### Changed
- **BREAKING**: Components are now pure HTML snippets (no page structure)
- Updated `components/example-button.html` to be a pure snippet
- Created `demos/example-button-demo.html` to showcase the button
- Updated `index.html` to distinguish between components and demos
- Revised all documentation to reflect component library approach
- Enhanced GenAI instructions with JavaScript avoidance rules

### Decisions Made
- **Component Library Strategy**: Primary approach for this project
  - Components = Pure HTML snippets for copy/paste
  - Demos = Full pages showcasing components
  - Pages = Complete page mockups
- **No JavaScript Unless Critical**: Prefer CSS and Bootstrap data attributes
- **Design System Documentation**: This repo will serve as living design system docs

---

## Guidelines for Updating This File

### When to Add an Entry
- Creating new components or pages
- Modifying shared CSS files
- Discovering new lessons learned
- Making architectural decisions
- Updating documentation

### Entry Format
```markdown
### [Date] - Brief Description
- **Component/Page**: Name of what was created/modified
- **Purpose**: Why it was created
- **Lessons**: Any insights or challenges
- **Dependencies**: Any new CDN resources added
```

### Example Entry
```markdown
### 2025-10-30 - Created Navigation Component
- **Component**: `components/main-nav.html` + `components/main-nav.css`
- **Purpose**: Site-wide navigation bar with dropdown menus
- **Lessons**: Bootstrap navbar classes covered 95% of needs, only needed custom CSS for logo sizing
- **Dependencies**: None (used existing Bootstrap)
```

---

## [2025-10-30] - Initial Setup & Structure Refinement

### Project Initialization
- **Created by**: Human + GenAI collaboration
- **Purpose**: Establish GenAI-driven mockup development environment as design system documentation
- **Scope**: Static HTML/CSS prototyping without build complexity
- **Target**: Local testing only, never to be deployed

### Files Created
- Initial project structure
- Base templates:
  - `templates/base.html` - For full pages
  - `templates/demo-page.html` - For component demos
  - `templates/component-snippet.html` - For pure component snippets
- CSS framework setup (Bootstrap 5.3.3 via CDN)
- Custom CSS files:
  - `assets/css/fonts.css` - Custom font declarations
  - `assets/css/custom-variables.css` - Bootstrap variable overrides (maroon primary)
  - `assets/css/design-system.css` - Production design system placeholder
- Example files:
  - `components/example-button.html` - Pure HTML snippet
  - `components/example-button.css` - Custom button styles
  - `demos/example-button-demo.html` - Component showcase page
- Documentation:
  - `README.md` - Complete project documentation
  - `QUICKSTART.md` - Quick reference guide
  - `CHANGELOG.md` - This file
  - `.github/instructions/mockups-project.instructions.md` - GenAI guidelines
- Project folders:
  - `components/` - For pure HTML snippets (no page structure)
  - `demos/` - For component demonstration pages
  - `pages/` - For full page mockups
  - `templates/` - For base templates
  - `assets/css/` - For shared stylesheets

### Architecture Decisions
1. **Static Files Only**: No server, no compilation required
2. **Bootstrap Foundation**: Latest Bootstrap 5.3.3 via CDN
3. **CSS Cascade**: Custom variables → Design system → Component styles
4. **File Structure**: Separate components (snippets), demos (showcases), and pages (mockups)
5. **Documentation-First**: Comprehensive guides for both humans and GenAI
6. **Component Library Approach**: Primary strategy for design system documentation
   - Components = Pure HTML snippets
   - Demos = Full demonstration pages
   - Pages = Complete page mockups
7. **No JavaScript**: Avoid unless absolutely critical, prefer CSS and Bootstrap

### Key Insights
- **Component Purity**: Keeping component files as pure HTML snippets (no page structure) reduces noise and makes them easier to inspect and copy
- **Design System Focus**: This project will serve as living design system documentation
- **JavaScript Avoidance**: CSS and Bootstrap data attributes can handle 99% of interactivity needs

### Success Criteria Met
- ✅ Can open `index.html` directly in browser
- ✅ Bootstrap loads correctly with custom primary color
- ✅ Example component demonstrates pattern
- ✅ Clear documentation for future development
- ✅ GenAI has structured guidelines to follow

---

**Last Updated**: 2025-10-30
