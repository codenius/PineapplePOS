export class NumberParser {
	_group: RegExp;
	_decimal: RegExp;
	_numeral: RegExp;
	_index: (digit: string) => number | undefined;
	decimalSeperator: string;
	constructor(locale: string) {
		const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
		const numerals = [
			...new Intl.NumberFormat(locale, { useGrouping: false }).format(
				9876543210
			)
		].reverse();
		const index = new Map(numerals.map((d, i) => [d, i]));
		this._group = new RegExp(
			`[${parts.find((d) => d.type === 'group')?.value}]`,
			'g'
		);
		this.decimalSeperator =
			parts.find((d) => d.type === 'decimal')?.value || '.';
		this._decimal = new RegExp(`[${this.decimalSeperator}]`);
		this._numeral = new RegExp(`[${numerals.join('')}]`, 'g');
		this._index = (digit) => index.get(digit);
	}
	parse(string: string) {
		if (!string) return;
		string = '0' + string; // makes sure to return 0 when string is ','
		string = string
			.trim()
			.replace(this._group, '')
			.replace(this._decimal, '.')
			.replace(this._numeral, (digit) => '' + this._index(digit));
		return +string;
	}
}
