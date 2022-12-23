<script lang="ts">
	import { language } from '$lib/i18n';
	import { NumberParser } from '$lib/numberParser';
	import { onMount } from 'svelte';
	import Keyboard from 'svelte-keyboard';
	import { Form, Input } from 'sveltestrap';

	let value: string = '';
	let prevValue: string = '';
	$: {
		if (
			!new RegExp(
				`^[0-9]*\\${new NumberParser($language).decimalSeperator}?[0-9]{0,2}$`
			).test(value)
		) {
			value = prevValue;
		}
		prevValue = value;
	}

	export let numericValue: number | undefined;
	$: numericValue = new NumberParser($language).parse(value);

	let input: HTMLInputElement;
	function onNumpadClick(event: CustomEvent) {
		const key = event.detail;
		const currentValue = input.value.toString();
		let newValue: string;
		let selectionStart = input.selectionStart as number;
		let selectionEnd = input.selectionEnd as number;
		let length = currentValue.length;
		let textbefore = currentValue.substring(0, selectionStart); //text in front of selected text
		let textafter = currentValue.substring(selectionEnd, length); //text following selected text
		if (key == 'Backspace') {
			({ newValue, selectionStart } = backspace(
				selectionStart,
				selectionEnd,
				currentValue,
				textbefore,
				textafter
			));
		} else {
			selectionStart += 1;
			newValue = textbefore + key + textafter;
		}
		value = newValue;
		input.setSelectionRange(selectionStart, selectionStart);
		input.focus();
	}

	function backspace(
		selectionStart: number,
		selectionEnd: number,
		currentValue: string,
		textbefore: string,
		textafter: string
	) {
		let newValue: string;
		if (selectionStart == selectionEnd) {
			// if no text is selected
			newValue = currentValue.substring(0, selectionStart - 1) + textafter;
			selectionStart -= 1;
		} // if some text is selected
		else {
			newValue = textbefore + textafter;
		}
		return { newValue, selectionStart };
	}
	onMount(() => {
		setTimeout(() => {
			input.focus();
		}, 0);
	});
</script>

<div style="max-width: 25rem" class="m-auto">
	<Form class="mb-2" on:submit={(e) => e.preventDefault()}>
		<Input placeholder="Given" inputmode="none" bind:value bind:inner={input} />
	</Form>
	<Keyboard
		on:keydown={onNumpadClick}
		custom={[
			{ row: 0, value: '7' },
			{ row: 0, value: '8' },
			{ row: 0, value: '9' },
			{ row: 1, value: '4' },
			{ row: 1, value: '5' },
			{ row: 1, value: '6' },
			{ row: 2, value: '1' },
			{ row: 2, value: '2' },
			{ row: 2, value: '3' },
			{ row: 3, value: new NumberParser($language).decimalSeperator },
			{ row: 3, value: '0' },
			{ row: 3, value: 'Backspace' }
		]}
		keyClass={{ Backspace: 'flex-grow-1 bg-opacity-25 bg-black' }}
		--min-width="2rem"
		--height="3.5rem"
	/>
</div>

<style global>
	.svelte-keyboard .row {
		/* overwrite bootstrap .row class */
		flex-wrap: nowrap;
		margin: 0;
		gap: 0;
	}
	.svelte-keyboard button.key {
		/* max-width: 3.5rem; */
		min-height: 3.5rem;
	}
</style>
