import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import { rehypeRewriteLinks } from './src/lib/rehype-rewrite-links.js';

// mdsvex destructures frontmatter keys as locals, which collides when
// a key is named "metadata" (same as mdsvex's own export). This
// preprocessor runs after mdsvex and renames the destructured binding.
const fixMetadataCollision = {
	markup: ({ content, filename }) => {
		if (!filename?.endsWith('.md')) return;
		const fixed = content.replace(
			/const \{([^}]*)\bmetadata\b([^}]*)\} = metadata;/,
			(_, before, after) => `const {${before}metadata: _meta${after}} = metadata;`
		);
		if (fixed !== content) return { code: fixed };
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { adapter: adapter() },
	preprocess: [
		mdsvex({ extensions: ['.md'], rehypePlugins: [rehypeRewriteLinks] }),
		fixMetadataCollision
	],
	extensions: ['.svelte', '.md']
};

export default config;
