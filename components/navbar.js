/**
 * Navbar Web Component
 * 
 * A responsive, accessible navigation bar for the UChicago Library design system.
 * Uses Bootstrap's navbar component with brand colors and proper ARIA attributes.
 * 
 * Slots:
 *   - Default slot: Navigation links and content
 * 
 * Usage:
 *   <navbar-component>
 *     <a href="#" class="nav-link">Link 1</a>
 *     <a href="#" class="nav-link">Link 2</a>
 *   </navbar-component>
 */

class NavbarComponent extends HTMLElement {
    connectedCallback() {
        // Get slot content (nav links)
        const navContent = this.innerHTML.trim();

        // Build the navbar HTML with hardcoded logo and branding
        this.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary" aria-label="Main navigation">
        <div class="container-fluid">
          <!-- Brand/Logo -->
          <a class="navbar-brand d-flex align-items-center" href="/">
            <img src="https://www.lib.uchicago.edu/web-resources/img/white-logo.png" 
                 alt="University of Chicago Library" 
                 height="40" 
                 class="d-inline-block align-text-top me-2"
                 loading="lazy">
            <span class="fw-semibold">Library</span>
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
