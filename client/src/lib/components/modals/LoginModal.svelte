<script lang="ts">
	import { EmployeesController } from '$lib/ApiControllers';
	import { t } from '$lib/i18n';
	import type { Credentials, Employee } from '$lib/types/Employee';
	import { useMutation, useQueryClient } from '@sveltestack/svelte-query';
	import {
		Button,
		Form,
		FormGroup,
		Icon,
		Input,
		InputGroup,
		InputGroupText,
		Label,
		Modal,
		ModalBody,
		ModalFooter,
		ModalHeader,
		Spinner
	} from 'sveltestrap';

	export let open: boolean = true;
	let input: HTMLInputElement;
	let passwordVisible: boolean = false;

	const defaultCredentials: Credentials = { name: '', password: '' };
	let credentials: Credentials = { ...defaultCredentials };

	const queryClient = useQueryClient();
	const loginMutation = useMutation(
		(credentials: Credentials) =>
			EmployeesController.loginEmployee(credentials),
		{
			onSuccess: () => {
				credentials = { ...defaultCredentials };
				queryClient.invalidateQueries();
			}
		}
	);

	function login(event: Event) {
		event.preventDefault();
		$loginMutation.mutate(credentials);
	}

	function stopPropagation(event: Event) {
		event.stopPropagation();
	}
</script>

<Modal
	isOpen={open}
	on:open={() => {
		input.focus();
	}}
>
	<ModalHeader>{$t('login')}</ModalHeader>
	<ModalBody>
		<Form id="login_form" on:submit={login}>
			<FormGroup>
				<Label>{$t('name')}</Label>
				<Input
					bind:inner={input}
					type="text"
					bind:value={credentials.name}
					on:keydown={stopPropagation}
				/>
			</FormGroup>
			<FormGroup>
				<Label>{$t('password')}</Label>
				<InputGroup>
					<Input
						type={passwordVisible ? 'text' : 'password'}
						bind:value={credentials.password}
						on:keydown={stopPropagation}
					/>
					<InputGroupText class="p-0">
						<Button
							color="light"
							type="button"
							on:click={() => {
								passwordVisible = !passwordVisible;
							}}
							style="border-top-left-radius: 0; border-bottom-left-radius: 0;"
						>
							<Icon name={passwordVisible ? 'eye-slash' : 'eye'} />
						</Button>
					</InputGroupText>
				</InputGroup>
			</FormGroup>
		</Form>

		{#if $loginMutation.isError}
			<div class="text-danger">
				{$t('password_error')}
			</div>
		{/if}
		<small>{$t('password_forgotten')}</small>
	</ModalBody>
	<ModalFooter>
		<Button type="submit" color="primary" form="login_form">
			{$t('login')}
			{#if $loginMutation.isLoading}
				<Spinner size="sm" />
			{/if}
		</Button>
	</ModalFooter>
</Modal>
