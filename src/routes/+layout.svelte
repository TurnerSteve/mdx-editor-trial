<script lang="ts">
	import '../app.css';
    // import { theme } from '$lib/stores/theme';

	let { children } = $props();
</script>

<!-- <button onclick={() => theme.update(t => t === 'light' ? 'dark' : 'light')}>
  Toggle theme
</button> -->

{@render children()}

