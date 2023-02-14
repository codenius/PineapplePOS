<script context="module" lang="ts">
	export type ProductSelectCallback = (
		product: Product,
		mode: 'all' | 'image'
	) => void;

	export interface Product {
		code: string;
		product_name: string;
		image_front_small_url: string;
		brands: string;
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { addItem, getCategories, setItem } from '$lib/data';
	import type { Item } from '$lib/types/Item';
	import { useMutation } from '@sveltestack/svelte-query';
	import {
		Button,
		ButtonToolbar,
		Col,
		Container,
		Form,
		FormGroup,
		Icon,
		Input,
		Label,
		Row,
		Spinner,
		TabContent,
		TabPane
	} from 'sveltestrap';
	import Select from 'svelte-select';
	import DeleteModal from '../DeleteModal.svelte';
	import type { PageData } from './$types';
	import ProductSearch from './ProductSearch.svelte';
	import ScanBarcode from './ScanBarcode.svelte';

	export let data: PageData;
	let item: Item = data as Item;
	const isNewItem = !item.id;

	const insertProductData: ProductSelectCallback = (product, mode) => {
		item.image = product.image_front_small_url;
		if (mode == 'all') {
			item.name = product.product_name;
			item.company = product.brands;
		}
	};

	function convertBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result as string);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	}

	async function setBase64Image(event: Event) {
		const fileInput = event.target as HTMLInputElement;
		fileInput.files
			? (item.image = await convertBase64(fileInput.files[0]))
			: {};
	}

	const saveItemMutation = useMutation(
		async (item: Item) => {
			if (isNewItem) {
				addItem(item);
			} else {
				setItem(item);
			}
		},
		{
			onSuccess: () => {
				goto('/stock');
			}
		}
	);

	let isDeleteModalOpen = false;
	const initCategories = getCategories();
	let categories = initCategories;
	$: newCategory ? (categories = [...initCategories, newCategory]) : {};
	let newCategory: string;
	let categoryFilterText: string;
</script>

<div class="p-3">
	<Container xl>
		<Row>
			<Col class="p-0">
				<a href="/stock" class="p-0"><Icon name="chevron-left" />Back</a>
			</Col>
		</Row>
		<Row class="mb-2">
			<Col class="p-0">
				<h1 class="p-0 m-0">{isNewItem ? 'Create new item' : 'Edit item'}</h1>
			</Col>
			<Col class="p-0 d-flex align-items-center justify-content-end">
				<ButtonToolbar class="gap-2">
					<Button type="submit" form="item_form" color="primary">
						Save
						{#if $saveItemMutation.isLoading}
							<Spinner size="sm" />
						{/if}
					</Button>
					<Button href="/stock">Cancel</Button>
					<Button
						color="danger"
						disabled={isNewItem}
						on:click={() => {
							isDeleteModalOpen = true;
						}}
						>Delete
					</Button>
					<DeleteModal
						on:deleted={() => {
							goto('/stock');
						}}
						open={isDeleteModalOpen}
						id={item.id}
					/>
				</ButtonToolbar>
			</Col>
		</Row>
		<Row><hr /></Row>
		<Row class="gap-3">
			<Col class="p-0">
				<h2>Product data</h2>
				<Form
					id="item_form"
					on:submit={(event) => {
						event.preventDefault();
						!item.category ? (item.category = '') : {};
						$saveItemMutation.mutate(item);
					}}
				>
					<FormGroup>
						<Label>Name</Label>
						<Input bind:value={item.name} />
					</FormGroup>
					<FormGroup>
						<Label>Amount</Label>
						<Input type="number" inputmode="numeric" bind:value={item.amount} />
					</FormGroup>
					<FormGroup>
						<Label>Price</Label>
						<Input
							type="number"
							inputmode="numeric"
							step="any"
							bind:value={item.price}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Company</Label>
						<Input bind:value={item.company} />
					</FormGroup>
					<FormGroup>
						<Label>Category</Label>
						<Select
							on:filter={() => {
								newCategory = categoryFilterText;
							}}
							on:blur={() => {
								!item.category ? (categories = initCategories) : {};
							}}
							on:clear={() => {
								categories = initCategories;
							}}
							bind:filterText={categoryFilterText}
							value={item.category}
							bind:justValue={item.category}
							items={categories}
							--font-size="1rem"
							--padding="0 0 0 .75rem"
							--input-padding=".375rem 0"
							--border-focused="1px solid #86b7fe"
							--border-hover="1px solid #ced4da"
						/>
					</FormGroup>
				</Form>
			</Col>
			<Col class="p-0">
				<h2>Load product data</h2>
				<div class="d-flex gap-2">
					<ScanBarcode callback={insertProductData} />
					<ProductSearch callback={insertProductData} />
				</div>
				<h2>Image</h2>
				<TabContent>
					<TabPane class="p-2 border-start" tabId="file" active tab="File">
						<Label>Select or Drag'n'Drop an image file</Label>
						<Input type="file" on:input={setBase64Image} />
					</TabPane>
					<TabPane class="p-2 border-start" tabId="url" tab="URL">
						<Label>Enter an image url from the public web</Label>
						<Input type="url" bind:value={item.image} />
					</TabPane>
				</TabContent>
				<div class="my-2">
					<i>Image preview</i>
					<figure
						class="bg-secondary bg-opacity-25 border border-dark rounded d-flex justify-content-center align-items-center p-2 my-2"
						style="height: 15rem; aspect-ratio: 1/1;"
					>
						<img
							style="height: 100%; width: 100%; 
						object-fit: contain;"
							src={item.image}
							alt=""
						/>
					</figure>
				</div>
			</Col>
		</Row>
		<Row />
	</Container>
</div>

<style>
	:global(.svelte-select:hover, .svelte-select input:hover) {
		cursor: text !important;
	}
	:global(.svelte-select .indicators:hover) {
		cursor: default;
	}
	:global(.svelte-select) {
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	}
	:global(.svelte-select.focused) {
		box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
	}
</style>
