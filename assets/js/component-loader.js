// Try to inline component HTML into the parent document when served over http(s).
// When opening files via file:// many browsers block fetch — in that case the <object> embeddings are used instead.
const shouldInline = location.protocol.startsWith('http');
if (shouldInline) {
  document.querySelectorAll('object.component-embed').forEach(async (obj) => {
    const src = obj.getAttribute('data');
    if (!src) return;
    try {
      const res = await fetch(src);
      if (!res.ok) return;
      const text = await res.text();
      // Create a container and copy over the embedded content
      const wrapper = document.createElement('div');
      wrapper.className = 'inlined-component';
      wrapper.innerHTML = text;
      // Replace the object with the real HTML
      obj.replaceWith(wrapper);
    } catch (err) {
      // If fetch fails (CORS or file://) just leave the object
      console.warn('Could not inline component', src, err);
    }
  });
}