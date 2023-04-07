<script lang="ts">
	import { Input } from 'sveltestrap';
	import { searchTerm } from './searchTerm';
	import { t } from '$lib/i18n';
</script>

<Input bind:value={$searchTerm} placeholder="{$t('stock:search_table')}..." />
