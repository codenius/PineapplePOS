<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { Button, Icon } from 'sveltestrap';

	import { BarcodeDetectorPolyfill } from '@undecaf/barcode-detector-polyfill';
	import { t } from '$lib/i18n';

	type plolyfillWindow = typeof window & {
		BarcodeDetector: typeof BarcodeDetectorPolyfill;
	};

	try {
		(window as plolyfillWindow).BarcodeDetector.getSupportedFormats();
	} catch {
		(window as plolyfillWindow).BarcodeDetector = BarcodeDetectorPolyfill;
	}

	export let code: string = '';

	let scanning = true;
	let error = false;
	let video: HTMLVideoElement;
	let stream: MediaStream;
	let interval: NodeJS.Timer;
	let barcodeDetector: BarcodeDetectorPolyfill;

	const dispatch = createEventDispatcher();

	onMount(init);
	onDestroy(stop);

	async function init() {
		try {
			stream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: { ideal: 'environment' }
				},
				audio: false
			});
			video.srcObject = stream;
			await video.play();
			scanning = true;
			barcodeDetector = new (window as plolyfillWindow).BarcodeDetector();

			resume();
		} catch (errMsg) {
			error = true;
			scanning = false;
		}
	}

	function pause() {
		stream.getVideoTracks()[0].enabled = false;
		clearInterval(interval);
		scanning = false;
	}

	function resume() {
		if (!video.paused) {
			stream.getVideoTracks()[0].enabled = true;
			scanning = true;

			interval = setInterval(async () => {
				if (scanning) {
					const barcodes = await barcodeDetector.detect(video);
					if (barcodes.length != 0) {
						onScanSuccess(barcodes[0].rawValue);
					}
				}
			}, 500);
		}
	}

	function stop() {
		if (!video.paused) {
			pause();
			stream.getVideoTracks()[0].stop();
		}
	}

	async function onScanSuccess(decodedText: string) {
		code = decodedText;
		dispatch('scan');
		pause();
	}
</script>

<div
	class="mb-2 position-relative rounded overflow-hidden d-flex justify-content-center"
>
	<!-- svelte-ignore a11y-media-has-caption -->
	<video class="rounded" bind:this={video} />
	{#if !scanning}
		<div
			class="bg-light position-absolute h-100 w-100 d-flex flex-column justify-content-center align-items-center"
		>
			<Button outline color="secondary" on:click={resume}>
				<Icon name="arrow-clockwise" />
				{$t('stock:scan_again')}
			</Button>
			{#if error}
				<span class="text-dark m-2"
					>{$t('stock:camera_permission_warning')}</span
				>
			{/if}
		</div>
	{/if}
</div>

<style>
	video {
		min-height: 20rem;
		max-height: 30rem;
		object-fit: contain;
	}
</style>
