const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  // Copy assets to output
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch SCSS files (Sass will handle compilation)
  eleventyConfig.addWatchTarget("src/styles/");

  // Markdown adjustments for documentation pages.
  // amendLibrary (not setLibrary) mutates Eleventy's already-configured
  // markdown-it instance, preserving its html:true and disable("code") defaults.
  eleventyConfig.amendLibrary("md", (mdLib) => {
    // Markdown pipe tables carry no classes. Give them the same Bootstrap
    // treatment and responsive wrapper the hand-written pages use.
    mdLib.renderer.rules.table_open = () =>
      '<div class="table-responsive"><table class="table table-bordered table-sm">';
    mdLib.renderer.rules.table_close = () => "</table></div>";

    // markdown-it adds no heading ids, which in-page navigation depends on.
    mdLib.use(markdownItAnchor, {
      level: [2, 3, 4],
      // The default slugify keeps punctuation, producing ids like
      // "usability-heuristics-(nielsen's-10)". Strip it for clean fragments.
      slugify: (heading) => {
        const slug = String(heading)
          .trim()
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");
        return slug || "section";
      }
    });

    // Markdown link syntax cannot express target/rel. The hand-written pages
    // opened external links in a new tab, so preserve that here — and add the
    // rel="noopener noreferrer" those pages were missing.
    const defaultLinkOpen =
      mdLib.renderer.rules.link_open ||
      ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

    mdLib.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      const href = tokens[idx].attrGet("href") || "";
      if (/^https?:\/\//i.test(href) && !/lib\.uchicago\.edu/i.test(href)) {
        tokens[idx].attrSet("target", "_blank");
        tokens[idx].attrSet("rel", "noopener noreferrer");
      }
      return defaultLinkOpen(tokens, idx, options, env, self);
    };
  });

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
