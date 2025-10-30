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
 * 
 * TIP: Install VSCode extension "es6-string-html" for HTML syntax highlighting
 */

// Simple html tag for better VSCode syntax highlighting
const html = (strings, ...values) => String.raw({ raw: strings }, ...values);

class ComponentName extends HTMLElement {
    connectedCallback() {
        // Get attributes
        const exampleAttr = this.getAttribute('example-attr') || 'default-value';

        // Get element content
        const content = this.textContent.trim() || 'Default content';

        // Create the component HTML
        // Use html`` tagged template for better syntax highlighting
        this.innerHTML = html`
      <div class="your-component-class">
        <h3>${exampleAttr}</h3>
        <p>${content}</p>
      </div>
    `;
    }
}

// Register the custom element (use kebab-case for the tag name)
customElements.define('component-name', ComponentName);
