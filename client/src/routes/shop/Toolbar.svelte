<script lang="ts">
	import ZoomController from './components/ZoomController.svelte';
	import { shoppingBag, clearedShoppingBag } from '$lib/stores/shoppingBag';
	import { Button, ButtonToolbar, Icon } from 'sveltestrap';
	import SearchInput from './SearchInput.svelte';
</script>

<div
	style="padding: 0.8rem;"
	class="bg-light d-flex justify-content-between align-items-center flex-wrap gap-2"
>
	<span class="d-flex align-items-center flex-wrap gap-3">
		<SearchInput />
		<ZoomController />
	</span>
	<ButtonToolbar class="d-flex align-items-center gap-2">
		<Button><Icon name="arrow-counterclockwise" /> Undo last purchase</Button>
		<Button
			outline={true}
			color="danger"
			on:click={() => {
				$clearedShoppingBag = $shoppingBag;
				$shoppingBag = [];
			}}><Icon name="x-lg" /> Clear shopping bag</Button
		>
	</ButtonToolbar>
</div>
