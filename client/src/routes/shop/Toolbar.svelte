<script>
	import { Button, Icon, Input, Form } from 'sveltestrap';
</script>

<div class="p-2 bg-light d-flex justify-content-between gap-1">
	<span>
		<Form>
			<Input class="" type="search" placeholder="search..." />
		</Form>
	</span>
	<span>
		<Button><Icon name="arrow-counterclockwise" />Undo last purchase</Button>
		<Button><Icon name="x-lg" /> Clear shopping bag</Button>
	</span>
</div>
