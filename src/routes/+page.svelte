<script lang="ts">
	let { data } = $props();
</script>

<h1>Agent accords</h1>

<nav>
	<ul>
		{#each data.items as item}
			<li>
				<a href="/{item.slug}">{item.name}</a>
				{#if item.description}
					<p>{item.description}</p>
				{/if}
			</li>
		{/each}
	</ul>
</nav>
