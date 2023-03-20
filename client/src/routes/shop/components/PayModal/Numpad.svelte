<script lang="ts">
	import { language } from '$lib/i18n';
	import { NumberParser } from '$lib/numberParser';
	import { onMount } from 'svelte';
	import Keyboard from 'svelte-keyboard';
	import { Form } from 'sveltestrap';

	let value: string = '';
	let prevValue: string = '';

	let selectionStartGlobal: number | null = 0;
	let prevSelectionStart: number | null = 0;
	let selectionEndGlobal: number | null = 0;
	let prevSelectionEnd: number | null = 0;

	function updateSelection() {
		setTimeout(() => {
			input?.setSelectionRange(selectionStartGlobal, selectionEndGlobal);
		}, 0);
	}

	$: value, checkValue();
	function checkValue() {
		const isMatch = new RegExp(
			`^[0-9]*\\${new NumberParser($language).decimalSeperator}?[0-9]{0,2}$`
		).test(value);
		if (!isMatch) {
			value = prevValue;
			selectionStartGlobal = prevSelectionStart;
			selectionEndGlobal = prevSelectionEnd;
			updateSelection();
		}
		prevValue = value;
		prevSelectionStart = selectionStartGlobal;
		prevSelectionEnd = selectionEndGlobal;
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
			({ newValue, selectionStart, selectionEnd } = backspace(
				selectionStart,
				selectionEnd,
				currentValue,
				textbefore,
				textafter
			));
		} else {
			selectionStart += 1;
			selectionEnd = selectionStart;
			newValue = textbefore + key + textafter;
		}
		value = newValue;
		selectionStartGlobal = selectionStart;
		selectionEndGlobal = selectionEnd;
		updateSelection();
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
			selectionEnd -= 1;
		} // if some text is selected
		else {
			newValue = textbefore + textafter;
			selectionEnd = selectionStart;
		}
		return { newValue, selectionStart, selectionEnd };
	}
	onMount(() => {
		setTimeout(() => {
			input.focus();
		}, 0);
	});

	function onselectionchange(node: HTMLInputElement) {
		let mousedown = false;
		let prevValue: string;

		function handleMousedown(event: Event) {
			mousedown = true;
		}

		function handleMouseup(event: Event) {
			if (mousedown) {
				mousedown = false;
				dispatchEvent();
			}
		}

		function dispatchEvent() {
			if (node.value == prevValue) {
				node.dispatchEvent(new CustomEvent('selectionchange'));
			}
			prevValue = node.value;
		}

		node.addEventListener('mousedown', handleMousedown);
		document.addEventListener('mouseup', handleMouseup);
		node.addEventListener('keyup', dispatchEvent);

		return {
			destroy() {
				node.removeEventListener('mousedown', handleMousedown);
				document.removeEventListener('mouseup', handleMouseup);
				node.removeEventListener('keyup', dispatchEvent);
			}
		};
	}
</script>

<div style="max-width: 25rem" class="m-auto">
	<Form class="mb-2" on:submit={(e) => e.preventDefault()}>
		<input
			on:keydown={(e) => {
				if (!(e.key == 'Escape' || (e.ctrlKey && e.key == 'Enter'))) {
					e.stopPropagation();
				} /* prevent global shortcuts from firing */
			}}
			use:onselectionchange
			on:selectionchange={() => {
				selectionStartGlobal = input.selectionStart;
				selectionEndGlobal = input.selectionEnd;
				prevSelectionStart = input.selectionStart;
				prevSelectionEnd = input.selectionEnd;
			}}
			on:keyup={() => {
				selectionStartGlobal = input.selectionStart;
				selectionEndGlobal = input.selectionEnd;
				prevSelectionStart = input.selectionStart;
				prevSelectionEnd = input.selectionEnd;
			}}
			class="form-control"
			placeholder="Given"
			inputmode="none"
			bind:value
			bind:this={input}
		/>
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
