<script context="module" lang="ts">
	export function calculateTotal(
		bag: ShoppingBagEntry[],
		items: Item[]
	): number {
		let total: number = 0;
		for (let index = 0; index < bag.length; index++) {
			const shoppingBagEntry = bag[index];
			let item = items.find((item) => item.id == shoppingBagEntry.id);
			total += shoppingBagEntry.amount * item!.price;
		}
		return total;
	}
</script>

<script lang="ts">
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import Items from './Items.svelte';
	import ShoppingBag from './ShoppingBag.svelte';
	import Toolbar from './Toolbar.svelte';
	import FloatingButtons from './FloatingButtons.svelte';
	import PayModal from './PayModal.svelte';
	import type { ShoppingBagEntry } from '$lib/types/ShoppingBagEntry';
	import type { Item } from '$lib/types/Item';
	import CommandPalette from '$lib/CommandPalette.svelte';
	import { shoppingBagWidth } from '$lib/stores/shoppingBagWidth';
</script>

<CommandPalette />

<div id="wrapper" class="h-100 d-flex flex-column">
	<Toolbar />
	<Splitpanes class="Splitpanes" dblClickSplitter={false}>
		<Pane minSize={30} class="scroll-pane overflow-auto scroll-padding">
			<Items />
		</Pane>
		<Pane
			minSize={30}
			bind:size={$shoppingBagWidth}
			class="scroll-pane overflow-auto"
		>
			<ShoppingBag />
		</Pane>
	</Splitpanes>
</div>
<FloatingButtons />
<PayModal />

<style global>
	.Splitpanes {
		width: 100%;
		overflow-y: hidden;
	}
	.scroll-pane {
		overflow-y: auto;
	}
	.scroll-padding {
		scroll-padding-top: 3.8em;
	}
	.Splitpanes .splitpanes__splitter {
		width: 1rem !important;
	}
</style>
