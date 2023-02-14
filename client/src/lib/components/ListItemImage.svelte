<script lang="ts">
	import type { Item } from '$lib/types/Item';
	export let image: Item['image'];
	export let height: string = '3rem';
</script>

<span class="rounded border p-1" style="height: {height}; aspect-ratio: 1 / 1;">
	<img class="h-100 w-100" style="object-fit: contain;" src={image} alt="" />
</span>
