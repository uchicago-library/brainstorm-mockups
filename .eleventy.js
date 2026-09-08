module.exports = function (eleventyConfig) {
  // Copy assets to output
  eleventyConfig.addPassthroughCopy("src/assets");

  // Build breadcrumb trail from a page URL (page.url does NOT include pathPrefix).
  // Returns [{url, label}] for use with | url in templates.
  // Labels come from matching index page titles in collections.all; falls back to
  // a slug-to-title transform (hyphens/underscores → spaces, title-cased).
  eleventyConfig.addFilter("buildBreadcrumbs", (pageUrl, allPages) => {
    const segments = pageUrl.split("/").filter(Boolean);
    return segments.map((seg, i) => {
      const segUrl = "/" + segments.slice(0, i + 1).join("/") + "/";
      const match = allPages.find((p) => p.url === segUrl);
      const label = match
        ? match.data.title
        : seg
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
      return { url: segUrl, label };
    });
  });

  // True if a collection page is a directory index file (inputPath ends with index.html).
  eleventyConfig.addFilter("isIndexPage", (p) => {
    const inputPath = p.inputPath || (p.page && p.page.inputPath) || "";
    return inputPath.replace(/\\/g, "/").endsWith("/index.html");
  });

  // Number of path segments in a URL (e.g. "/design_system/foundation/" → 2).
  eleventyConfig.addFilter("urlDepth", (url) => url.split("/").filter(Boolean).length);

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
