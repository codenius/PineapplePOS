<script context="module" lang="ts">
	export function clearShoppingBag() {
		if (get(shoppingBag).length) {
			clearedShoppingBag.set(get(shoppingBag));
			shoppingBag.set([]);
		}
	}
</script>

<script lang="ts">
	import ZoomController from './components/ZoomController.svelte';
	import { shoppingBag, clearedShoppingBag } from '$lib/stores/shoppingBag';
	import { Button, ButtonToolbar, Icon } from 'sveltestrap';
	import SearchInput from './SearchInput.svelte';
	import { get } from 'svelte/store';
	import { createStoreMethods } from 'svelte-command-palette';
	import { t } from '$lib/i18n';
	import Kbd from '$lib/Kbd';
</script>

<div
	style="padding: 0.8rem;"
	class="bg-light d-flex justify-content-between align-items-center flex-wrap gap-2"
>
	<span class="d-flex align-items-center flex-wrap gap-3">
		<SearchInput />
		<ZoomController />
	</span>
	<ButtonToolbar class="d-flex align-items-center gap-2">
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a
			href=""
			class="text-secondary"
			on:click={(event) => {
				event.preventDefault();
				createStoreMethods().openPalette();
			}}
		>
			{@html $t('shop:open_help', {
				help_key: Kbd('h', 'text-black'),
				interpolation: { escapeValue: false }
			})}
		</a>
		<!-- feature currently not required
		<Button>
			<Icon name="arrow-counterclockwise" />
			{$t('shop:undo_purchase')}
		</Button> -->
		<Button
			disabled={!$shoppingBag.length}
			outline={true}
			color="danger"
			on:click={clearShoppingBag}
			><Icon name="x-lg" /> {$t('shop:clear_shoppingBag')}</Button
		>
	</ButtonToolbar>
</div>
