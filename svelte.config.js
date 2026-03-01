import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import { rehypeRewriteLinks } from './src/lib/rehype-rewrite-links.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { adapter: adapter() },
	preprocess: [mdsvex({ extensions: ['.md'], rehypePlugins: [rehypeRewriteLinks] })],
	extensions: ['.svelte', '.md']
};

export default config;
