<script lang="ts">
	let { data } = $props();
	const { component: Content } = data;
</script>

<article>
	<Content />

	{#if data.type === 'skill' && data.references.length > 0}
		<nav>
			<a href="/{data.slug}/{data.references[0].slug}">Next: {data.references[0].title} &rarr;</a>
		</nav>
	{/if}
</article>
