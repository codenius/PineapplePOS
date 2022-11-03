<script lang="ts">
	import { CardImg, Card, CardSubtitle, CardFooter, Icon } from 'sveltestrap';

	export let id: number;
	export let name: string;
	export let price: string;
	export let amount: number;
	export let image: string;

	const amountWarn: number = 15;
	const amountError: number = 5;

	function checkAmount(standard: any, warn: any, error: any): any {
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
</script>

<Card class="m-1 card {checkAmount('', 'border-warning', 'border-danger')}"
	><CardImg style="height: 8em; object-fit: contain" src={image} />

	<CardFooter class="d-flex justify-content-between gap-2 h-100">
		<span class="d-flex align-items-baseline gap-2">
			<span>{name}</span>
			<CardSubtitle style="font-size: inherit">
				<small
					class="{checkAmount(
						'text-muted',
						'text-warning',
						'text-danger'
					)} text-nowrap"
				>
					{#if checkAmount(false, true, true)}
						<Icon name="exclamation-triangle" />
					{/if}
					{amount} aval.</small
				>
			</CardSubtitle>
		</span>
		<span class="text-nowrap">{price}</span>
	</CardFooter>
</Card>
