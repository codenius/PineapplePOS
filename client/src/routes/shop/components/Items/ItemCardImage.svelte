<script lang="ts">
	import type { Item } from '$lib/types/Item';
	import { Icon } from 'sveltestrap';
	export let alt: string;
	export let image: Item['image'];
	$: image,
		(() => {
			error = false;
		})(); // set error to false when image updates
	let error = false;
</script>

{#if image && !error}
	<img
		draggable={false}
		class="card-img w-auto flex-grow-1"
		style="min-height: 8em; max-height: 8em; object-fit: contain"
		src={image}
		alt=""
		on:error={() => {
			error = true;
		}}
	/>
{:else}
	<div
		class="card-img w-auto flex-grow-1 d-flex align-items-center"
		style="min-height: 8em; max-height: 8em; object-fit: contain"
	>
		<div
			class="text-secondary overflow-hidden fw-bolder"
			style="font-size: 1.5em; margin: 0.7em;"
		>
			<Icon
				name={!error ? 'image' : 'file-earmark-x'}
				style="font-size: 1.7em"
			/>
			<div class="text-truncate">
				{alt || '–'}
			</div>
		</div>
	</div>
{/if}
