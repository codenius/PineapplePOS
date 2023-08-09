<script lang="ts">
	import { t } from '$lib/i18n';
	import { Button, Modal, ModalBody, ModalFooter } from 'sveltestrap';

	export let open: boolean;
</script>

<Modal isOpen={open} header={$t('access_denied')}>
	<ModalBody>
		{$t('user_not_allowed')}
	</ModalBody>
	<ModalFooter>
		<Button color="primary" href="/">
			{$t('return_to_home')}
		</Button>
	</ModalFooter>
</Modal>
