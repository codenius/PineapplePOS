<script lang="ts">
	import { Html5Qrcode } from 'html5-qrcode';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { Button, Icon } from 'sveltestrap';

	export let code: string = '';

	let scanning = false;
	let error = false;

	let html5Qrcode: Html5Qrcode;

	const dispatch = createEventDispatcher();

	onMount(() => {
		init();
		start();
	});
	onDestroy(() => {
		stop();
	});

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
	}

	async function start() {
		error = false;
		scanning = true;
		await Html5Qrcode.getCameras()
			.then()
			.catch(() => {
				error = true;
				scanning = false;
			});
		await html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 20,
				qrbox: 1000
			},
			onScanSuccess,
			undefined
		);
	}

	async function stop() {
		await html5Qrcode.stop();
		scanning = false;
	}

	async function onScanSuccess(decodedText: string) {
		code = decodedText;
		dispatch('scan');
		stop();
	}
</script>

<div class="mb-2">
	<reader class="rounded overflow-hidden" id="reader" />
	<div style="position: absolute;">
		{#if !scanning}
			<Button color="light" on:click={start}>
				<Icon name="arrow-clockwise" />
				Scan again</Button
			>
			{#if error}
				<span class="text-light m-2">Please allow camera access</span>
			{/if}
		{/if}
	</div>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		object-fit: contain;
	}
	reader {
		position: relative;
		min-height: 20rem;
		max-height: 100%;
		width: 100%;
		background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
	}
</style>
