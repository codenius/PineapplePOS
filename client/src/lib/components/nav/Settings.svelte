<script lang="ts">
	import {
		ButtonDropdown,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Icon
	} from 'sveltestrap';
	import NavPart from './NavPart.svelte';
	import { i18n, t } from '$lib/i18n';

	export let expanded: boolean = false;
	let isOpen: boolean = false;
</script>

<ButtonDropdown class="Settings" {isOpen} toggle={() => (isOpen = !isOpen)}>
	<DropdownToggle color="transparent" class="p-0">
		<ul class="list-unstyled mb-1">
			<NavPart icon="gear" class="border-bottom-0" bind:expanded
				>Einstellungen</NavPart
			>
		</ul></DropdownToggle
	>
	<DropdownMenu class="shadow-sm mx-2">
		<Dropdown direction="right">
			<DropdownToggle
				caret
				color="transparent"
				class="dropdown-item shadow-none rounded-0"
			>
				<Icon name="globe" class="me-1" />{$t('lang')}</DropdownToggle
			>
			<DropdownMenu class="shadow-sm">
				{#each Object.keys($i18n.services.resourceStore.data) as language}
					<DropdownItem
						on:click={() => {
							isOpen = false;
							$i18n.changeLanguage(language);
						}}
						>{$t('thisLang', { lng: language })}
					</DropdownItem>
				{/each}
			</DropdownMenu>
		</Dropdown>
	</DropdownMenu>
</ButtonDropdown>

<style global>
	.Settings .dropdown-menu {
		position: fixed !important;
	}
</style>
