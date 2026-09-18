// Origin only -- no path prefix, see the note on `origin` below. The dev
// server listens on port 8080, so outside a build this keeps the absolute URLs
// in llms.txt and the reference pages' `source:` field resolving locally
// instead of always pointing at production.
const isBuild = process.env.ELEVENTY_RUN_MODE === "build";

module.exports = {
  name: "UChicago Library Design System",
  // Repo path is not included here: llms.njk/reference-md.njk build URLs as
  // `{{ site.origin }}{{ path | url }}`, and `| url` already prepends
  // .eleventy.js's pathPrefix. Adding it here too doubles it up.
  origin: isBuild ? "https://uchicago-library.github.io" : "http://localhost:8080",
  summary: "Component documentation, design tokens, and usage guidelines for building interfaces consistent with the University of Chicago Library design system."
};
