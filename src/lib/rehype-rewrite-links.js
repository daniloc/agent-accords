import { visit } from 'unist-util-visit';

/**
 * Rehype plugin that rewrites relative `references/*.md` links
 * to site routes like `/{skill-slug}/{reference-slug}`.
 *
 * mdsvex passes the source file path via `data.filename` on the vfile.
 */
export function rehypeRewriteLinks() {
	return (tree, file) => {
		const filename = file.filename || file.history?.[0] || '';

		// Extract the skill slug from the file path
		// e.g. /contents/accords/what-is-software/SKILL.md → what-is-software
		const match = filename.match(/\/contents\/.*\/([^/]+)\/(?:SKILL\.md|references\/)/);
		if (!match) return;

		const skillSlug = match[1];

		visit(tree, 'element', (node) => {
			if (node.tagName !== 'a') return;
			const href = node.properties?.href;
			if (typeof href !== 'string') return;

			const refMatch = href.match(/^references\/([^/]+)\.md$/);
			if (refMatch) {
				node.properties.href = `/${skillSlug}/${refMatch[1]}`;
			}
		});
	};
}
