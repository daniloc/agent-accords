<script lang="ts">
	let { data } = $props();
	let Content = $derived(data.component);
</script>

<h1>{data.title}</h1>

<article class="card">
	<Content />
</article>

{#if data.type === 'skill' && data.references.length > 0}
	<a class="card nav-link next" href="/{data.slug}/{data.references[0].slug}">
		Next: {data.references[0].title} &rarr;
	</a>
{/if}
