<script lang="ts">
	import { payModal } from '$lib/stores/payModal';
	import { shoppingBag } from '$lib/stores/shoppingBag';
	import Numpad from './components/PayModal/Numpad.svelte';
	import type { Item } from '$lib/types/Item';
	import {
		useMutation,
		useQuery,
		useQueryClient
	} from '@sveltestack/svelte-query';
	import {
		Modal,
		ModalHeader,
		ModalBody,
		ModalFooter,
		Container,
		Row,
		Col,
		Button,
		Icon,
		Spinner
	} from 'sveltestrap';
	import Receipt from './components/PayModal/Receipt.svelte';
	import { formatCurrency } from '$lib/currencyHelpers';
	import { calculateTotal } from './+page.svelte';
	import { language, t } from '$lib/i18n';
	import type { ShoppingBagEntry } from '$lib/types/ShoppingBagEntry';
	import { ItemsController } from '$lib/ApiControllers';
	import Kbd from '$lib/Kbd';

	function toggle() {
		$payModal = !$payModal;
	}

	let queryResult = useQuery<Item[], Error>('items');

	let given: number;

	let total: number;
	$: total = calculateTotal($shoppingBag, $queryResult.data || []);

	const queryClient = useQueryClient();

	const sellMutation = useMutation(
		async (shoppingBag: ShoppingBagEntry[]) => {
			return ItemsController.sellItems(shoppingBag);
		},
		{
			onSuccess: () => {
				$shoppingBag = [];
				$payModal = false;
				queryClient.invalidateQueries('items');
			}
		}
	);

	function sell() {
		$sellMutation.mutate($shoppingBag);
	}
</script>

<!-- <svelte:window
	use:shortcut={{ trigger: { key: 'Enter', modifier: 'ctrl', callback: sell } }}
/>
 -->

<svelte:window
	on:keydown={(e) => {
		if (e.key == 'Enter' && e.ctrlKey && $payModal) {
			sell();
		}
	}}
/>

<Modal scrollable={true} size="xl" isOpen={$payModal} {toggle}>
	<ModalHeader {toggle}>{$t('shop:pay')}</ModalHeader>
	<ModalBody>
		<Container fluid class="m-0 p-0">
			<Row class="gap-3 flex-nowrap">
				<Col style="flex-grow: 2;">
					<Receipt />
				</Col>
				<Col class="flex-shrink-0">
					<div class="mb-3">
						<h2 class="m-0">{$t('shop:total')}</h2>
						<h3
							class="text-truncate"
							style="font-weight: initial; max-width: 15rem;"
						>
							{formatCurrency(total, $language)}
						</h3>
					</div>
					<div class="mb-3">
						<h2>{$t('shop:given')}</h2>
						<h3
							class="text-truncate"
							style="font-weight: initial; max-width: 15rem;"
						>
							{#if given != undefined}
								{#if given < total}
									<Icon name="exclamation-triangle" class="text-warning" />
								{/if}
								{formatCurrency(given, $language)}
							{:else}
								–
							{/if}
						</h3>
					</div>
					<div class="mb-3">
						<h2>{$t('shop:change')}</h2>
						<h3
							class="text-truncate"
							style="font-weight: initial; max-width: 15rem;"
						>
							{#if given != undefined && given - total >= 0}
								{formatCurrency(given - total, $language)}
							{:else}
								–
							{/if}
						</h3>
					</div>
				</Col>
				<Col style="flex-grow: 1.5">
					<Numpad bind:numericValue={given} />
				</Col>
			</Row>
		</Container>
	</ModalBody>
	<ModalFooter class="justify-content-between">
		<span class="text-secondary">
			{@html $t('shop:pay_proceed', {
				key: `${Kbd('Ctrl')} + ${Kbd('Enter')}`,
				interpolation: { escapeValue: false }
			})}
		</span>
		<div>
			<Button
				on:click={() => {
					$payModal = false;
				}}
				color="secondary">{$t('cancel')}</Button
			>
			<Button on:click={sell} color="primary"
				>{$t('done')}
				{#if $sellMutation.isLoading}
					<Spinner size="sm" />
				{/if}
			</Button>
		</div>
	</ModalFooter>
</Modal>

<style global>
	/* 	.Modal {
		width: initial;
		height: max-content;
	}
	.Modal .modal-content {
		border-radius: inherit;
	}
	.modal-dialog.modal-xl {
		max-width: 80%;
	} */
	@media (max-width: 1024px) {
		.modal-dialog {
			max-width: 100%;
			margin: 1.75rem 1rem;
		}
	}
</style>
