// src/lib/markdown/markdownIt.ts
import MarkdownIt from 'markdown-it';
import { customSyntaxPlugin } from './customPlugin';

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true
}).use(customSyntaxPlugin); // 👈 your {{custom}} logic

export default md;