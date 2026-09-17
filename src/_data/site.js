// The dev server always runs on http://localhost:8080 (see CLAUDE.md); this
// keeps absolute URLs in llms.txt and the reference pages' `source:` field
// working when testing locally, instead of always pointing at production.
const isBuild = process.env.ELEVENTY_RUN_MODE === "build";

module.exports = {
  name: "UChicago Library Design System",
  // Repo path is not included here: llms.njk/reference-md.njk build URLs as
  // `{{ site.origin }}{{ path | url }}`, and `| url` already prepends
  // .eleventy.js's pathPrefix. Adding it here too doubles it up.
  origin: isBuild ? "https://uchicago-library.github.io" : "http://localhost:8080",
  summary: "Component documentation, design tokens, and usage guidelines for building interfaces consistent with the University of Chicago Library design system."
};
