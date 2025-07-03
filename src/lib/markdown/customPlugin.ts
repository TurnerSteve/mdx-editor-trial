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
		const content = src.slice(pos + 2, closeIndex).trim();
		if (!silent) {
			console.log('[plugin] Found custom tag:', content);
			const token = state.push('custom_tag', '', 0);
			token.content = content;
			token.markup = '{{}}';
		}

		state.pos = closeIndex + 2;
		return true;
	});

	md.renderer.rules['custom_tag'] = (tokens, idx) => {
		const content = tokens[idx].content;
		// Extract type and rest
		const [type, ...rest] = content.split(':');
		const restStr = rest.join(':').trim();

		// Extract value and params (e.g. label=North)
		const parts = restStr.split(/\s+/);
		const value = parts[0];
		const params = parts.slice(1);

		// Convert params to data- attributes
		let dataAttrs = `data-value="${value}" data-component="${type.toLowerCase()}"`;
		for (const param of params) {
			const [k, v] = param.split('=');
			if (k && v) {
				dataAttrs += ` data-${k}="${v}"`;
			}
		}

		const id = `${type}:${value}`.replace(/\s+/g, '_');
		dataAttrs += ` data-id="${id}"`;

		return `<span ${dataAttrs}></span>`;
	};
}
