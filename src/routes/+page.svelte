<script lang="ts">
	let { data } = $props();
</script>

{#each data.items as item}
	<a class="card nav-link" href="/{item.slug}">
		<span class="title">{item.title}</span>
		{#if item.description}
			<p>{item.description}</p>
		{/if}
	</a>
	{#if item.type === 'skill'}
		<a class="download-link" href="/{item.slug}/download"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M3 17V5h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2" opacity="0.16"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 17V5h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2"/></g></svg> Download in Agent Skill format (.zip)</a>
	{/if}
{/each}
