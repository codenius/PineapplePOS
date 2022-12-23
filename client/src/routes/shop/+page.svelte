<script lang="ts">
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import Items from './Items.svelte';
	import ShoppingBag from './ShoppingBag.svelte';
	import Toolbar from './Toolbar.svelte';
	import FloatingButtons from './FloatingButtons.svelte';
	import type { ShoppingBagEntry } from '$lib/types/ShoppingBagEntry';
	import type { Item } from '$lib/types/Item';
</script>

<div id="wrapper" class="h-100 d-flex flex-column">
	<Toolbar />
	<Splitpanes class="Splitpanes" dblClickSplitter={false}>
		<Pane minSize="30" class="scroll-pane">
			<Items />
		</Pane>
		<Pane minSize="35" size="40" class="scroll-pane">
			<ShoppingBag />
		</Pane>
	</Splitpanes>
</div>
<FloatingButtons />

<script context="module" lang="ts">
	export function calculateTotal(
		bag: ShoppingBagEntry[],
		items: Item[]
	): number {
		let total: number = 0;
		for (let index = 0; index < bag.length; index++) {
			const shoppingBagEntry = bag[index];
			let item = items.find((item) => item.id == shoppingBagEntry.id);
			total += shoppingBagEntry.amount * item.price;
		}
		return total;
	}
</script>

<style global>
	.Splitpanes {
		width: 100%;
		overflow-y: hidden;
	}
	.scroll-pane {
		overflow-y: auto;
	}
	.Splitpanes .splitpanes__splitter {
		width: 1rem !important;
		cursor: w-resize !important;
	}
</style>
