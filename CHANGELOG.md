# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- Initial project structure
- Base HTML template (`templates/base.html`)
- CSS framework setup (Bootstrap 5.3.3 via CDN)
- Custom CSS files:
  - `assets/css/fonts.css` - Custom font declarations
  - `assets/css/custom-variables.css` - Bootstrap variable overrides
  - `assets/css/design-system.css` - Production design system placeholder
- Example button component to demonstrate structure
- Comprehensive documentation:
  - `README.md` - Complete project documentation
  - `QUICKSTART.md` - Quick reference guide
  - `.github/instructions/mockups-project.instructions.md` - GenAI guidelines
- Project folders:
  - `components/` - For reusable components
  - `pages/` - For full page mockups
  - `templates/` - For base templates
  - `assets/css/` - For shared stylesheets

### Changed
- Updated `index.html` to include Bootstrap and project navigation

### Decisions Made
- **No build tools**: Keep project simple and accessible
- **CDN-first approach**: All dependencies loaded via CDN
- **CSS loading order**: Strict hierarchy to prevent conflicts
- **Component isolation**: Each component/page has dedicated HTML + CSS files
- **Bootstrap 5.3.3**: Using latest stable version

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

## [2025-10-30] - Initial Setup

### Project Initialization
- **Created by**: Human + GenAI collaboration
- **Purpose**: Establish GenAI-driven mockup development environment
- **Scope**: Static HTML/CSS prototyping without build complexity
- **Target**: Local testing only, never to be deployed

### Architecture Decisions
1. **Static Files Only**: No server, no compilation required
2. **Bootstrap Foundation**: Latest Bootstrap 5.3.3 via CDN
3. **CSS Cascade**: Custom variables → Design system → Component styles
4. **File Structure**: Separate folders for components, pages, and templates
5. **Documentation-First**: Comprehensive guides for both humans and GenAI

### Success Criteria Met
- ✅ Can open `index.html` directly in browser
- ✅ Bootstrap loads correctly with custom primary color
- ✅ Example component demonstrates pattern
- ✅ Clear documentation for future development
- ✅ GenAI has structured guidelines to follow

---

**Last Updated**: 2025-10-30
