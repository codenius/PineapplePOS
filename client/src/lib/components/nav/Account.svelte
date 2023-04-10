<script lang="ts">
	import {
		ButtonDropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Icon
	} from 'sveltestrap';
	import NavPart from './NavPart.svelte';
	import { t } from '$lib/i18n';
	import {
		useMutation,
		useQuery,
		useQueryClient
	} from '@sveltestack/svelte-query';
	import { EmployeesController } from '$lib/ApiControllers';
	import LoginModal from './LoginModal.svelte';

	export let expanded: boolean = false;
	let isOpen: boolean = false;

	let loggedOut: boolean = false;

	const queryResult = useQuery(
		'currentEmployee',
		async () => {
			return EmployeesController.getCurrentEmployee();
		},
		{
			onError: (error) => {
				loggedOut = (error as Error).toString().includes('401');
			}
		}
	);

	const queryClient = useQueryClient();
	const logoutMutation = useMutation(
		() => EmployeesController.logoutCurrentEmployee(),
		{
			onSuccess: () => {
				loggedOut = true;
				queryClient.invalidateQueries();
			}
		}
	);
</script>

<ButtonDropdown direction="up" {isOpen} toggle={() => (isOpen = !isOpen)}>
	<DropdownToggle color="transparent" class="p-0">
		<ul class="list-unstyled mb-1 nav d-block">
			<NavPart icon="person-circle" class="border-bottom-0" bind:expanded>
				<span
					class="text-start"
					style="overflow:hidden; 
                    word-break: break-word;  
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;"
				>
					{#if $queryResult.isSuccess}
						{$queryResult.data?.name}
					{:else}
						{$t('not_logged_in')}
					{/if}
				</span>
			</NavPart>
		</ul>
	</DropdownToggle>
	{#if $queryResult.isSuccess}
		<DropdownMenu class="shadow-sm mx-2">
			<DropdownItem disabled>
				<Icon name="person" />
				{$t('logged_in_as', { user: $queryResult.data?.name })}
			</DropdownItem>
			<DropdownItem
				><Icon name="key-fill" /> {$t('change_password')}</DropdownItem
			>
			<DropdownItem
				on:click={() => {
					$logoutMutation.mutate();
				}}><Icon name="box-arrow-left" /> {$t('logout')}</DropdownItem
			>
		</DropdownMenu>
	{/if}
</ButtonDropdown>

{#if loggedOut}
	<LoginModal bind:open={loggedOut} />
{/if}
