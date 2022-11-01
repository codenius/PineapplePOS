<script lang="ts">
	import ItemCard from './components/Items/ItemCard.svelte';
	import data from '$lib/example.json';
	import { zoomFactor } from '$lib/stores/itemsZoom';
</script>

<div style:font-size="{$zoomFactor * 0.2} em" id="wrapper">
	{#each data as item}
		<ItemCard {...item} />
	{/each}
</div>

<style>
	#wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
		grid-auto-rows: min-content;
	}
</style>
