import { sveltekit } from '@sveltejs/kit/vite';
import { searchForWorkspaceRoot, defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()), 'contents']
		}
	}
});
