import { error } from '@sveltejs/kit';
import { getSkillBundle, getAllItems } from '$lib/content';
import JSZip from 'jszip';

export const prerender = true;

export async function GET({ params }) {
	const bundle = await getSkillBundle(params.slug);
	if (!bundle) error(404, 'Not found');

	const zip = new JSZip();
	for (const file of bundle) {
		zip.file(file.path, file.content);
	}

	const blob = await zip.generateAsync({ type: 'uint8array' });

	return new Response(blob, {
		headers: {
			'Content-Type': 'application/zip',
			'Content-Disposition': `attachment; filename="${params.slug}.zip"`
		}
	});
}

export async function entries() {
	const items = await getAllItems();
	return items.filter((item) => item.type === 'skill').map((item) => ({ slug: item.slug }));
}
