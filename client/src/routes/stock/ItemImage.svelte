<script lang="ts">
	export let image: string;
</script>

<span
	class="d-block rounded border p-1"
	style="height: 3rem; aspect-ratio: 1 / 1;"
>
	<img class="h-100 w-100" style="object-fit: contain;" src={image} alt="" />
</span>
