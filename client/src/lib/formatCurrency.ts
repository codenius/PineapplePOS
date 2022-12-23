export function formatCurrency(
	number: number,
	currency: string,
	language: string
) {
	const style = 'currency';
	const options = {
		style,
		currency
	};

	const formated = new Intl.NumberFormat(language, options).format(number);
	return formated;
}
