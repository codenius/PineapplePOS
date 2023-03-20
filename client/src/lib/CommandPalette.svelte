<script lang="ts">
	import { openPayModal } from '$routes/shop/FloatingButtons.svelte';
	import { focusSearch } from '$routes/shop/SearchInput.svelte';
	import { restoreShoppingBag } from '$routes/shop/ShoppingBag.svelte';
	import { clearShoppingBag } from '$routes/shop/Toolbar.svelte';
	import CommandPalette, {
		defineActions,
		createStoreMethods
	} from 'svelte-command-palette';
	import { language } from './i18n';

	// define actions using the defineActions API

	const paletteMethods = createStoreMethods();

	const shortcuts = [
		{ short: 'pay', long: 'Open the pay dialog', key: 'p', cb: openPayModal },
		{
			short: 'search',
			long: 'Focus the product search',
			key: 's',
			cb: focusSearch
		},
		{
			short: 'clear',
			long: 'Clear the shopping bag',
			key: 'x',
			cb: clearShoppingBag
		},
		{
			short: 'restore',
			long: 'Restore the shopping bag',
			key: 'r',
			cb: restoreShoppingBag
		},
		{
			short: 'help',
			long: 'Open the  shortcut help',
			key: 'h',
			cb: paletteMethods.openPalette
		}
	];

	const actions = defineActions(
		shortcuts.map((sc) => ({
			title: capitalize(sc.short),
			subTitle: sc.long,
			onRun: sc.cb,
			shortcut: sc.key
		}))
	);

	function capitalize(string: string) {
		return string.charAt(0).toLocaleUpperCase($language) + string.slice(1);
	}
</script>

<CommandPalette
	resultsContainerClass="m-0 p-0 overflow-auto"
	subtitleStyle={{ fontSize: '1rem' }}
	subtitleClass=""
	commands={actions}
/>
