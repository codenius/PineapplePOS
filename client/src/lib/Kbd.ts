export default function Kbd(key: string, classes: string = '') {
	return `<kbd class="bg-light text-secondary border ${classes}">${key}</kbd>`;
}
