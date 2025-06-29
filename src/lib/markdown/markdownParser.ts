import MarkdownIt from 'markdown-it';
import { customSyntaxPlugin } from './customSyntaxPlugin';

const md = new MarkdownIt({ html: true });
md.use(customSyntaxPlugin);

export function parseMarkdownWithCustom(mdText: string) {
  return md.parse(mdText, {});
}