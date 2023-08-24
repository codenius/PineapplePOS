<script context="module" lang="ts">
	function getDistinct(categories: Category[]): Category[] {
		return Array.from(new Set(categories.map((category) => category.id)))
			.map((categoryId) =>
				categories.find((itemsCategory) => categoryId == itemsCategory.id)
			)
			.sort((a, b) => {
				if (!a) return 1;
				if (!b) return -1;
				return a.name.localeCompare(b.name);
			}) as Category[];
	}

	export function matchFilter({
		filterValue,
		value
	}: {
		filterValue: Category;
		value: Category;
	}) {
		if (filterValue === undefined) return true;
		return filterValue.id === value.id;
	}
</script>

<script lang="ts">
	import { t } from '$lib/i18n';
	import type { Category } from '$lib/types/Category';
	import type { Writable } from 'svelte/store';

	import {
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem
	} from 'sveltestrap';

	export let filterValue: Writable<Category | undefined>;
	export let preFilteredValues;
	let options: Category[] = [];
	$: options = getDistinct($preFilteredValues as unknown as Category[]);
</script>

<!-- <select bind:value={$filterValue}>
	<option value={undefined}>Any</option>
	{#each options as option}
		<option value={option}>{option}</option>
	{/each}
</select> -->

<Dropdown size="sm">
	<DropdownToggle caret>
		{#if $filterValue?._isDefault}
			{$t('uncategorized')}
		{:else if $filterValue}
			{$filterValue.name}
		{:else if $filterValue === undefined}
			{$t('stock:all')}
		{/if}
	</DropdownToggle>
	<DropdownMenu>
		<DropdownItem
			active={$filterValue === undefined}
			on:click={() => {
				$filterValue = undefined;
			}}
		>
			<strong>{$t('stock:all')}</strong>
		</DropdownItem>
		{#each options as option}
			<DropdownItem
				active={$filterValue === option}
				class={option._isDefault ? 'fst-italic' : ''}
				on:click={() => {
					$filterValue = option;
				}}
				>{!option._isDefault ? option.name : $t('uncategorized')}</DropdownItem
			>
		{/each}
	</DropdownMenu>
</Dropdown>
