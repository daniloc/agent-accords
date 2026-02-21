# Agent accords: a website to distribute a special kind of agent skill

Software development is expanding as never before, with all new adventurers joining the fray.

But how building software happens is opaque. Agent accords exist to both illuminate the territory and create agreement between practitioners and LLM agents about what matters.

The repo creates a reading experience for humans to digest and reference the accords: each skill file is rendered with dedicated pages for each reference.

The skill file is also available for download so your agent follows the same premise.


## SvelteKit details

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv create --template minimal --types ts --add prettier eslint sveltekit-adapter="adapter:cloudflare+cfTarget:workers" mdsvex mcp="ide:claude-code+setup:remote" --install npm agent-accords
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
