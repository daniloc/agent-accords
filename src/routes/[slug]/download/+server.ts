import { error } from '@sveltejs/kit';
import { getRawSkill, getAllItems } from '$lib/content';

export const prerender = true;

export async function GET({ params }) {
	const raw = await getRawSkill(params.slug);
	if (!raw) error(404, 'Not found');

	return new Response(raw, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Content-Disposition': `attachment; filename="SKILL.md"`
		}
	});
}

export async function entries() {
	const items = await getAllItems();
	return items.filter((item) => item.type === 'skill').map((item) => ({ slug: item.slug }));
}
