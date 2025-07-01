// src/lib/markdown/markdownIt.ts
import MarkdownIt from 'markdown-it';
import { customSyntaxPlugin } from './customPlugin';

const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true
}).use(customSyntaxPlugin); // 👈 your {{custom}} logic

export default md;