module.exports = function(eleventyConfig) {
  // Copy assets to dist
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Watch SCSS files (Sass will handle compilation)
  eleventyConfig.addWatchTarget("src/styles/");
  
  // Set input and output directories
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
