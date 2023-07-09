<script lang="ts">
	import { formatCurrency } from '$lib/currencyHelpers';
	import { language } from '$lib/i18n';
	import type { Item } from '$lib/types/Item';

	export let price: Item['price'];
</script>

{#if price !== null}
	{formatCurrency(price, $language)}
{:else}
	–
{/if}
