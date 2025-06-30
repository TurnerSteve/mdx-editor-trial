import MarkdownIt from 'markdown-it';
import { customSyntaxPlugin } from './customPlugin';

export const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
}).use(customSyntaxPlugin);