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
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		margin-block-end: 0.5rem;
	}

	header a {
		color: var(--color-text-light);
		text-decoration: none;
		font-family: var(--font-heading);
		font-size: 1.4rem;
		font-weight: 300;
		letter-spacing: 0.06em;
		text-transform: lowercase;
	}

	footer {
		padding-block: var(--spacing-block) 2rem;
		font-family: var(--font-heading);
		font-size: var(--font-size-small);
		color: var(--color-text-muted);
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	footer a {
		color: inherit;
		text-decoration: none;
	}

	footer a:hover {
		color: var(--color-text-light);
	}
</style>
