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
	import type { Item } from '$lib/types/Item';
	import { useMutation, useQueryClient } from '@sveltestack/svelte-query';
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
	import { ItemsController } from '$lib/ApiControllers';
	import div, { filedrop } from 'filedrop-svelte';
	import { t } from '$lib/i18n';
	import ItemCard from '$routes/shop/components/Items/ItemCard.svelte';
	import type { Category } from '$lib/types/Category';

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

	async function setBase64Image(files: FileList) {
		if (files) {
			fileName = files[0].name;
			item.image = await convertBase64(files[0]);
		}
	}

	const queryClient = useQueryClient();

	const saveItemMutation = useMutation(
		async (item: Item) =>
			isNewItem ? ItemsController.addItem(item) : ItemsController.setItem(item),

		{
			onSuccess: () => {
				queryClient.invalidateQueries(['items', 'categories']);
				goto('/stock');
			}
		}
	);

	let fileName: string = '';
	let isFileOver: boolean = false;

	function setDragOver(isDragOver: boolean) {
		return (event: Event) => {
			if (
				isDragOver == false &&
				!event.currentTarget.contains(event.relatedTarget)
			) {
				isFileOver = false;
			} else if (isDragOver == true) {
				isFileOver = true;
			}
			/* isFileOver = isDragOver
			console.log(isDragOver) */
		};
	}

	let isDeleteModalOpen = false;

	let initCategories: Category[] = [];
	ItemsController.getCategories().then((categories) => {
		initCategories = categories.map((category) => ({
			value: category.id,
			label: category.name,
			_isDefault: category._isDefault
		}));
	});
	let categories = initCategories;
	$: categories = initCategories;

	$: newCategoryName
		? (categories = [
				...initCategories,
				{ value: newCategoryName, label: newCategoryName }
		  ])
		: {};
	let newCategoryName: string;
	let categoryFilterText: string;
</script>

<div class="p-3">
	<Container xl>
		<Row>
			<Col class="p-0">
				<a href="/stock" class="p-0"><Icon name="chevron-left" />{$t('back')}</a
				>
			</Col>
		</Row>
		<Row class="mb-2">
			<Col class="p-0">
				<h1 class="p-0 m-0">
					{isNewItem ? $t('stock:create_item') : $t('stock:edit_item')}
				</h1>
			</Col>
			<Col class="p-0 d-flex align-items-center justify-content-end">
				<ButtonToolbar class="gap-2">
					<Button type="submit" form="item_form" color="primary">
						{$t('save')}
						{#if $saveItemMutation.isLoading}
							<Spinner size="sm" />
						{/if}
					</Button>
					<Button href="/stock">{$t('cancel')}</Button>
					<Button
						color="danger"
						disabled={isNewItem}
						on:click={() => {
							isDeleteModalOpen = true;
						}}
					>
						{$t('delete')}
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
				<h2>{$t('stock:item_data')}</h2>
				<Form
					id="item_form"
					on:submit={(event) => {
						event.preventDefault();
						!item.category ? (item.category = null) : {};
						$saveItemMutation.mutate(item);
					}}
				>
					<FormGroup>
						<Label>{$t('stock:name')}</Label>
						<Input required bind:value={item.name} />
					</FormGroup>
					<FormGroup>
						<Label>{$t('stock:amount')}</Label>
						<Input
							min={0}
							type="number"
							inputmode="numeric"
							bind:value={item.amount}
						/>
					</FormGroup>
					<FormGroup>
						<Label>{$t('stock:price')}</Label>
						<Input
							min={0}
							type="number"
							inputmode="decimal"
							step="any"
							bind:value={item.price}
						/>
					</FormGroup>
					<FormGroup>
						<Label>{$t('stock:company')}</Label>
						<Input bind:value={item.company} />
					</FormGroup>
					<FormGroup>
						<Label>{$t('stock:category')}</Label>
						<Select
							placeholder={$t('stock:select_category')}
							on:filter={() => {
								newCategoryName = categoryFilterText;
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
							items={categories.filter(
								(category) => !!category && !category._isDefault
							)}
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
				<h2>{$t('stock:load_item_data')}</h2>
				<div class="d-flex gap-2 mb-2">
					<ScanBarcode callback={insertProductData} />
					<ProductSearch callback={insertProductData} />
				</div>
				<h2>{$t('stock:image')}</h2>
				<TabContent>
					<TabPane
						class="p-2 border-start FILE_TAB"
						tabId="file"
						active
						tab={$t('stock:file')}
					>
						<div
							use:filedrop={{ multiple: false, windowDrop: false }}
							on:filedrop={(event) => {
								isFileOver = false;
								setBase64Image(event.detail.files.accepted);
							}}
							on:filedragenter={setDragOver(true)}
							on:dragleave={setDragOver(false)}
						>
							<div
								class="p-3 bg-light rounded w-100 border DROPZONE {isFileOver &&
									'hover'} d-flex align-items-center justify-content-center"
								style="border-style: dashed !important; border-width: 0.15rem !important;"
							>
								<div class="d-flex gap-1 text-secondary">
									{#if isFileOver}
										<div class="text-black h5">
											<Icon name="plus-circle-dotted" />
											{$t('stock:drop_image')}
										</div>
									{:else if fileName}
										<img
											style="object-fit: contain; height: 2rem;"
											src={item.image}
											alt=""
										/>
										<span
											>{$t('stock:file_selected', { filename: fileName })}</span
										>
									{:else}
										{$t('stock:select_file')}
									{/if}
								</div>
							</div>
						</div>
						<!-- <Dropzone multiple={false} containerClasses="mb-2" on:drop={(event)=>{setBase64Image(event.detail.acceptedFiles)}}>
							{#if fileName}
								<div class="d-flex align-items-center gap-1">
									<img style="object-fit: contain; height: 2rem;" src="{item.image}" alt="">
									<span>{fileName} selected</span>
								</div>
							{:else}
								Click to select or Drag'n'Drop a image
							{/if}
						</Dropzone> -->
					</TabPane>
					<TabPane class="p-2 border-start" tabId="url" tab={$t('stock:url')}>
						<Label>{$t('stock:enter_image_url')}</Label>
						<Input type="url" bind:value={item.image} />
					</TabPane>
				</TabContent>
				<div class="my-2">
					<i>{$t('stock:preview')}</i>
					<div>
						<ItemCard style="width: 15rem" {...item} />
					</div>
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

	:global(.DROPZONE) {
		min-height: 10rem;
		transition: border-color 0.2s;
	}
	:global(.DROPZONE:hover, .DROPZONE.hover) {
		border-color: var(--bs-primary) !important;
	}
	:global(.FILE_TAB label) {
		display: unset;
	}
</style>
