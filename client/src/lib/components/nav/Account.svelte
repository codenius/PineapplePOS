<script lang="ts">
	import {
		Button,
		ButtonDropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Icon,
		Modal,
		ModalBody,
		ModalFooter
	} from 'sveltestrap';
	import NavPart from './NavPart.svelte';
	import { t } from '$lib/i18n';
	import {
		useMutation,
		useQuery,
		useQueryClient
	} from '@sveltestack/svelte-query';
	import { EmployeesController } from '$lib/ApiControllers';
	import LoginModal from '../modals/LoginModal.svelte';
	import { page } from '$app/stores';
	import { allowedRoutes } from '$lib/permissons';
	import type { Employee } from '$lib/types/Employee';
	import AccessDeniedModal from '../modals/AccessDeniedModal.svelte';

	export let expanded: boolean = false;
	let isOpen: boolean = false;

	let loggedOut: boolean = false;

	function isUnauthenticated(error: Error) {
		return error.toString().includes('401');
	}

	const queryResult = useQuery(
		'currentEmployee',
		async () => {
			return EmployeesController.getCurrentEmployee();
		},
		{
			onError: (error) => {
				loggedOut = isUnauthenticated(error as Error);
			},
			onSuccess: () => {
				loggedOut = false;
			},
			retry: (failes, error) => {
				if (isUnauthenticated(error as Error)) {
					return false;
				}
				if (failes >= 3) {
					return false;
				}
				return true;
			}
		}
	);

	const queryClient = useQueryClient();
	const logoutMutation = useMutation(
		() => EmployeesController.logoutCurrentEmployee(),
		{
			onSuccess: () => {
				loggedOut = true;
				queryClient.invalidateQueries('currentEmployee');
				queryClient.invalidateQueries();
			}
		}
	);

	let isDisallowedRoute = false;

	$: isDisallowedRoute = $queryResult.isSuccess
		? !(
				allowedRoutes[($queryResult.data as Employee).role] as string[]
		  ).includes($page.url.pathname.split('/')[1])
		: false;
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

<LoginModal open={loggedOut} />

<AccessDeniedModal open={isDisallowedRoute} />
