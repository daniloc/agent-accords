<script lang="ts">
	import FolderIcon from '$lib/icons/FolderIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import posthog from 'posthog-js';

	let { data } = $props();
	let Content = $derived(data.component);
	let copiedId = $state('');

	async function copy(text: string, id: string, commandType: 'marketplace' | 'install') {
		await navigator.clipboard.writeText(text);
		copiedId = id;
		setTimeout(() => (copiedId = ''), 2000);
		posthog.capture('command_copied', {
			command_type: commandType,
			skill_slug: data.parentSlug,
			location: 'reference'
		});
	}

	function trackDownload() {
		posthog.capture('skill_downloaded', {
			skill_slug: data.parentSlug,
			reference_title: data.title
		});
	}
</script>

<svelte:head>
	<title>{data.title} · {data.parentName} · Agent accords</title>
</svelte:head>

<h1>{data.title}</h1>
<div class="action-bar">
	<button
		class="download-link detail copy-command"
		onclick={() =>
			copy('/plugin marketplace add daniloc/agent-accords', 'marketplace', 'marketplace')}
	>
		{#if copiedId === 'marketplace'}
			<span class="copy-feedback">Copied!</span>
		{:else}
			<CopyIcon />
		{/if}
		<code>/plugin marketplace add daniloc/agent-accords</code>
	</button>
	<button
		class="download-link detail copy-command"
		onclick={() => copy(`/plugin install accords@agent-accords`, 'install', 'install')}
	>
		{#if copiedId === 'install'}
			<span class="copy-feedback">Copied!</span>
		{:else}
			<CopyIcon />
		{/if}
		<code>/plugin install accords@agent-accords</code>
	</button>
	<a
		class="download-link detail"
		href="/{data.parentSlug}/download"
		data-sveltekit-reload
		onclick={trackDownload}><FolderIcon /> Download (.zip)</a
	>
</div>

<article class="card">
	<Content />
</article>

{#if data.next}
	<a class="card nav-link next" href={data.next.href}>{data.next.title} &rarr;</a>
{:else}
	<a class="card nav-link" href="/{data.parentSlug}">{data.parentName} &larr;</a>
{/if}
<a class="card nav-link" href={data.prev.href}>&larr; {data.prev.title}</a>
