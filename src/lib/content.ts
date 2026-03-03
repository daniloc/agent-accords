import type { Component } from 'svelte';

interface MdMetadata {
	name?: string;
	title?: string;
	description?: string;
	presentation?: {
		order?: string[];
	};
	[key: string]: unknown;
}

interface MdModule {
	default: Component;
	metadata?: MdMetadata;
}

export interface ContentItem {
	slug: string;
	name: string;
	title: string;
	description: string;
	type: 'standalone' | 'skill';
	references: { slug: string; title: string }[];
}

export interface ResolvedItem extends ContentItem {
	component: Component;
}

export interface NavLink {
	href: string;
	title: string;
}

export interface ResolvedReference {
	slug: string;
	title: string;
	component: Component;
	parentSlug: string;
	parentName: string;
	prev: NavLink;
	next: NavLink | null;
}

const modules = import.meta.glob<MdModule>('/contents/**/*.md');

const rawModules = import.meta.glob<string>('/contents/**/*.md', {
	query: '?raw',
	import: 'default'
});

function slugFromPath(path: string): string {
	return path.split('/').pop()!.replace('.md', '');
}

function isSkill(path: string): boolean {
	return path.endsWith('/SKILL.md');
}

function isReference(path: string): boolean {
	return path.includes('/references/');
}

function skillSlugFromPath(path: string): string {
	// e.g. /contents/accords/what-is-software/SKILL.md → what-is-software
	// e.g. /contents/accords/what-is-software/references/foo.md → what-is-software
	const parts = path.split('/');
	if (isSkill(path)) {
		return parts[parts.length - 2];
	}
	// reference file: go up past references/
	const refIdx = parts.indexOf('references');
	return parts[refIdx - 1];
}

// Build an index of all content items and their references
function buildIndex(): Map<string, { path: string; refPaths: Map<string, string> }> {
	const index = new Map<string, { path: string; refPaths: Map<string, string> }>();

	for (const path of Object.keys(modules)) {
		if (isSkill(path)) {
			const slug = skillSlugFromPath(path);
			if (!index.has(slug)) {
				index.set(slug, { path, refPaths: new Map() });
			} else {
				index.get(slug)!.path = path;
			}
		} else if (isReference(path)) {
			const skill = skillSlugFromPath(path);
			const refSlug = slugFromPath(path);
			if (!index.has(skill)) {
				index.set(skill, { path: '', refPaths: new Map([[refSlug, path]]) });
			} else {
				index.get(skill)!.refPaths.set(refSlug, path);
			}
		} else {
			// standalone .md
			const slug = slugFromPath(path);
			index.set(slug, { path, refPaths: new Map() });
		}
	}

	return index;
}

const index = buildIndex();

const titleFromSlug = (s: string) => s.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

async function buildReferences(
	refPaths: Map<string, string>,
	order?: string[]
): Promise<{ slug: string; title: string }[]> {
	const slugs = order ? order.filter((s) => refPaths.has(s)) : [...refPaths.keys()];

	return Promise.all(
		slugs.map(async (s) => {
			const mod = await modules[refPaths.get(s)!]();
			return { slug: s, title: mod.metadata?.title ?? titleFromSlug(s) };
		})
	);
}

export async function getAllItems(): Promise<ContentItem[]> {
	const items: ContentItem[] = [];

	for (const [slug, entry] of index) {
		if (!entry.path) continue;

		const mod = await modules[entry.path]();
		const isSkillItem = entry.path.endsWith('/SKILL.md');

		items.push({
			slug,
			name: mod.metadata?.name ?? slug,
			title: mod.metadata?.title ?? mod.metadata?.name ?? slug,
			description: mod.metadata?.description ?? '',
			type: isSkillItem ? 'skill' : 'standalone',
			references: await buildReferences(entry.refPaths, mod.metadata?.presentation?.order)
		});
	}

	return items;
}

