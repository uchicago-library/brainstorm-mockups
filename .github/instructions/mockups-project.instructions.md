---
applyTo: '**'
---

## **🚨 Critical Reminders**
- **This is a static site.** No backend, no database.
- **GitHub Pages is the host.** Optimize for performance and simplicity.
- **Reusability is key.** Developers should copy/paste HTML/SCSS directly into other projects.
- Keep in mind `src/methodology/system-architecture.html`.
- Never modify files inside `/docs/` and most work will happen in `/src/`.
- Do not add code examples.
- Maintain a navigation of `/design_system/` and `/design_mockups/` and `/methodology/` in `src/index.html` with appropriate nesting everytime pages are added, removed, or renamed.
- HTML page files (not components) are documental and don't need extra styling to be engaging. Focus on clean, semantic markup and basic Bootstrap styling. Do not apply heading classes (e.g., `h1`, `h2`).
- Always use the highest dimension variables possible (BS classes and custom components). Avoid creating new ones unless necessary. Avoid using utilities when there are appropriate classes. Avoid inline styles. Only use a <style> tag on `src/design_mockups/` pages.
- Ask for clarifications if any instruction is unclear, conflicting, or appears to be a bad idea.
- This is a self-documented design system website that uses it's own design system. Keep in mind `src/methodology` when writing content. 