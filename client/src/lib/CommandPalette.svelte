<script lang="ts">
	import { openPayModal } from '$routes/shop/FloatingButtons.svelte';
	import { focusSearch } from '$routes/shop/SearchInput.svelte';
	import { restoreShoppingBag } from '$routes/shop/ShoppingBag.svelte';
	import { clearShoppingBag } from '$routes/shop/Toolbar.svelte';
	import CommandPalette, {
		defineActions,
		createStoreMethods
	} from 'svelte-command-palette';
	import type { action } from 'svelte-command-palette/types';
	import { language, t } from './i18n';

	const paletteMethods = createStoreMethods();

	const shortcuts = [
		{ short: 'pay', key: 'p', cb: openPayModal },
		{
			short: 'search',
			key: 's',
			cb: focusSearch
		},
		{
			short: 'clear',
			key: 'x',
			cb: clearShoppingBag
		},
		{
			short: 'restore',
			key: 'r',
			cb: restoreShoppingBag
		},
		{
			short: 'help',
			key: 'h',
			cb: paletteMethods.openPalette
		}
	];

	let actions: action[];
	$: actions = defineActions(
		shortcuts.map((sc) => ({
			title: capitalize($t(`help:commands.${sc.short}.short`) as string),
			subTitle: $t(`help:commands.${sc.short}.long`) as string,
			onRun: sc.cb,
			shortcut: sc.key
		}))
	);

	function capitalize(string: string) {
		return string.charAt(0).toLocaleUpperCase($language) + string.slice(1);
	}

	/*   force rerender CommandPalette when 'actions' changes, 
		since 'commands' property is not reactive, 
		necessary for lazy loaded translations, 
		!!!HACK!!! may affect performance */
	function rerender() {
		isActive = false;
		setTimeout(() => {
			isActive = true;
		});
	}
	let isActive: boolean = true;
	$: actions, rerender(); // runs when 'actions' changes
</script>

{#if isActive}
	<CommandPalette
		resultsContainerClass="m-0 p-0 overflow-auto"
		overlayStyle={{ zIndex: '1100' }}
		subtitleStyle={{ fontSize: '1rem' }}
		subtitleClass=""
		placeholder={$t('help:placeholder')}
		commands={actions}
	/>
{/if}
