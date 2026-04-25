<script lang="ts">
	import { onMount } from 'svelte';
	import FolderIcon from '$lib/icons/FolderIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import posthog from 'posthog-js';

	let { data } = $props();
	let Content = $derived(data.component);
	let copiedId = $state('');

	onMount(() => {
		if (data.type === 'skill') {
			posthog.capture('skill_viewed', {
				skill_slug: data.slug,
				skill_title: data.title
			});
		}
	});

	async function copy(text: string, id: string, commandType: 'marketplace' | 'install') {
		await navigator.clipboard.writeText(text);
		copiedId = id;
		setTimeout(() => (copiedId = ''), 2000);
		posthog.capture('command_copied', {
			command_type: commandType,
			skill_slug: data.slug,
			location: 'skill_detail'
		});
	}

	function trackDownload() {
		posthog.capture('skill_downloaded', {
			skill_slug: data.slug,
			skill_title: data.title
		});
	}
</script>

<svelte:head>
	<title>{data.title} · Agent accords</title>
</svelte:head>

<h1>{data.title}</h1>
{#if data.type === 'skill'}
	<a
		class="download-link detail"
		href="/{data.slug}/download"
		data-sveltekit-reload
		onclick={trackDownload}><FolderIcon /> Download in Agent Skill format (.zip)</a
	>
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
{/if}

<article class="card">
	<Content />
</article>

{#if data.type === 'skill' && data.references.length > 0}
	<a class="card nav-link next" href="/{data.slug}/{data.references[0].slug}">
		Next: {data.references[0].title} &rarr;
	</a>
{/if}
