<script lang="ts">
	import { Icon } from 'sveltestrap';

	export let image: string;
	let error = false;
</script>

<span
	class="d-flex justify-content-center align-items-center rounded border p-1"
	style="height: 3rem; aspect-ratio: 1 / 1;"
>
	{#if image && !error}
		<img
			on:error={() => {
				error = true;
			}}
			class="h-100 w-100"
			style="object-fit: contain;"
			src={image}
			alt=""
		/>
	{:else}
		<Icon name={!error ? 'slash-lg' : 'exclamation-octagon'} />
	{/if}
</span>
