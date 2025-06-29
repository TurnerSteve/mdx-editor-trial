// $lib/markdown/config.ts
import MarkdownIt from 'markdown-it';

// Initialize markdown-it instance
const md = new MarkdownIt();

// Inline custom rule for {{...}} tokens
md.inline.ruler.before('text', 'custom_inline', (state, silent) => {
  const pos = state.pos;
  const src = state.src;

  if (src.startsWith('{{', pos)) {
    const end = src.indexOf('}}', pos);
    if (end !== -1) {
      if (!silent) {
        const token = state.push('custom_inline', '', 0);
        token.content = src.slice(pos + 2, end).trim();
      }
      state.pos = end + 2;
      return true;
    }
  }
  return false;
});

// Renderer for your custom_inline token
// Remove md.renderer.rules['custom_inline'] = ...

export default md;