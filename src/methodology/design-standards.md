---
title: "Design Standards"
description: "Nielsen's usability heuristics and WCAG 2.1 Level AA accessibility standards that guide all design decisions."
layout: base.njk
---

---

## Usability Heuristics (Nielsen's 10)

These heuristics are the cornerstone of usable interface design:

1. **Visibility of System Status**

   The system should always keep users informed about what is happening. Provide real-time feedback and status updates.

   **Example:** Show loading indicators, success messages, and error alerts promptly.

2. **Match Between System and Real World**

   Use language and concepts familiar to users. Speak the user's language, not in system-oriented terms.

   **Example:** Use "Find Resources" instead of "Query Database API".

3. **User Control and Freedom**

   Provide users with exit routes from unwanted situations. Offer undo and redo functionality.

   **Example:** Allow users to cancel actions, close modals with Escape, and navigate back.

4. **Consistency and Standards**

   Users should not wonder whether different words, situations, or actions mean the same thing. Follow platform conventions.

   **Example:** Use consistent button labels, colors, and interaction patterns throughout the system.

5. **Error Prevention**

   More important than good error messages is a careful design that prevents problems from occurring in the first place.

   **Example:** Disable submit buttons until required fields are filled; confirm destructive actions.

6. **Recognition Rather Than Recall**

   Minimize the user's memory load. Make objects, actions, and options visible. Instructions should be easy to search and review.

   **Example:** Use dropdowns instead of requiring users to remember codes; show recently searched items.

7. **Flexibility and Efficiency of Use**

   Provide shortcuts and accelerators for expert users. Allow customization of frequent actions.

   **Example:** Offer keyboard shortcuts, search filters, and saved preferences.

8. **Aesthetic and Minimalist Design**

   Dialogs should not contain information which is irrelevant or rarely needed. Remove clutter and focus on essentials.

   **Example:** Show only essential controls on first load; use progressive disclosure for advanced options.

9. **Help Users Recognize, Diagnose, and Recover from Errors**

   Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.

   **Example:** Instead of "Error 404", say "This search returned no results. Try fewer keywords or check your spelling."

10. **Help and Documentation**

    Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation.

    **Example:** Provide tooltips, FAQs, tutorials, and contact information for support.

---

## Accessibility Standards (WCAG 2.1 Level AA)

All components and pages must meet [WCAG 2.1 Level AA](https://www.w3.org/WAI/WCAG21/quickref/) compliance, organized into four principles:

1. **🎯 Perceivable**

   Information and user interface components must be presentable to users in ways they can perceive.

   - **Text Alternatives:** All images have descriptive alt text
   - **Color Contrast:** 4.5:1 for normal text, 3:1 for large text (18pt+)
   - **Adaptable Layout:** Semantic HTML (header, main, article, nav, etc.)
   - **Distinguishable:** Text is resizable; no information conveyed by color alone
   - **Accessibility Mode:** Optional high-contrast mode with larger fonts

2. **⌨️ Operable**

   User interface components and navigation must be operable.

   - **Keyboard Accessible:** All functionality available via keyboard
   - **Focus Visible:** Clear, visible focus indicators on all interactive elements
   - **Skip Links:** Allow users to bypass repeated content blocks
   - **Timing:** No time limits on interactions (or provide extensions)
   - **Seizures:** No flashing content (>3 Hz), respect `prefers-reduced-motion`

3. **📖 Understandable**

   Information and the operation of user interface must be understandable.

   - **Readable:** Language attribute set on HTML element
   - **Predictable:** Consistent navigation and component behavior
   - **Input Assistance:** Clear labels, error identification, and constructive suggestions
   - **Form Labels:** All inputs have associated, descriptive labels

4. **🔒 Robust**

   Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies.

   - **Compatible:** Valid HTML5, ARIA roles and attributes where appropriate
   - **Name, Role, Value:** All custom controls have proper ARIA labeling
   - **Status Messages:** ARIA live regions for dynamic content updates

---

## Additional Design Principles

1. **Aesthetic Excellence**

   - **Brand Alignment:** All designs respect the primary Maroon (#800000) and supporting color palette
   - **Clean & Modern:** Uncluttered layouts with generous whitespace
   - **Engaging Visuals:** Purposeful use of typography, icons, and imagery
   - **Smooth Interactions:** Thoughtful animations and transitions (respecting reduced motion preferences)
   - **Typography:** UChicago Sans Serif as primary typeface

2. **Reusability**

   - **Copy-Paste Ready:** Components can be copied directly into other projects
   - **Self-Contained:** Minimal dependencies; Bootstrap and FontAwesome only
   - **Well-Documented:** Clear code and usage examples

3. **Performance**

   - **Static First:** No backend required; optimized for CDN delivery
   - **Minimal Dependencies:** Only essential libraries (Bootstrap, Sass)
   - **Fast Load Times:** Optimized CSS, images, and assets

---

## Applying These Principles

When designing or developing components, ask yourself:

1. ☑️ **Is the purpose clear?** (Visibility of System Status)
2. ☑️ **Would a library user understand this?** (Match Between System and Real World)
3. ☑️ **Can users get out of this state?** (User Control and Freedom)
4. ☑️ **Does this match other parts of the system?** (Consistency and Standards)
5. ☑️ **Could this error have been prevented?** (Error Prevention)
6. ☑️ **Is everything visible, or hidden away?** (Recognition Rather Than Recall)
7. ☑️ **Is there a shortcut for power users?** (Flexibility and Efficiency)
8. ☑️ **Is this cluttered or focused?** (Aesthetic and Minimalist Design)
9. ☑️ **Are error messages helpful?** (Help Users Recover from Errors)
10. ☑️ **Is it documented?** (Help and Documentation)
11. ☑️ **Is color contrast sufficient?** (WCAG Perceivable)
12. ☑️ **Can it be used with keyboard only?** (WCAG Operable)
13. ☑️ **Is the language clear?** (WCAG Understandable)
14. ☑️ **Is the HTML valid?** (WCAG Robust)

---

## Resources

- [Nielsen Norman Group: 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe Accessibility Testing Tools](https://www.deque.com/axe/)
- [WebAIM: Web Accessibility In Mind](https://webaim.org/)
