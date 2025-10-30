# Brand Color Palette

Official University of Chicago Library color palette and usage guidelines.

## Bootstrap Semantic Color Mapping

These are the mappings from our brand colors to Bootstrap's semantic color system:

| Bootstrap Semantic | Brand Color | HEX | RGB | Usage |
|-------------------|-------------|-----|-----|-------|
| **Primary** | Maroon | `#800000` | `128, 0, 0` | Main brand color, CTAs, important actions |
| **Secondary** | Dark Greystone | `#737373` | `115, 115, 115` | Secondary actions, neutral elements |
| **Success** | Ivy | `#789D4A` | `120, 157, 74` | Success messages, positive confirmations |
| **Info** | Lake | `#007396` | `0, 115, 150` | Informational messages, notes |
| **Warning** | Goldenrod | `#EAAA00` | `234, 170, 0` | Warnings, cautions, alerts |
| **Danger** | Brick | `#A4343A` | `164, 52, 58` | Errors, destructive actions |
| **Light** | Light Greystone | `#D9D9D9` | `217, 217, 217` | Light backgrounds, borders |
| **Dark** | Black | `#000000` | `0, 0, 0` | Dark backgrounds, text |

---

## Complete Brand Color Palette

### Primary Colors

| Color Name | HEX | RGB | CSS Variable | Usage |
|------------|-----|-----|--------------|-------|
| **Maroon** | `#800000` | `128, 0, 0` | `--brand-maroon` | Primary brand color |
| **Light Greystone** | `#D9D9D9` | `217, 217, 217` | `--brand-light-greystone` | Light neutrals, borders |
| **Greystone** | `#A6A6A6` | `166, 166, 166` | `--brand-greystone` | Medium neutrals |
| **Dark Greystone** | `#737373` | `115, 115, 115` | `--brand-dark-greystone` | Dark neutrals, text |

### Secondary Colors - Warm Tones

**Goldenrod Family:**
| Color Name | HEX | RGB | CSS Variable | Usage |
|------------|-----|-----|--------------|-------|
| **Goldenrod** | `#EAAA00` | `234, 170, 0` | `--brand-goldenrod` | Warnings, highlights |
| **Light Goldenrod** | `#F3D03E` | `243, 208, 62` | `--brand-light-goldenrod` | Lighter accents |
| **Dark Goldenrod** | `#CC8A00` | `204, 138, 0` | `--brand-dark-goldenrod` | Darker accents |

**Terracotta Family:**
| Color Name | HEX | RGB | CSS Variable | Usage |
|------------|-----|-----|--------------|-------|
| **Terracotta** | `#DE7C00` | `222, 124, 0` | `--brand-terracotta` | Warm accents |
| **Light Terracotta** | `#ECA154` | `236, 161, 84` | `--brand-light-terracotta` | Lighter accents |
| **Dark Terracotta** | `#A9431E` | `169, 67, 30` | `--brand-dark-terracotta` | Darker accents |

### Secondary Colors - Green Tones

**Ivy Family:**
| Color Name | HEX | RGB | CSS Variable | Usage |
|------------|-----|-----|--------------|-------|
| **Ivy** | `#789D4A` | `120, 157, 74` | `--brand-ivy` | Success states, nature |
| **Light Ivy** | `#A9C47F` | `169, 196, 127` | `--brand-light-ivy` | Lighter accents |
| **Dark Ivy** | `#13301C` | `19, 48, 28` | `--brand-dark-ivy` | Darker accents |

**Forest Family:**
| Color Name | HEX | RGB | CSS Variable | Usage |
|------------|-----|-----|--------------|-------|
| **Forest** | `#275D38` | `39, 93, 56` | `--brand-forest` | Deep green accents |
| **Light Forest** | `#9CAF88` | `156, 175, 136` | `--brand-light-forest` | Lighter accents |
| **Dark Forest** | `#284734` | `40, 71, 52` | `--brand-dark-forest` | Darker accents |

### Secondary Colors - Blue Tones

**Lake Family:**
| Color Name | HEX | RGB | CSS Variable | Usage |
|------------|-----|-----|--------------|-------|
| **Lake** | `#007396` | `0, 115, 150` | `--brand-lake` | Info states, links |
| **Light Lake** | `#3EB1C8` | `62, 177, 200` | `--brand-light-lake` | Lighter accents |
| **Dark Lake** | `#002A3A` | `0, 42, 58` | `--brand-dark-lake` | Darker accents |

