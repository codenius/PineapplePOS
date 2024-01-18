import { persisted } from 'svelte-local-storage-store';

export const min: number = 5;
export const max: number = 10;
export const step: number = 0.5;

const zoomDefault: number = 7.5;
export let zoomFactor = persisted('itemsZoom', zoomDefault);
