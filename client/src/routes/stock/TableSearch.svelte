<script lang="ts">
	import { Input } from 'sveltestrap';
	import { searchTerm } from './searchTerm';
</script>

<Input bind:value={$searchTerm} placeholder="Search table..." />
