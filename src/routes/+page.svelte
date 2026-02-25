<script lang="ts">
	let { data } = $props();
</script>

<h1>Agent accords</h1>

{#each data.items as item}
	<a class="card nav-link" href="/{item.slug}">
		<strong>{item.title}</strong>
		{#if item.description}
			<p>{item.description}</p>
		{/if}
	</a>
{/each}
