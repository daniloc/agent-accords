<script lang="ts">
	let { data } = $props();
	let Content = $derived(data.component);
</script>

<h1>{data.title}</h1>

<article class="card">
	<Content />
</article>

{#if data.next}
	<a class="card nav-link next" href={data.next.href}>{data.next.title} &rarr;</a>
{:else}
	<a class="card nav-link" href="/{data.parentSlug}">{data.parentName} &larr;</a>
{/if}
<a class="card nav-link" href={data.prev.href}>&larr; {data.prev.title}</a>
