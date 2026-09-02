const markdownIt = require("markdown-it");

// Inline rendering only: annotation notes sit inside table cells and guidance
// sits inside a <p>, so block-level markdown would emit a nested <p>. html is
// left off so raw HTML in a source comment is escaped rather than injected.
const inlineMarkdown = markdownIt({ html: false, linkify: false, typographer: false });

module.exports = function (eleventyConfig) {
  // Renders the markdown allowed in /// and //! comments in the SCSS sources.
  // Data files keep the raw text so the published JSON stays source-faithful;
  // the conversion happens here, at the template boundary.
  eleventyConfig.addFilter("inlineMarkdown", function (value) {
    if (!value) return "";
    return inlineMarkdown.renderInline(String(value));
  });

  // Copy assets to output
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch SCSS files (Sass will handle compilation)
  eleventyConfig.addWatchTarget("src/styles/");

  // Set input and output directories
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    pathPrefix: "/brainstorm-mockups/"
  };
};
