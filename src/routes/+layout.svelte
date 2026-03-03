<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../styles.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<nav>
		<a href="/">Agent accords</a>
	</nav>
</header>

<main>
	{@render children()}
</main>

<style>
	header,
	main {
		max-width: var(--content-width);
		margin-inline: auto;
		padding-inline: var(--spacing-page);
	}

	header {
		padding-block: var(--spacing-block);
	}

	header a {
		color: var(--color-text-light);
		text-decoration: none;
		font-family: 'Saira', sans-serif;
	}
</style>
