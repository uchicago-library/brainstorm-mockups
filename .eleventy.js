const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  // Copy assets to output
  eleventyConfig.addPassthroughCopy("src/assets");

  // Serve the Markdown source of each design_system page alongside its
  // rendered version, so agents consuming this design system from another
  // project can fetch the content without ~91% page chrome.
  //   rendered: /design_system/copywriting/
  //   raw:      /design_system/copywriting.md
  eleventyConfig.addPassthroughCopy({ "src/design_system/*.md": "design_system" });

  // GitHub Pages serves .txt as text/plain with no charset parameter, so
  // browsers fall back to Windows-1252 and mojibake any UTF-8. Headers cannot
  // be set on Pages, so /llms.txt is kept strictly ASCII instead.
  eleventyConfig.addFilter("ascii", (value) =>
    String(value)
      .replace(/—/g, "--") // em dash
      .replace(/–/g, "-") // en dash
      .replace(/[‘’]/g, "'") // curly single quotes
      .replace(/[“”]/g, '"') // curly double quotes
      .replace(/…/g, "...") // ellipsis
      .replace(/ /g, " ") // non-breaking space
      .normalize("NFKD") // decompose accents
      .replace(/[^\x20-\x7E\n]/g, "") // drop anything still non-ASCII
  );

  // Backs the /llms.txt discovery index. Excludes the section landing page,
  // which llms.txt replaces for machine consumers.
  eleventyConfig.addCollection("designSystem", (collectionApi) =>
    collectionApi
      .getFilteredByGlob(["src/design_system/*.md", "src/design_system/*.html"])
      .filter((page) => !page.inputPath.endsWith("/index.html"))
      .sort((a, b) => a.data.title.localeCompare(b.data.title))
  );

  // The HTML reference pages, which get a generated Markdown twin carrying
  // their markup as fenced examples. See src/reference-md.njk.
  eleventyConfig.addCollection("designSystemReference", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/design_system/*.html")
      .filter((page) => !page.inputPath.endsWith("/index.html"))
      .sort((a, b) => a.data.title.localeCompare(b.data.title))
  );

  // Split a rendered reference page into its top-level <section> blocks.
  // Depth-aware rather than regex-split, because layouts.html nests <section>.
  // The annotations <template> is dropped: it is documentation-overlay data,
  // not component markup.
  eleventyConfig.addFilter("referenceSections", (content) => {
    const html = String(content || "").replace(/<template[\s\S]*?<\/template>/gi, "");
    const sections = [];
    const openTag = /<section\b[^>]*>/gi;
    let match;

    while ((match = openTag.exec(html)) !== null) {
      const bodyStart = match.index + match[0].length;
      const scan = /<section\b[^>]*>|<\/section>/gi;
      scan.lastIndex = bodyStart;

      let depth = 1;
      let end = -1;
      let step;
      while ((step = scan.exec(html)) !== null) {
        depth += step[0][1] === "/" ? -1 : 1;
        if (depth === 0) {
          end = step.index;
          break;
        }
      }
      if (end === -1) break; // unbalanced markup; stop rather than guess

      const inner = html.slice(bodyStart, end);
      const h2 = inner.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i);
      // The heading becomes Markdown text, so entities must be decoded
      // ("Badges &amp; Pills" -> "Badges & Pills"). The markup is left alone:
      // entities inside it are real HTML and must survive verbatim.
      const decode = (text) =>
        text
          .replace(/<[^>]+>/g, "")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&") // last, so it cannot re-create other entities
          .trim();
      sections.push({
        title: h2 ? decode(h2[1]) : "",
        markup: (h2 ? inner.replace(h2[0], "") : inner).replace(/\n{3,}/g, "\n\n").trim()
      });

      openTag.lastIndex = end; // skip the whole section, so nested ones are not re-emitted
    }
    return sections;
  });

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
    // opened external links in a new tab, so preserve that here - and add the
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
