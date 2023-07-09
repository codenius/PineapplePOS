<script lang="ts">
	import type { Item } from '$lib/types/Item';
	import { Icon } from 'sveltestrap';
	export let image: Item['image'];
	export let height: string = '3rem';
	let error = false;
</script>

<span
	class="d-flex justify-content-center align-items-center rounded border p-1"
	style="height: {height}; aspect-ratio: 1 / 1;"
>
	{#if image && !error}
		<img
			on:error={() => {
				error = true;
			}}
			class="h-100 w-100"
			style="object-fit: contain;"
			src={image}
			alt=""
		/>
	{:else}
		<Icon
			name={!error ? 'image' : 'file-earmark-x'}
			style="font-size: calc({height} / 2);"
			class="text-secondary"
		/>
	{/if}
</span>
