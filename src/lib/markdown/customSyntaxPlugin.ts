import type MarkdownIt from 'markdown-it';

export function customSyntaxPlugin(md: MarkdownIt) {
  // Inline rule to parse {{...}} commands
  md.inline.ruler.before('emphasis', 'custom_command', (state, silent) => {
    const start = state.pos;
    if (state.src.charCodeAt(start) !== 0x7b /* { */ ||
        state.src.charCodeAt(start + 1) !== 0x7b /* { */) {
      return false;
    }

    const end = state.src.indexOf('}}', start);
    if (end === -1) return false;

    if (!silent) {
      const token = state.push('custom_command', '', 0);
      token.content = state.src.slice(start + 2, end).trim();
    }

    state.pos = end + 2;
    return true;
  });

  // Renderer for the token type - just output placeholder for now
  md.renderer.rules.custom_command = (tokens, idx) => {
    const content = tokens[idx].content;
    // Return a placeholder span with data-command attribute or similar
    return `<span data-custom-command="${content}"></span>`;
  };
}