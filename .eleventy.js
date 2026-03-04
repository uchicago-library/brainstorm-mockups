module.exports = function (eleventyConfig) {
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
