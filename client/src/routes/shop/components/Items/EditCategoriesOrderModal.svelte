<script lang="ts">
	import { Button, Modal, ModalBody, ModalFooter, Spinner } from 'sveltestrap';
	import { SortableList } from '@jhubbardsf/svelte-sortablejs';
	import type { SortableEvent } from 'sortablejs';
	import {
		useMutation,
		useQuery,
		useQueryClient
	} from '@sveltestack/svelte-query';
	import { ItemsController } from '$lib/ApiControllers';
	import type { Category } from '$lib/types/Category';
	import { t } from '$lib/i18n';
	import { fade } from 'svelte/transition';

	let isOpen: boolean = false;

	function toggle() {
		isOpen = !isOpen;
	}

	let categories: Category[] = [];

	const queryClient = useQueryClient();

	let isQueryEnabled = true;
	const queryResult = useQuery(
		'categories',
		async () => {
			return ItemsController.getCategories();
		},
		{
			enabled: isQueryEnabled,
			onSuccess: (data) => {
				isQueryEnabled = false;
				categories = data;
				categories.sort((a, b) => a.index - b.index);
			}
		}
	);

	const saveCategoriesOrderMutation = useMutation(
		async (categories: Category[]) => {
			return ItemsController.orderCategories(categories);
		},
		{
			onSuccess: () => {
				isOpen = false;
				queryClient.invalidateQueries('categories');
			}
		}
	);

	function onUpdate(e: SortableEvent) {
		const oldIndex = e.oldIndex;
		const newIndex = e.newIndex;
		let movedCat = categories[oldIndex];
		categories.splice(oldIndex, 1);
		categories.splice(newIndex, 0, movedCat);
	}
</script>

<Button size="sm" class="text-nowrap" outline on:click={toggle}>
	{$t('shop:edit_categories_order')}
</Button>

<Modal
	on:open={() => {
		$queryResult.refetch();
	}}
	{isOpen}
	header={$t('shop:edit_categories_order')}
	{toggle}
>
	<ModalBody>
		{#if $queryResult.isSuccess}
			<p>
				{$t('shop:edit_categories_order_info')}
				{#if $queryResult.isFetching}
					<span transition:fade><Spinner size="sm" /></span>
				{/if}
			</p>
			<SortableList
				{onUpdate}
				class="list-group"
				animation={50}
				ghostClass="opacity-25"
			>
				{#each [...categories].sort((a, b) => a.index - b.index) as category}
					<li class="list-group-item">
						{!category._isDefault ? category.name : $t('uncategorized')}
					</li>
				{/each}
			</SortableList>
		{/if}
	</ModalBody>
	<ModalFooter>
		<Button
			on:click={() => {
				isOpen = false;
			}}
		>
			{$t('cancel')}
		</Button>
		<Button
			on:click={() => {
				$saveCategoriesOrderMutation.mutate(
					categories.map((category, index) => ({ ...category, index }))
				);
			}}
			color="primary"
		>
			{$t('save')}
			{#if $saveCategoriesOrderMutation.isLoading}
				<Spinner size="sm" />
			{/if}
		</Button>
	</ModalFooter>
</Modal>
