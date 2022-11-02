<script lang="ts">
	import { zoomFactor, min, max, step } from '$lib/stores/itemsZoom';
	import { Button, Icon, Input } from 'sveltestrap';

	function setZoomFactor(difference: number): void {
		if ($zoomFactor + difference >= min && $zoomFactor + difference <= max) {
			$zoomFactor = $zoomFactor + difference;
		}
	}
</script>

<div class="d-flex align-items-center gap-2 border rounded">
	<Button
		on:click={() => {
			setZoomFactor(-step);
		}}><Icon name="dash" /></Button
	>
	<Input bind:value={$zoomFactor} {min} {max} {step} type="range" />
	<Button
		on:click={() => {
			setZoomFactor(step);
		}}><Icon name="plus" /></Button
	>
</div>
