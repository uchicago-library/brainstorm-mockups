/**
 * Example Button Web Component
 * 
 * USAGE:
 * 1. Include this script in your page:
 *    <script src="../components/example-button.js"></script>
 * 
 * 2. Use the component:
 *    <example-button>Click Me</example-button>
 *    <example-button variant="secondary">Cancel</example-button>
 * 
 * ATTRIBUTES:
 * - variant: 'custom' (default), 'primary', 'secondary', etc.
 * - size: 'sm', 'lg'
 * - Any standard button attributes (disabled, type, etc.)
 */

class ExampleButton extends HTMLElement {
    connectedCallback() {
        // Get attributes
        const variant = this.getAttribute('variant') || 'custom';
        const size = this.getAttribute('size') || '';
        const disabled = this.hasAttribute('disabled');
        const type = this.getAttribute('type') || 'button';

        // Get button text from element content
        const text = this.textContent.trim() || 'Button';

        // Build class list
        const classes = ['btn', `btn-${variant}`];
        if (size) classes.push(`btn-${size}`);

        // Create button
        this.innerHTML = `
      <button 
        type="${type}" 
        class="${classes.join(' ')}"
        ${disabled ? 'disabled' : ''}
      >
        ${text}
      </button>
    `;
    }
}

// Register the custom element
customElements.define('example-button', ExampleButton);
