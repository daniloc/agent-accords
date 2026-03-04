<script lang="ts">
	import FolderIcon from '$lib/icons/FolderIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';

	let { data } = $props();

	const command = '/plugin marketplace add daniloc/agent-accords';
	let copiedId = $state('');

	async function copy(text: string, id: string) {
		await navigator.clipboard.writeText(text);
		copiedId = id;
		setTimeout(() => (copiedId = ''), 2000);
	}
</script>

<p class="install-hint">
	Install in Claude Code:
	<button class="copy-command" onclick={() => copy(command, 'marketplace')}>
		<code>{command}</code>
		{#if copiedId === 'marketplace'}
			<span class="copy-feedback">Copied!</span>
		{:else}
			<CopyIcon />
		{/if}
	</button>
</p>

{#each data.items as item}
	{#if item.comingSoon}
		<div class="card nav-link coming-soon">
			<span class="title">{item.title}</span>
			{#if item.description}
				<p>{item.description}</p>
			{/if}
			<p class="badge">Coming soon</p>
		</div>
	{:else}
		<a class="card nav-link" href="/{item.slug}">
			<span class="title">{item.title}</span>
			{#if item.description}
				<p>{item.description}</p>
			{/if}
		</a>
		{#if item.type === 'skill'}
			<a class="download-link" href="/{item.slug}/download" data-sveltekit-reload><FolderIcon /> Download in Agent Skill format (.zip)</a>
			<button class="download-link copy-command" onclick={() => copy(`/plugin install ${item.slug}@agent-accords`, item.slug)}>
				{#if copiedId === item.slug}
					<span class="copy-feedback">Copied!</span>
				{:else}
					<CopyIcon />
				{/if}
				<code>/plugin install {item.slug}@agent-accords</code>
			</button>
		{/if}
	{/if}
{/each}
