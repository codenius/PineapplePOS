<script lang="ts">
	import ZoomController from './components/ZoomController.svelte';
	import { shoppingBag, clearedShoppingBag } from '$lib/stores/shoppingBag';
	import {
		Button,
		ButtonToolbar,
		Icon,
		Input,
		InputGroup,
		InputGroupText,
		Form
	} from 'sveltestrap';
</script>

<div
	style="padding: 0.8rem;"
	class="bg-light d-flex justify-content-between align-items-center flex-wrap gap-2"
>
	<span class="d-flex align-items-center flex-wrap gap-3">
		<Form class="d-flex gap-1">
			<InputGroup>
				<Input type="search" placeholder="search..." />
				<InputGroupText class="p-0">
					<Button
						style="border-top-left-radius: 0;
							   border-bottom-left-radius: 0;"
						on:click={(event) => {
							event.preventDefault();
						}}><Icon name="x-lg" /></Button
					>
				</InputGroupText>
			</InputGroup>
		</Form>
		<ZoomController />
	</span>
	<ButtonToolbar class="d-flex align-items-center gap-2">
		<Button><Icon name="arrow-counterclockwise" /> Undo last purchase</Button>
		<Button class="border-danger text-danger" color="light" on:click={() => {$clearedShoppingBag = $shoppingBag ;$shoppingBag = []}}><Icon name="x-lg" /> Clear shopping bag</Button>
	</ButtonToolbar>
</div>
