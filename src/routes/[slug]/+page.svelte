<script lang="ts">
	import FolderIcon from '$lib/icons/FolderIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';

	let { data } = $props();
	let Content = $derived(data.component);
	let copied = $state(false);

	async function copy() {
		await navigator.clipboard.writeText(`/plugin install ${data.slug}@agent-accords`);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<h1>{data.title}</h1>
{#if data.type === 'skill'}
	<a class="download-link detail" href="/{data.slug}/download" data-sveltekit-reload><FolderIcon /> Download in Agent Skill format (.zip)</a>
	<button class="download-link detail copy-command" onclick={copy}>
		{#if copied}
			<span class="copy-feedback">Copied!</span>
		{:else}
			<CopyIcon />
		{/if}
		<code>/plugin install {data.slug}@agent-accords</code>
	</button>
{/if}

<article class="card">
	<Content />
</article>

{#if data.type === 'skill' && data.references.length > 0}
	<a class="card nav-link next" href="/{data.slug}/{data.references[0].slug}">
		Next: {data.references[0].title} &rarr;
	</a>
{/if}
