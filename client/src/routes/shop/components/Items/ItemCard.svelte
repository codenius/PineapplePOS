<script lang="ts">
	import { shoppingBag } from '$lib/stores/shoppingBag';
	import { CardImg, Card, CardSubtitle, CardFooter, Icon } from 'sveltestrap';
	import type { Item } from '$lib/types/Item';
	import { formatCurrency } from '$lib/currencyHelpers';
	import { language } from '$lib/i18n';

	export let id: Item['id'];
	export let name: Item['name'];
	export let price: Item['price'];
	export let amount: Item['amount'];
	export let image: Item['image'];
	let active: boolean = false;
	let timeoutPassed: boolean = false;
	let timeout: Promise<void>;

	const amountWarn: number = 15;
	const amountError: number = 5;

	function checkAmount(
		amount: number,
		standard: any,
		warn: any,
		error: any
	): any {
		let result: any;
		if (amount <= amountError) {
			result = error;
		} else if (amount <= amountWarn) {
			result = warn;
		} else {
			result = standard;
		}
		return result;
	}

	function increaseInShoppingBag(): void {
		if (amount - 1 >= 0) {
			let shoppingBagIndex = $shoppingBag.findIndex((item) => item.id === id);
			let shoppingBagEntry = $shoppingBag[shoppingBagIndex];
			if (shoppingBagEntry) {
				let bagAmount = shoppingBagEntry.amount + 1;
				$shoppingBag[shoppingBagIndex].amount = bagAmount;
			} else {
				let bagAmount = 1;
				$shoppingBag.push({ id: id, amount: bagAmount });
			}
			$shoppingBag = $shoppingBag;
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="CARD"
	class:active
	on:mousedown={() => {
		active = true;
		timeout = new Promise((resolve) =>
			setTimeout(() => {
				timeoutPassed = true;
				resolve();
			}, 150)
		);
	}}
	on:click={() => {
		if (timeoutPassed) {
			active = false;
			timeoutPassed = false;
		} else {
			timeout.then(() => {
				active = false;
				timeoutPassed = false;
			});
		}
	}}
	on:mouseleave={() => {
		if (timeoutPassed) {
			active = false;
			timeoutPassed = false;
		} else {
			timeout?.then(() => {
				active = false;
				timeoutPassed = false;
			});
		}
	}}
>
	<Card
		on:click={increaseInShoppingBag}
		class="m-1 card {checkAmount(
			amount,
			'',
			'border-warning',
			'border-danger'
		)}"
		><CardImg
			draggable={false}
			style="height: 8em; object-fit: contain"
			src={image}
		/>

		<CardFooter class="d-flex justify-content-between gap-2 h-100">
			<span class="d-flex align-items-baseline gap-2">
				<span>{name}</span>
				<CardSubtitle style="font-size: inherit">
					<small
						class="{checkAmount(
							amount,
							'text-muted',
							'text-warning',
							'text-danger'
						)} text-nowrap"
					>
						{#if checkAmount(amount, false, true, true)}
							<Icon name="exclamation-triangle" />
						{/if}
						{amount} aval.</small
					>
				</CardSubtitle>
			</span>
			<span class="text-nowrap">{formatCurrency(price, $language)}</span>
		</CardFooter>
	</Card>
</div>

<style>
	.CARD {
		transition: opacity, transform 75ms;
		transition-timing-function: ease-out;
	}

	.CARD:hover {
		opacity: 0.85;
	}

	.CARD.active {
		transform: scale(0.9);
		opacity: 0.8;
		transition-timing-function: ease-in;
	}
</style>