export async function getItem(slug: string): Promise<ResolvedItem | undefined> {
	const entry = index.get(slug);
	if (!entry?.path) return undefined;

	const mod = await modules[entry.path]();
	const isSkillItem = entry.path.endsWith('/SKILL.md');

	return {
		slug,
		name: mod.metadata?.name ?? slug,
		title: mod.metadata?.title ?? mod.metadata?.name ?? slug,
		description: mod.metadata?.description ?? '',
		type: isSkillItem ? 'skill' : 'standalone',
		references: await buildReferences(entry.refPaths, mod.metadata?.presentation?.order),
		component: mod.default
	};
}

export async function getReference(
	skill: string,
	refSlug: string
): Promise<ResolvedReference | undefined> {
	const entry = index.get(skill);
	if (!entry) return undefined;

	const refPath = entry.refPaths.get(refSlug);
	if (!refPath) return undefined;

	const mod = await modules[refPath]();
	const skillMod = await modules[entry.path]();

	const refs = await buildReferences(entry.refPaths, skillMod.metadata?.presentation?.order);
	const currentIndex = refs.findIndex((r) => r.slug === refSlug);
	const parentTitle = skillMod.metadata?.title ?? skillMod.metadata?.name ?? skill;

	const prev: NavLink =
		currentIndex > 0
			? { href: `/${skill}/${refs[currentIndex - 1].slug}`, title: refs[currentIndex - 1].title }
			: { href: `/${skill}`, title: parentTitle };

	const next: NavLink | null =
		currentIndex < refs.length - 1
			? { href: `/${skill}/${refs[currentIndex + 1].slug}`, title: refs[currentIndex + 1].title }
			: null;

	return {
		slug: refSlug,
		title: mod.metadata?.title ?? titleFromSlug(refSlug),
		component: mod.default,
		parentSlug: skill,
		parentName: parentTitle,
		prev,
		next
	};
}

const SITE_ORIGIN = 'https://accord.exchange';

function processForPublishing(raw: string, route: string): string {
	const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
	if (!fmMatch) return raw;

	let frontmatter = fmMatch[1];
	// Strip presentation (site-only concern)
	frontmatter = frontmatter.replace(/^presentation:.*(?:\n[ \t]+.*)*/m, '');
	// Inject url derived from route
	frontmatter = `url: ${SITE_ORIGIN}${route}\n${frontmatter}`;
	frontmatter = frontmatter.trim();

	const body = raw.slice(fmMatch[0].length);
	return `---\n${frontmatter}\n---${body}`;
}

export async function getRawSkill(slug: string): Promise<string | undefined> {
	const entry = index.get(slug);
	if (!entry?.path || !entry.path.endsWith('/SKILL.md')) return undefined;

	const resolver = rawModules[entry.path];
	if (!resolver) return undefined;

	const raw = await resolver();
	return processForPublishing(raw, `/${slug}`);
}

export async function getSkillBundle(
	slug: string
): Promise<{ path: string; content: string }[] | undefined> {
	const entry = index.get(slug);
	if (!entry?.path || !entry.path.endsWith('/SKILL.md')) return undefined;

	const skillResolver = rawModules[entry.path];
	if (!skillResolver) return undefined;

	const files: { path: string; content: string }[] = [];

	const skillRaw = await skillResolver();
	files.push({ path: `${slug}/SKILL.md`, content: processForPublishing(skillRaw, `/${slug}`) });

	for (const [refSlug, refPath] of entry.refPaths) {
		const refResolver = rawModules[refPath];
		if (!refResolver) continue;
		const refRaw = await refResolver();
		files.push({
			path: `${slug}/references/${refSlug}.md`,
			content: processForPublishing(refRaw, `/${slug}/${refSlug}`)
		});
	}

	return files;
}

export async function getRawReference(
	skill: string,
	refSlug: string
): Promise<string | undefined> {
	const entry = index.get(skill);
	if (!entry) return undefined;

	const refPath = entry.refPaths.get(refSlug);
	if (!refPath) return undefined;

	const resolver = rawModules[refPath];
	if (!resolver) return undefined;

	const raw = await resolver();
	return processForPublishing(raw, `/${skill}/${refSlug}`);
}
