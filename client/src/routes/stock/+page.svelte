<script lang="ts">
	import Table from './Table.svelte';
	import { Button, ButtonToolbar, Icon } from 'sveltestrap';
</script>

<Table />

<ButtonToolbar
	id="wrapper"
	style="left: initial; right: 0"
	class="fixed-bottom m-4 gap-2"
>
	<Button
		href="/stock/item"
		size="lg"
		color="primary"
		class="shadow-lg rounded-pill"><Icon name="plus-lg" /> Add product</Button
	>
</ButtonToolbar>
