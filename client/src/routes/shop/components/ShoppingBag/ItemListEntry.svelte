<script lang="ts">
	import { ListGroupItem } from 'sveltestrap';
	import Counter from './Counter.svelte';

	export let name: string;
	export let price: string;
	export let amount: number;
	export let image: string;
</script>

<ListGroupItem class="d-flex justify-content-between align-items-center">
	<span
		class="d-flex justify-content-between align-items-center gap-2 overflow-hidden"
	>
		<span class="rounded border p-1" style="height: 3rem; aspect-ratio: 1 / 1;">
			<img
				class="h-100 w-100"
				style="object-fit: contain;"
				src={image}
				alt=""
			/>
		</span>
		<span class="text-truncate">{name}</span>
	</span>
	<span class="d-flex align-items-center flex-shrink-0 gap-2">
		<Counter value={amount} />
		<span>{price}</span>
	</span>
</ListGroupItem>

<style>
</style>
