---
title: "Quality Assurance & Validation"
description: "Ensure your components meet quality standards through browser testing, validation, and accessibility auditing."
layout: base.njk
---

---

## Overview

Before shipping a component or page, validate it across three dimensions:

1. **Functional:** Works as intended across browsers and devices
2. **Standards-compliant:** Valid HTML, CSS, and semantic markup
3. **Accessible:** WCAG 2.1 Level AA compliant

## 1. Browser Testing

### Minimum Browser Coverage

| Browser | Minimum Version | Priority |
| --- | --- | --- |
| **Chrome** | Latest 2 versions | High |
| **Firefox** | Latest 2 versions | High |
| **Safari** | Latest version (macOS + iOS) | High |
| **Edge** | Latest version | Medium |

### Responsive Testing

- **Mobile:** 375px (iPhone SE), 768px (iPad)
- **Tablet:** 768px to 1024px
- **Desktop:** 1024px+
- **Wide screens:** 1920px+

**Tools:** Browser DevTools (F12), [Responsively App](https://www.responsively.app/)

### Testing Checklist

- ✅ Page loads without errors
- ✅ All interactive elements work (buttons, links, forms)
- ✅ Images display correctly
- ✅ Text is readable (no overflow, proper sizing)
- ✅ Responsive layout adapts properly at each breakpoint
- ✅ Animations/transitions perform smoothly
- ✅ Print styles work (if applicable)

## 2. HTML & CSS Validation

### W3C Validator

**Tool:** [W3C Markup Validation Service](https://validator.w3.org/)

**How to use:**

1. Navigate to validator.w3.org
2. Enter your page URL or upload the HTML file
3. Review any errors and warnings
4. Fix issues before deploying

**What to look for:**

- Missing or mismatched tags
- Invalid attributes
- Missing alt text on images
- Unclosed elements
- Deprecated HTML elements

### CSS Validation

**Tool:** [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)

**Common CSS issues to fix:**

- Misspelled properties
- Invalid color values
- Missing units (e.g., `margin: 10` should be `margin: 10px`)
- Deprecated vendor prefixes (usually safe to ignore)

## 3. Accessibility Auditing

### axe DevTools Browser Extension

**Download:** [axe DevTools for Chrome, Firefox, Safari, Edge](https://www.deque.com/axe/devtools/)

**How to use:**

1. Install the extension in your browser
2. Navigate to your page
3. Open DevTools (F12)
4. Click the "axe DevTools" tab
5. Run a scan
6. Review and fix violations

**What it checks:**

- Color contrast ratios (4.5:1 for normal text, 3:1 for large)
- Missing alt text on images
- Missing form labels
- Missing ARIA roles and attributes
- Keyboard navigation issues
- Focus indicators
- Semantic HTML violations

### Supported Assistive Technology

Test with screen readers if your site serves users with visual impairments:

- **Windows:** [NVDA (free)](https://www.nvaccess.org/), JAWS (commercial)
- **macOS/iOS:** VoiceOver (built-in, VO + Right Arrow)
- **Android:** TalkBack (built-in)

### Keyboard Navigation Testing

Ensure your site is fully usable with keyboard only:

- ✅ Tab through all interactive elements (forms, buttons, links)
- ✅ Tab order is logical (left to right, top to bottom)
- ✅ Focus indicator is visible on all interactive elements
- ✅ Can activate buttons with Enter or Space
- ✅ Can navigate menus with keyboard
- ✅ Can close modals with Escape

## WCAG 2.1 Level AA Compliance Checklist

| Criteria | How to Test | Fix |
| --- | --- | --- |
| **Color Contrast**<br>(4.5:1 normal, 3:1 large) | axe DevTools, manually with [Contrast Checker](https://webaim.org/resources/contrastchecker/) | Adjust foreground/background colors |
| **Alt Text**<br>(all images) | Check HTML, axe DevTools | Add descriptive `alt=""` to `<img>` tags |
| **Form Labels** | axe DevTools, inspect `<label>` elements | Associate labels: `<label for="id">` |
| **Heading Hierarchy**<br>(h1 → h2 → h3...) | Inspect page outline, [H1/H2 Checker](https://www.w3schools.com/tools/webcode_h1_checker.asp) | Use proper heading levels, don't skip |
| **Keyboard Navigation** | Tab through with keyboard, check focus visible | Add visible `:focus` styles, fix tab order |
| **Focus Visible** | Tab through page, verify focus outline | Ensure `:focus` styles are not removed |
| **Semantic HTML** | axe DevTools, W3C Validator | Use `<main>`, `<article>`, `<nav>`, etc. |
| **No Flashing Content**<br>(>3 Hz) | Visual inspection | Reduce flash frequency or avoid flashing |

## Automated Testing Workflow

Before you consider a component "done":

1. **Browser Test:** Chrome, Firefox, Safari on desktop and mobile
2. **Run W3C Validators:** Fix HTML and CSS errors
3. **Run axe DevTools:** Fix accessibility violations
4. **Keyboard Test:** Ensure full keyboard navigation works
5. **Responsive Test:** Check all breakpoints (mobile, tablet, desktop)
6. **Print Test:** (if applicable) Check print styles

## Performance Testing

### Google PageSpeed Insights

**Tool:** [PageSpeed Insights](https://pagespeed.web.dev/)

- Measures page load performance
- Identifies Core Web Vitals issues
- Provides optimization suggestions

### Key Performance Metrics

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## Pre-Deployment Checklist

- ✅ Tested on Chrome, Firefox, Safari
- ✅ Tested on mobile (375px), tablet (768px), desktop (1024px+)
- ✅ W3C HTML validation passed
- ✅ W3C CSS validation passed
- ✅ axe DevTools audit passed (no critical issues)
- ✅ Keyboard navigation works (Tab, Enter, Escape)
- ✅ Focus indicators are visible
- ✅ All images have alt text
- ✅ Color contrast meets WCAG AA standards (4.5:1)
- ✅ Heading hierarchy is correct
- ✅ Form labels are properly associated
- ✅ Semantic HTML used throughout

## Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WebAIM Articles](https://webaim.org/articles/)
- [W3C Markup Validation Service](https://validator.w3.org/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
