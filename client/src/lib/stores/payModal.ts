import { writable } from 'svelte/store';

const open: boolean = false;
export const payModal = writable(open);
