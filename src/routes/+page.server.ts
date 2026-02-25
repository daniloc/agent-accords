import { getAllItems } from '$lib/content';

export async function load() {
	const items = await getAllItems();
	return { items };
}
