<script lang="ts">
	import { Icon, Button, Input, InputGroup, InputGroupText } from 'sveltestrap';
	export let value: number = 1;
</script>

<InputGroup>
	<InputGroupText class="p-0">
		<Button
			size="sm"
			on:click={() => {
				value -= 1;
			}}
			style="border-top-right-radius: 0;
                   border-bottom-right-radius: 0;"
		>
			<Icon name="dash" />
		</Button>
	</InputGroupText>
	<Input {value} class="text-center btn-sm" style="width: 3rem" />
	<InputGroupText class="p-0">
		<Button
			size="sm"
			on:click={() => {
				value += 1;
			}}
			style="border-top-left-radius: 0;
                   border-bottom-left-radius: 0;"
		>
			<Icon name="plus" />
		</Button>
	</InputGroupText>
</InputGroup>