### Secondary Colors - Purple/Red Tones

**Violet Family:**
| Color Name | HEX | RGB | CSS Variable | Usage |
|------------|-----|-----|--------------|-------|
| **Violet** | `#59315F` | `89, 49, 95` | `--brand-violet` | Purple accents |
| **Light Violet** | `#86647A` | `134, 100, 122` | `--brand-light-violet` | Lighter accents |
| **Dark Violet** | `#41273B` | `65, 39, 59` | `--brand-dark-violet` | Darker accents |

**Brick Family:**
| Color Name | HEX | RGB | CSS Variable | Usage |
|------------|-----|-----|--------------|-------|
| **Brick** | `#A4343A` | `164, 52, 58` | `--brand-brick` | Error states, alerts |
| **Light Brick** | `#B46A55` | `180, 106, 85` | `--brand-light-brick` | Lighter accents |
| **Dark Brick** | `#643335` | `100, 51, 53` | `--brand-dark-brick` | Darker accents |

### Neutrals

| Color Name | HEX | RGB | CSS Variable | Usage |
|------------|-----|-----|--------------|-------|
| **White** | `#FFFFFF` | `255, 255, 255` | N/A | Backgrounds, text |
| **Black** | `#000000` | `0, 0, 0` | N/A | Text, dark elements |

---

## Usage in Code

### Using Bootstrap Semantic Colors

```html
<!-- Primary (Maroon) -->
<button class="btn btn-primary">Primary Button</button>

<!-- Success (Ivy) -->
<div class="alert alert-success">Success message</div>

<!-- Warning (Goldenrod) -->
<div class="alert alert-warning">Warning message</div>

<!-- Info (Lake) -->
<div class="alert alert-info">Info message</div>

<!-- Danger (Brick) -->
<div class="alert alert-danger">Error message</div>
```

### Using Brand Colors Directly

```html
<!-- Using CSS variables -->
<div style="background-color: var(--brand-terracotta); color: white;">
  Terracotta background
</div>

<!-- Using with custom classes -->
<style>
  .highlight-goldenrod {
    background-color: var(--brand-light-goldenrod);
    border-left: 4px solid var(--brand-goldenrod);
  }
</style>
```

---

## Color Accessibility Guidelines

### Contrast Ratios

Ensure sufficient contrast for accessibility (WCAG AA minimum):
- **Normal text**: 4.5:1 contrast ratio
- **Large text** (18pt+): 3:1 contrast ratio

### Recommended Combinations

**High Contrast (Safe for all text):**
- Maroon (#800000) on White (#FFFFFF) ✅
- Black (#000000) on White (#FFFFFF) ✅
- White (#FFFFFF) on Dark Lake (#002A3A) ✅
- White (#FFFFFF) on Dark Ivy (#13301C) ✅

**Use with Caution (Large text only):**
- Dark Greystone (#737373) on White
- Light Goldenrod (#F3D03E) on White
- Light Ivy (#A9C47F) on White

**Avoid for Text:**
- Light colors on white backgrounds
- Similar tones (e.g., Greystone on Light Greystone)

---

## Color Families & Usage Suggestions

### When to Use Each Color Family

**Primary (Maroon + Greystones):**
- Main navigation
- Headings
- Primary CTAs
- Brand presence

**Goldenrod Family (Warm Yellow):**
- Warnings and cautions
- Highlights and callouts
- Energetic accents
- Special events

**Terracotta Family (Orange):**
- Secondary CTAs
- Warm, inviting sections
- Cultural/community content
- Events and programs

**Ivy/Forest (Green):**
- Success confirmations
- Environmental/sustainability content
- Growth and learning
- Positive messaging

**Lake (Blue):**
- Informational content
- Links and navigation
- Trust and reliability
- Academic content

**Violet (Purple):**
- Creative sections
- Special collections
- Arts and humanities
- Unique content areas

**Brick (Red):**
- Errors and warnings
- Critical information
- Urgent alerts
- Important deadlines

---

## Design System Integration

All colors are available as:
1. **Bootstrap semantic classes** (e.g., `.btn-primary`, `.alert-success`)
2. **CSS custom properties** (e.g., `var(--brand-ivy)`)
3. **Bootstrap gray scale** (`--bs-gray-100` through `--bs-gray-900`)

See `assets/css/custom-variables.css` for the complete variable definitions.
