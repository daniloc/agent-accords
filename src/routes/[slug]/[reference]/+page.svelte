<script lang="ts">
	let { data } = $props();
	let Content = $derived(data.component);
</script>

<h1>{data.title}</h1>
<a class="download-link detail" href="/{data.parentSlug}/download" data-sveltekit-reload><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M3 17V5h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2" opacity="0.16"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 17V5h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2"/></g></svg> Download in Agent Skill format (.zip)</a>

<article class="card">
	<Content />
</article>

{#if data.next}
	<a class="card nav-link next" href={data.next.href}>{data.next.title} &rarr;</a>
{:else}
	<a class="card nav-link" href="/{data.parentSlug}">{data.parentName} &larr;</a>
{/if}
<a class="card nav-link" href={data.prev.href}>&larr; {data.prev.title}</a>
