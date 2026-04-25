<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../styles.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Agent accords</title>
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

<footer>
	By <a href="https://danilocampos.com">Danilo Campos</a>
</footer>

<style>
	header,
	main,
	footer {
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
		font-family: var(--font-heading);
	}

	footer {
		padding-block: var(--spacing-block) 2rem;
		font-family: var(--font-heading);
		font-size: var(--font-size-small);
		color: var(--color-text-light);
		opacity: 0.6;
		text-align: right;
	}

	footer a {
		color: inherit;
	}
</style>
