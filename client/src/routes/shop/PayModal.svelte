<script lang="ts">
	import { payModal } from '$lib/stores/payModal';
	import { shoppingBag } from '$lib/stores/shoppingBag';
	import Numpad from './components/PayModal/Numpad.svelte';
	import type { Item } from '$lib/types/Item';
	import { useQuery } from '@sveltestack/svelte-query';
	import {
		Modal,
		ModalHeader,
		ModalBody,
		ModalFooter,
		Container,
		Row,
		Col,
		Button,
		Icon
	} from 'sveltestrap';
	import Receipt from './components/PayModal/Receipt.svelte';
	import { formatCurrency } from '$lib/formatCurrency';
	import { language } from '$lib/i18n';
	import { calculateTotal } from './+page.svelte';
	function toggle() {
		$payModal = !payModal;
	}

	let queryResult = useQuery<Item[], Error>('items');

	let given: number;

	let total: number;
	$: total = calculateTotal($shoppingBag, $queryResult.data || []);
</script>

<Modal scrollable={true} size="xl" isOpen={$payModal} {toggle}>
	<ModalHeader {toggle}>Pay</ModalHeader>
	<ModalBody>
		<Container fluid class="m-0 p-0">
			<Row class="gap-3 flex-nowrap">
				<Col style="flex-grow: 2;">
					<Receipt />
				</Col>
				<Col class="flex-shrink-0">
					<div class="mb-3">
						<h2 class="m-0">Total</h2>
						<h3
							class="text-truncate"
							style="font-weight: initial; max-width: 15rem;"
						>
							{formatCurrency(total, 'EUR', $language)}
						</h3>
					</div>
					<div class="mb-3">
						<h2>Given</h2>
						<h3
							class="text-truncate"
							style="font-weight: initial; max-width: 15rem;"
						>
							{#if given != undefined}
								{#if given < total}
									<Icon name="exclamation-triangle" class="text-warning" />
								{/if}
								{formatCurrency(given, 'EUR', $language)}
							{:else}
								–
							{/if}
						</h3>
					</div>
					<div class="mb-3">
						<h2>Change</h2>
						<h3
							class="text-truncate"
							style="font-weight: initial; max-width: 15rem;"
						>
							{#if given != undefined && given - total >= 0}
								{formatCurrency(given - total, 'EUR', $language)}
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
	<ModalFooter>
		<Button
			on:click={() => {
				$payModal = false;
			}}
			color="secondary">Cancel</Button
		>
		<Button color="primary">Done</Button></ModalFooter
	>
</Modal>

<style global>
	.Modal {
		width: initial;
		height: max-content;
	}
	.Modal .modal-content {
		border-radius: inherit;
	}
	.modal-dialog.modal-xl {
		max-width: 80%;
	}
</style>
