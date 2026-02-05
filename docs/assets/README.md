# Assets Directory

This directory contains static assets for the design system documentation site.

## Directory Structure

```
assets/
├── images/          # Image files
│   ├── color-logo.png        # UChicago Library color logo (for header)
│   └── unvlogo-white.png     # University of Chicago white logo (for footer)
├── fonts/           # Custom fonts (if needed)
└── icons/           # Custom icon files (if needed)
```

## Required Images

The following images are referenced in the header and footer components and need to be added:

1. **color-logo.png** - University of Chicago Library logo in color (for header)
   - Recommended size: Transparent PNG, max height 50px
   
2. **unvlogo-white.png** - University of Chicago logo in white (for footer)
   - Recommended size: PNG, width ~150px

## Adding Images

1. Place image files in the appropriate subdirectory
2. Reference them in HTML using relative paths: `/assets/images/filename.png`
3. Ensure images are optimized for web (compressed, appropriate format)

## Notes

- All images should be optimized for web performance
- Use WebP format where possible for better compression
- Provide alt text for all images for accessibility
- Logos should maintain proper aspect ratios
