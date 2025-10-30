/**
 * Navbar Web Component
 * 
 * A responsive, accessible navigation bar for the UChicago Library design system.
 * Uses Bootstrap's navbar component with brand colors and proper ARIA attributes.
 * 
 * Attributes:
 *   - logo-src: URL to the logo image (default: placeholder)
 *   - logo-alt: Alt text for the logo (default: "UChicago Library")
 *   - brand-text: Text to display next to logo (optional)
 * 
 * Slots:
 *   - Default slot: Navigation links and content
 * 
 * Usage:
 *   <navbar-component logo-src="path/to/logo.png" logo-alt="Logo" brand-text="Library">
 *     <a href="#" class="nav-link">Link 1</a>
 *     <a href="#" class="nav-link">Link 2</a>
 *   </navbar-component>
 */

class NavbarComponent extends HTMLElement {
    connectedCallback() {
        // Get attributes with defaults
        const logoSrc = this.getAttribute('logo-src') || 'https://www.lib.uchicago.edu/web-resources/img/color-logo.png';
        const logoAlt = this.getAttribute('logo-alt') || 'UChicago Library';
        const brandText = this.getAttribute('brand-text') || '';

        // Get slot content (nav links)
        const navContent = this.innerHTML.trim();

        // Build the navbar HTML
        this.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary" aria-label="Main navigation">
        <div class="container-fluid">
          <!-- Brand/Logo -->
          <a class="navbar-brand d-flex align-items-center" href="/">
            <img src="${logoSrc}" 
                 alt="${logoAlt}" 
                 height="40" 
                 class="d-inline-block align-text-top me-2"
                 loading="lazy">
            ${brandText ? `<span class="fw-semibold">${brandText}</span>` : ''}
          </a>
          
          <!-- Mobile Toggle Button -->
          <button class="navbar-toggler" 
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#navbarContent" 
                  aria-controls="navbarContent" 
                  aria-expanded="false" 
                  aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <!-- Navigation Links (Collapsible) -->
          <div class="collapse navbar-collapse" id="navbarContent">
            <div class="navbar-nav ms-auto">
              ${navContent}
            </div>
          </div>
        </div>
      </nav>
    `;
    }
}

// Register the custom element
customElements.define('navbar-component', NavbarComponent);
