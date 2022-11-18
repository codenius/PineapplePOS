<script lang="ts">
	import {
		Icon,
		Button,
		Input,
		InputGroup,
		InputGroupText,
		Form
	} from 'sveltestrap';
	export let value: number = 1;
	export let max: number;

	let inputValue: number = value;

	$: value, checkValue(); // run checkValue when value changes

	function checkValue() {
		if (value > max) {
			value = max;
		}
	}

	let isFocused: boolean;
	$: {
		if (!isFocused) {
			inputValue = value;
		}
	}

	let input: HTMLInputElement;
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
	<Form
		on:submit={(e) => {
			e.preventDefault();
			input.blur();
		}}
	>
		<Input
			bind:inner={input}
			type="number"
			on:focus={() => {
				isFocused = true;
				input.select();
			}}
			on:blur={() => {
				isFocused = false;
				value = inputValue;
			}}
			bind:value={inputValue}
			class="text-center btn-sm rounded-0 h-100 CounterInput"
			style="width: 3rem"
		/>
	</Form>
	<InputGroupText class="p-0">
		<Button
			disabled={value >= max}
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

<style global>
	/* Chrome, Safari, Edge, Opera */
	.CounterInput::-webkit-outer-spin-button,
	.CounterInput::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	.CounterInput[type='number'] {
		-moz-appearance: textfield;
	}
</style>
