/**
 * Component Name Web Component
 * 
 * USAGE:
 * 1. Include this script in your page:
 *    <script src="../components/component-name.js"></script>
 * 
 * 2. Use the component:
 *    <component-name>Content</component-name>
 * 
 * ATTRIBUTES:
 * - Add your custom attributes here
 */

class ComponentName extends HTMLElement {
    connectedCallback() {
        // Get attributes
        const exampleAttr = this.getAttribute('example-attr') || 'default-value';

        // Get element content
        const content = this.textContent.trim() || 'Default content';

        // Create the component HTML
        this.innerHTML = `
      <div class="your-component-class">
        ${content}
      </div>
    `;
    }
}

// Register the custom element (use kebab-case for the tag name)
customElements.define('component-name', ComponentName);
