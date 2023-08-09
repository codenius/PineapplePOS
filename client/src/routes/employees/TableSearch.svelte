<script lang="ts">
	import { Input } from 'sveltestrap';
	import { searchTerm } from './searchTerm';
	import { t } from '$lib/i18n';
</script>

<Input
	bind:value={$searchTerm}
	placeholder="{$t('employees:search_table')}..."
/>
