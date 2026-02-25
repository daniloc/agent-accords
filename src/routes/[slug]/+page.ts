import { error } from '@sveltejs/kit';
import { getItem, getAllItems } from '$lib/content';

export async function load({ params }) {
	const item = await getItem(params.slug);
	if (!item) error(404, 'Not found');

	return {
		component: item.component,
		name: item.name,
		description: item.description,
		type: item.type,
		slug: item.slug,
		references: item.references
	};
}

export async function entries() {
	const items = await getAllItems();
	return items.map((item) => ({ slug: item.slug }));
}
