# Assets

Static files copied verbatim into the build. Eleventy passes this whole directory through
to `_site/assets/`, so anything added here is published at the same relative path.

```text
assets/
├── images/   # Sample photography used by mockups, plus a fallback favicon
└── js/       # Small scripts loaded directly by pages
```

## Referencing an asset

Use the `url` filter so the `/ucld/` path prefix is applied:

```text
{{ '/assets/images/filename.jpg' | url }}
```

A bare `/assets/...` path will break on the deployed site, which is served under a prefix.

## Notes

- **Logos are not stored here.** The header and footer load them from
  `https://www.lib.uchicago.edu/web-resources/img/`, so they stay in step with the main
  Library site. The same is true of the brand fonts and the production favicon.
- The images in `images/` are sample photography for mockups, not brand assets.
- Every `<img>` needs an `alt` attribute; decorative images take `alt=""`. This is checked
  by `npm run a11y` and will fail the build.
- This file is excluded from the rendered site by an `ignores` rule in `.eleventy.js`, so
  it does not become a page. The raw file is still copied with the rest of the directory.
