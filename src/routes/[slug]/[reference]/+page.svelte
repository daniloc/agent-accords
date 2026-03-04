<script lang="ts">
	import FolderIcon from '$lib/icons/FolderIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';

	let { data } = $props();
	let Content = $derived(data.component);
	let copiedId = $state('');

	async function copy(text: string, id: string) {
		await navigator.clipboard.writeText(text);
		copiedId = id;
		setTimeout(() => (copiedId = ''), 2000);
	}
</script>

<h1>{data.title}</h1>
<a class="download-link detail" href="/{data.parentSlug}/download" data-sveltekit-reload><FolderIcon /> Download in Agent Skill format (.zip)</a>
<button class="download-link detail copy-command" onclick={() => copy('/plugin marketplace add daniloc/agent-accords', 'marketplace')}>
	{#if copiedId === 'marketplace'}
		<span class="copy-feedback">Copied!</span>
	{:else}
		<CopyIcon />
	{/if}
	<code>/plugin marketplace add daniloc/agent-accords</code>
</button>
<button class="download-link detail copy-command" onclick={() => copy(`/plugin install ${data.parentSlug}@agent-accords`, 'install')}>
	{#if copiedId === 'install'}
		<span class="copy-feedback">Copied!</span>
	{:else}
		<CopyIcon />
	{/if}
	<code>/plugin install {data.parentSlug}@agent-accords</code>
</button>

<article class="card">
	<Content />
</article>

{#if data.next}
	<a class="card nav-link next" href={data.next.href}>{data.next.title} &rarr;</a>
{:else}
	<a class="card nav-link" href="/{data.parentSlug}">{data.parentName} &larr;</a>
{/if}
<a class="card nav-link" href={data.prev.href}>&larr; {data.prev.title}</a>
