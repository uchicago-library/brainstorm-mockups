/**
 * Navbar Web Component
 * 
 * Simple Bootstrap-based navbar for UChicago Library
 * 
 * Usage:
 *   <navbar-component>
 *     <a href="/resources">Resources</a>
 *     <a href="/services">Services</a>
 *     <a href="/research">Research</a>
 *     <a href="/about">About</a>
 *   </navbar-component>
 * 
 * Default links: Resources, Services, Research, About (if no links provided)
 */

class NavbarComponent extends HTMLElement {
  connectedCallback() {
    const defaultLinks = [
      { href: '', text: 'Resources' },
      { href: '', text: 'Services' },
      { href: '', text: 'Research' },
      { href: '', text: 'About' }
    ];
    
    const navId = 'main-navbar';
    
    // Build nav items HTML
    const navItems = defaultLinks.map(link => {
      return `
        <li class="nav-item">
          <a class="nav-link" href="${link.href}">${link.text}</a>
        </li>
      `;
    }).join('');
    
    // Replace component with navbar HTML (clears any children)
    this.innerHTML = `
      <nav class="navbar navbar-expand-md navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img src="https://www.lib.uchicago.edu/web-resources/img/white-logo.png" 
                 alt="University of Chicago Library" 
                 height="40">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                  data-bs-target="#${navId}" aria-controls="${navId}" 
                  aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="${navId}">
            <ul class="navbar-nav ms-auto">
              ${navItems}
            </ul>
          </div>
        </div>
      </nav>
    `;
  }
}

// Register the custom element
customElements.define('navbar-component', NavbarComponent);
