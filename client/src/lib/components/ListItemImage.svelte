<script lang="ts">
	import type { Item } from '$lib/types/Item';
	export let image: Item['image'];
</script>

<span class="rounded border p-1" style="height: 3rem; aspect-ratio: 1 / 1;">
	<img class="h-100 w-100" style="object-fit: contain;" src={image} alt="" />
</span>
