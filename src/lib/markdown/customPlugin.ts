import type MarkdownIt from 'markdown-it';

export function customSyntaxPlugin(md: MarkdownIt) {
  // Remove the default 'text' rule
  md.inline.ruler.disable(['text']);

  // Add our custom rule to parse {{...}} tags
  md.inline.ruler.before('text', 'custom_tag', (state, silent) => {
    const pos = state.pos;
    const src = state.src;

    if (src[pos] !== '{' || src[pos + 1] !== '{') {
      return false;
    }

    const closeIndex = src.indexOf('}}', pos + 2);
    if (closeIndex === -1) {
      return false;
    }

    if (!silent) {
      const content = src.slice(pos + 2, closeIndex).trim();

      const token = state.push('custom_tag', '', 0);
      token.content = content;
      token.markup = '{{}}';
    }

    state.pos = closeIndex + 2;
    return true;
  });

  md.renderer.rules['custom_tag'] = (tokens, idx) => {
    const content = tokens[idx].content;
    const [type, ...rest] = content.split(':');
    const value = rest.join(':').trim();
    return `<span data-custom-tag="${type.toLowerCase()}">${value}</span>`;
  };
}