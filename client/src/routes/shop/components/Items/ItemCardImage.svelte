<script lang="ts">
	import type { Item } from '$lib/types/Item';
	import { CardImg, Icon } from 'sveltestrap';
	export let name: Item['name'];
	export let image: Item['image'];
</script>

{#if image}
	<CardImg
		draggable={false}
		class="w-auto flex-grow-1"
		style="min-height: 8em; max-height: 8em; object-fit: contain"
		src={image}
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
			<Icon name="image" style="font-size: 1.7em" />
			<div class="text-truncate">
				{name || '–'}
			</div>
		</div>
	</div>
{/if}
