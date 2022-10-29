<script lang="ts">
	import ItemCard from './Items/ItemCard.svelte';
</script>

<div id="wrapper">
	{#each Array(10) as _}
		<ItemCard />
	{/each}
</div>

<style>
	#wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
		grid-auto-rows: min-content;
	}
</style>
