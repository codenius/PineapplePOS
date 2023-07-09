<script lang="ts">
	import { t } from '$lib/i18n';
	import Table from './Table.svelte';
	import { Button, ButtonToolbar, Icon } from 'sveltestrap';
</script>

<Table />

<ButtonToolbar
	id="wrapper"
	style="left: initial; right: 0"
	class="fixed-bottom m-4 gap-2"
>
	<Button
		href="/employees/employee"
		size="lg"
		color="primary"
		class="shadow-lg rounded-pill"
	>
		<Icon name="plus-lg" />
		{$t('employees:add_employee')}
	</Button>
</ButtonToolbar>
