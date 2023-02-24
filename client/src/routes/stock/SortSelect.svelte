<script context="module" lang="ts">
	function getDistinct(items: string[]): string[] {
		return Array.from(new Set(items));
	}

	export function matchFilter({
		filterValue,
		value
	}: {
		filterValue: string;
		value: string;
	}) {
		if (filterValue === undefined) return true;
		return filterValue === value;
	}
</script>

<script lang="ts">
	import type { Writable } from 'svelte/store';

	import {
		Dropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem
	} from 'sveltestrap';

	export let filterValue: Writable<string | undefined>;
	export let preFilteredValues;
	let options: string[] = [];
	$: options = getDistinct($preFilteredValues as unknown as string[]);
</script>

<!-- <select bind:value={$filterValue}>
	<option value={undefined}>Any</option>
	{#each options as option}
		<option value={option}>{option}</option>
	{/each}
</select> -->

<Dropdown size="sm">
	<DropdownToggle caret>
		{#if $filterValue}
			{$filterValue}
		{:else if $filterValue === undefined}
			All
		{:else if $filterValue === null}
			Uncategorized
		{/if}
	</DropdownToggle>
	<DropdownMenu>
		<DropdownItem
			active={$filterValue === undefined}
			on:click={() => {
				$filterValue = undefined;
			}}
		>
			<strong>All</strong>
		</DropdownItem>
		{#each options as option}
			<DropdownItem
				active={$filterValue === option}
				on:click={() => {
					$filterValue = option;
				}}>{option || 'Uncategorized'}</DropdownItem
			>
		{/each}
	</DropdownMenu>
</Dropdown>
