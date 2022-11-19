<script lang="ts">
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import Items from './Items.svelte';
	import ShoppingBag from './ShoppingBag.svelte';
	import Toolbar from './Toolbar.svelte';
	import FloatingButtons from './FloatingButtons.svelte';
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
