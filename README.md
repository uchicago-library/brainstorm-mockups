```markdown
# GenAI Mockups — Brainstorming Mockups

Purpose
- Rapid mockups and ideation using GenAI.
- Keep small reusable components in separate HTML + CSS files.
- Override Bootstrap variables (like primary color) without a build step.
- No local server required — open index.html directly in the browser.

Files
- index.html — main sample page
- components/ — separate component HTML + CSS files (navbar, hero, card)
- assets/css/vars.css — override Bootstrap CSS variables (no compiler)
- assets/css/styles.css — global styles and helpers
- assets/js/component-loader.js — optional: inlines components when served via http(s)

How to override Bootstrap variables (no build)
- Open assets/css/vars.css and edit the variable values, for example:
  - --bs-primary: #1f8cff;
- The vars.css file is loaded after the Bootstrap CDN, so your overrides take effect immediately.

How components work (no server required)
- Each component is kept in components/*.html and includes its own stylesheet (e.g., components/card.css).
- index.html embeds components using <object data="components/your-component.html"> which works when opening files directly (file://).
- If you serve the site (http:// or https://), assets/js/component-loader.js will attempt to inline component markup for easier editing.

Working locally
- Open index.html in your browser. Embeds should display via <object>.
- Optional: Run a simple static server (e.g., `python -m http.server`) to get the nicer inline editing behavior, but this is not required.

Deploy
- Host on GitHub Pages, Netlify, Vercel, or any static hosting provider.
- If you enable GitHub Pages, the component inlining script will inline components automatically (preferred for browser editing).

Next steps you might want
- Add more components in components/ (modals, forms, navigation patterns).
- Add a small palette JSON and a tiny UI to switch CSS variable values on the fly (I can add that).
- Add an example GenAI integration or script that generates component HTML snippets.
```