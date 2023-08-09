<script lang="ts">
	import { Button, Modal, ModalBody, ModalFooter, Spinner } from 'sveltestrap';
	import type { Employee } from '$lib/types/Employee';
	import { useMutation, useQueryClient } from '@sveltestack/svelte-query';
	import { createEventDispatcher } from 'svelte';
	import { EmployeesController } from '$lib/ApiControllers';
	import { t } from '$lib/i18n';

	export let id: Employee['id'];
	export let open = false;
	const queryClient = useQueryClient();

	function toggle() {
		open = !open;
	}

	const dispatch = createEventDispatcher();

	const deleteEmployeeMutation = useMutation(
		async (id: Employee['id']) => {
			EmployeesController.deleteEmployee(id);
		},
		{
			onSuccess: () => {
				open = false;
			}
		}
	);

	let deleteButton: HTMLButtonElement;
</script>

<Modal
	header={$t('employees:confirm_deletion')}
	{toggle}
	isOpen={open}
	on:open={() => {
		deleteButton.focus();
	}}
	on:close={() => {
		if ($deleteEmployeeMutation.isSuccess) {
			dispatch('deleted');
			queryClient.invalidateQueries('employees');
		}
	}}
>
	<ModalBody>{$t('employees:delete_prompt')}</ModalBody>
	<ModalFooter>
		<Button
			bind:inner={deleteButton}
			on:click={() => {
				$deleteEmployeeMutation.mutate(id);
			}}
			color="danger"
		>
			{$t('delete')}
			{#if $deleteEmployeeMutation.isLoading}
				<Spinner size="sm" />
			{/if}
		</Button>
		<Button
			on:click={() => {
				open = false;
			}}>{$t('cancel')}</Button
		>
	</ModalFooter>
</Modal>
