<script lang="ts">
	import FolderIcon from '$lib/icons/FolderIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import posthog from 'posthog-js';

	let { data } = $props();

	const command = '/plugin marketplace add daniloc/agent-accords';
	let copiedId = $state('');

	async function copy(
		text: string,
		id: string,
		commandType: 'marketplace' | 'install',
		skillSlug?: string
	) {
		await navigator.clipboard.writeText(text);
		copiedId = id;
		setTimeout(() => (copiedId = ''), 2000);
		posthog.capture('command_copied', {
			command_type: commandType,
			skill_slug: skillSlug,
			location: 'home'
		});
	}
</script>

<p class="install-hint">
	Install in Claude Code:
	<button class="copy-command" onclick={() => copy(command, 'marketplace', 'marketplace')}>
		<code>{command}</code>
		{#if copiedId === 'marketplace'}
			<span class="copy-feedback">Copied!</span>
		{:else}
			<CopyIcon />
		{/if}
	</button>
</p>

{#each data.items as item (item.slug)}
	{#if item.comingSoon}
		<div class="card nav-link coming-soon">
			<span class="title">{item.title}</span>
			{#if item.description}
				<p>{item.description}</p>
			{/if}
			<p class="badge">Coming soon</p>
		</div>
	{:else}
		<a class="card nav-link has-chevron" href="/{item.slug}">
			<span class="title">{item.title}</span>
			{#if item.description}
				<p>{item.description}</p>
			{/if}
		</a>
		{#if item.type === 'skill'}
			<a class="download-link" href="/{item.slug}/download" data-sveltekit-reload
				><FolderIcon /> Download in Agent Skill format (.zip)</a
			>
			<button
				class="download-link copy-command"
				onclick={() =>
					copy(`/plugin install ${item.slug}@agent-accords`, item.slug, 'install', item.slug)}
			>
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
