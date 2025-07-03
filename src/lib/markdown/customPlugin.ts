import type MarkdownIt from 'markdown-it';

/**
 * A markdown-it plugin to parse custom tags in the form:
 * {{type: Label ; data: some data string}}
 * 
 * Example:
 *   {{hand: My Hand ; data: T987.6.5432.AKQJ}}
 * 
 * This plugin:
 * - Matches `{{...}}` inline tags
 * - Extracts type (e.g. 'hand'), label, and data parts
 * - Renders a `<span>` with data attributes to be hydrated later
 * 
 * To add new components, ensure your hydration code
 * supports the new `type` and your Svelte components
 * accept props `label` and `value` (or `data`).
 */
export function customSyntaxPlugin(md: MarkdownIt) {
  // Disable the default text rule to avoid conflicts
  md.inline.ruler.disable(['text']);

  // Add custom rule for {{...}} tags
  md.inline.ruler.before('text', 'custom_tag', (state, silent) => {
    const pos = state.pos;
    const src = state.src;

    // Check if it starts with {{
    if (src[pos] !== '{' || src[pos + 1] !== '{') return false;

    // Find the closing }}
    const closeIndex = src.indexOf('}}', pos + 2);
    if (closeIndex === -1) return false;

    // Extract content inside {{...}}
    const content = src.slice(pos + 2, closeIndex).trim();

    if (!silent) {
      // Push a custom token with the content
      const token = state.push('custom_tag', '', 0);
      token.content = content;
      token.markup = '{{}}';
    }

    // Advance parser position
    state.pos = closeIndex + 2;
    return true;
  });

  // Renderer for the custom token
  md.renderer.rules['custom_tag'] = (tokens, idx) => {
    const content = tokens[idx].content;

    // Split on first colon to separate type from rest
    const [typePart, rest] = content.split(':', 2);
    const type = typePart.trim().toLowerCase();

    // Initialize label and data
    let label = '';
    let data = '';

    if (rest) {
      // Split rest on semicolon to separate label and data parts
      const parts = rest.split(';');
      
      // Label is the first part before semicolon
      label = parts[0].trim();

      // Data usually follows the "data:" keyword after the semicolon(s)
      if (parts.length > 1) {
        const dataPart = parts.slice(1).join(';').trim();

        // Match "data:" key and capture its value (case-insensitive)
        const dataMatch = dataPart.match(/^data\s*:\s*(.*)$/i);
        if (dataMatch) {
          data = dataMatch[1].trim();
        }
      }
    }

    // Create a unique ID for hydration key (safe for DOM id)
    const id = `${type}:${label}`.replace(/\s+/g, '_');

    // Return a span with data attributes for later hydration
    return `<span 
              data-component="${type}" 
              data-label="${label}" 
              data-value="${data}" 
              data-id="${id}">
            </span>`;
  };
}