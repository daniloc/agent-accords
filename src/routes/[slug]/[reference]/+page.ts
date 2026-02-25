import { error } from '@sveltejs/kit';
import { getReference, getAllItems } from '$lib/content';

export async function load({ params }) {
	const ref = await getReference(params.slug, params.reference);
	if (!ref) error(404, 'Not found');

	return {
		component: ref.component,
		title: ref.title,
		parentSlug: ref.parentSlug,
		parentName: ref.parentName,
		prev: ref.prev,
		next: ref.next
	};
}

export async function entries() {
	const items = await getAllItems();
	return items
		.filter((item) => item.type === 'skill')
		.flatMap((item) =>
			item.references.map((ref) => ({
				slug: item.slug,
				reference: ref.slug
			}))
		);
}
