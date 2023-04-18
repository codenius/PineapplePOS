<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Employee } from '$lib/types/Employee';
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
		Spinner
	} from 'sveltestrap';
	import Select from 'svelte-select';
	import DeleteModal from '../DeleteModal.svelte';
	import type { PageData } from './$types';
	import { EmployeesController } from '$lib/ApiControllers';
	import { t } from '$lib/i18n';

	export let data: PageData;
	let employee: Employee = data as Employee;
	const isNewEmployee = !employee.id;

	const queryClient = useQueryClient();

	const saveEmployeeMutation = useMutation(
		async (employee: Employee) =>
			isNewEmployee
				? EmployeesController.addEmployee(employee)
				: EmployeesController.setEmployee(employee),

		{
			onSuccess: () => {
				queryClient.invalidateQueries('employees');
				goto('/employees');
			}
		}
	);

	let isDeleteModalOpen = false;

	let roles: string[] = [];
	EmployeesController.getRoles().then((loadedRoles) => {
		roles = loadedRoles;
	});
</script>

<div class="p-3">
	<Container xl>
		<Row>
			<Col class="p-0">
				<a href="/employees" class="p-0"
					><Icon name="chevron-left" />{$t('back')}</a
				>
			</Col>
		</Row>
		<Row class="mb-2">
			<Col class="p-0">
				<h1 class="p-0 m-0">
					{isNewEmployee
						? $t('employees:add_employee')
						: $t('employees:edit_employee')}
				</h1>
			</Col>
			<Col class="p-0 d-flex align-items-center justify-content-end">
				<ButtonToolbar class="gap-2">
					<Button type="submit" form="employee_form" color="primary">
						{$t('save')}
						{#if $saveEmployeeMutation.isLoading}
							<Spinner size="sm" />
						{/if}
					</Button>
					<Button href="/employees">{$t('cancel')}</Button>
					<Button
						color="danger"
						disabled={isNewEmployee}
						on:click={() => {
							isDeleteModalOpen = true;
						}}
					>
						{$t('delete')}
					</Button>
					<DeleteModal
						on:deleted={() => {
							goto('/employees');
						}}
						open={isDeleteModalOpen}
						id={employee.id}
					/>
				</ButtonToolbar>
			</Col>
		</Row>
		<Row><hr /></Row>
		<Row class="gap-3">
			<Col class="p-0">
				<h2>{$t('employees:employee_data')}</h2>
				<Form
					id="employee_form"
					on:submit={(event) => {
						event.preventDefault();
						$saveEmployeeMutation.mutate(employee);
					}}
				>
					<FormGroup>
						<Label>{$t('employees:name')}</Label>
						<Input required bind:value={employee.name} />
					</FormGroup>
					<FormGroup>
						<Label>{$t('employees:role')}</Label>
						<Select
							placeholder={$t('employees:select_role')}
							required
							hideEmptyState
							bind:justValue={employee.role}
							value={employee.role}
							items={roles.map((role) => ({
								value: role,
								label: $t(`employees:roles.${role}`, { role })
							}))}
							--font-size="1rem"
							--padding="0 0 0 .75rem"
							--input-padding=".375rem 0"
							--border-focused="1px solid #86b7fe"
							--border-hover="1px solid #ced4da"
						/>
					</FormGroup>
					<FormGroup>
						<Label>{$t('employees:password')}</Label>
						<Input bind:value={employee.password} />
					</FormGroup>
				</Form>
			</Col>
			<Col />
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
