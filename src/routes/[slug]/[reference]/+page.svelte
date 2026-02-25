<script lang="ts">
	let { data } = $props();
	const { component: Content } = data;
</script>

<article>
	<Content />
</article>

<nav>
	<a href={data.prev.href}>&larr; {data.prev.title}</a>
	{#if data.next}
		<a href={data.next.href}>{data.next.title} &rarr;</a>
	{:else}
		<a href="/{data.parentSlug}">{data.parentName} &larr;</a>
	{/if}
</nav>
