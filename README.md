# Brainstorming Mockups# GenAI Mockups — Brainstorming Mockups



A clean slate project for rapid mockup development.This repository is a tiny static mockup kit for rapid ideation using GenAI. The goal is to keep components small, editable, and easy to override without a build step. This README is now the single source-of-truth for: requirements, constraints, design decisions, and challenges encountered when building and iterating on the component-loading system.



## Status## Purpose

Project reset - awaiting requirements.- Rapid mockups and ideation using GenAI.

- Keep small reusable components in separate HTML + CSS files.
- Override Bootstrap variables (like primary color) without a compiler or build step.
- Work when opening `index.html` directly (file://) and improve editing experience when served over http(s).

## Files (quick map)
- `index.html` — main sample page
- `components/` — component HTML + separate CSS files (navbar, hero, card)
- `assets/css/vars.css` — overrides for Bootstrap CSS variables
- `assets/css/styles.css` — global styles and helpers
- `assets/js/component-loader.js` — optional script to inline components when served over http(s)

## Requirements (explicit)
1. Keep components in separate files for easy editing and reuse.
2. No required build step: opening `index.html` directly (file://) must still show working pages.
3. Allow easy, global theming by overriding CSS variables (e.g., `--bs-primary`) without recompiling.
4. Prefer a workflow where component markup can be edited and previewed quickly during development.
5. Improve control over component styling (avoid unpredictable iframe/object CSS isolation when possible).
6. Maintain accessibility (semantic markup, ARIA where needed) and graceful fallbacks for environments with limited JS.

## Constraints
- Browsers treat `file://` differently: fetch() and CORS are commonly restricted, so inlining via JS is easiest when served over http(s).
- Using `<object>` (or `<iframe>`) gives a nested browsing context; that isolates component CSS from page CSS and makes styling from the parent page harder.
- The project aims to remain zero-build for offline editing, so any solution should not force a build step for basic editing.

## Acceptance criteria
- When opened directly (file://) the page loads components and remains editable (via separate files).
- When served (http/https), components can be inlined into the main DOM for easier CSS and JS integration.
- Recommended approach is documented and justified in this README, including tradeoffs.

## Design options considered (pros / cons)

1) Current: `<object data="components/foo.html">`
  - Pros: Works with file://, no JS required, easy separation of files.
  - Cons: Creates a nested browsing context (like an iframe). Parent CSS cannot reliably style component internals; height/layout coordination and interactivity can be awkward.

2) `<iframe>`
  - Pros: Same isolation as `<object>` but widely understood.
  - Cons: Same styling isolation problems; adds more complexity for communication between parent and frame.

3) fetch() + insert HTML into DOM (runtime inlining)
  - Pros: Components become part of the main DOM; parent CSS, variables, and JS apply naturally. Great control over styling and behavior.
  - Cons: fetch() of local files is blocked under `file://` in many browsers due to CORS/security. Requires serving via http(s) for full behavior. Small client-side loader required.

4) Web Components (custom elements + Shadow DOM)
  - Pros: Encapsulated styling and markup, reusable API, predictable scoping. Can accept CSS custom properties to bridge theming into Shadow DOM.
  - Cons: Requires authoring components as JS modules or templates; may add complexity for users who just want straight HTML files. Also doesn't solve file:// fetch restrictions for loading external component files.

5) Build-time inlining (static pre-render)
  - Pros: No runtime fetch; works everywhere. Predictable, fast.
  - Cons: Requires a build step, which this project aims to avoid. Less immediate editing convenience.

## Recommended approach (short)
- Keep the `components/*.html` files as the source-of-truth for authoring (so you can open them directly in an editor).
- Use the existing `<object>` approach as the zero-dependency fallback for `file://` usage (keeps no-build requirement).
- Provide a small `assets/js/component-loader.js` that, when the site is served over http(s), fetches `components/*.html` and inlines them into the main DOM. Optionally support two modes:
  - Inline into the main DOM (default): best for styling and integration.
  - Wrap in a small Web Component (optional): provides encapsulation when desired and can accept CSS custom properties for theming.
- Document the tradeoffs clearly in this README (this file). For the best developer experience, use a tiny local static server (e.g., `python -m http.server`) — that unlocks fetch-based inlining and live editing.

## Implementation notes / component authoring guidelines
- Component file format (recommended):
  - A plain HTML fragment (no <html>/<head> wrapper). E.g., `components/card.html` contains the card markup and a `<link rel="stylesheet" href="components/card.css">` if it needs extra styles.
  - Keep component CSS limited and prefer CSS variables for colors/spacing so the host can theme them.

- When using runtime inlining via `component-loader.js`:
  - For each `<object class="component-embed" data="components/foo.html">` in the page, the loader fetches `components/foo.html` and replaces the `<object>` with the fetched fragment.
  - The loader can (optionally) move stylesheets from the fragment into the host document or scope them via a wrapper element.
  - Provide an option to mount the fragment into a Shadow DOM root if encapsulation is desired (note: shadow DOM prevents parent CSS from styling internals except via CSS custom properties).

- The loader should gracefully fallback to the `<object>` behavior when fetch() is unavailable (e.g., when loaded via file://).

## Challenges & tradeoffs (record)
- file:// vs http(s): Browsers block fetch() for local files in many environments. This drives the need for a fallback (`<object>`). If you plan to edit in-browser often, run a tiny local server.
- Styling isolation vs global styling: `<object>` gives isolation but prevents desired parent styling. Shadow DOM gives encapsulation but still requires a plan to pass theme variables into the shadow root.
- Accessibility: Inlined markup is better for screen readers than isolated frames. If using `<object>` or `<iframe>`, ensure accessible titles and fallbacks.
- Complexity vs simplicity: Web Components are powerful but add authoring complexity. For a small mockup kit, a fetch+inline loader balances simplicity and control.

## Practical recommendations
1. Keep `components/*.html` as editable fragments.
2. Use `<object>` as the default file:// friendly embed so the no-build story stays intact.
3. Enable `assets/js/component-loader.js` (uncomment it in `index.html`) when serving the site. The loader will inline components so parent CSS and JS apply naturally.
4. If you want strong encapsulation for a component, author it as a Web Component and import it from `index.html` (or have the loader mount into a shadow root).

## Next steps (actions you can take now)
- [ ] Decide whether you want an in-repo POC of the inlining loader (I can implement this: fetch + optional Shadow DOM wrapper).
- [ ] Optionally add a tiny `dev-server` note or a script to make serving easy (e.g., a `start` PowerShell snippet to run Python http.server).
- [ ] Add a sample Web Component (card) to `components/` as an optional pattern.

## Notes
- This README will be kept as the decision log and requirements document for the component loading strategy and styling challenges.
- If you'd like, I can implement the inlining loader and a small Web Component proof-of-concept next — say the word and I will add it and update this README with the exact API and usage details.