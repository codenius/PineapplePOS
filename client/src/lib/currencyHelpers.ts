import { language as lngStore } from '$lib/i18n';

let lng: string;
lngStore.subscribe((value) => {
	lng = value;
});

export function getCurrency(): string {
	return 'EUR';
}

export function formatCurrency(
	number: number,
	language: string = lng,
	currency: string = getCurrency()
) {
	const style = 'currency';
	const options = {
		style,
		currency
	};

	const formated = new Intl.NumberFormat(language, options).format(number);
	return formated;
}
