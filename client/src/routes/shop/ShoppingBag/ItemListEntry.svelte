<script lang="ts">
	import { ListGroupItem, Icon, Button, Input } from 'sveltestrap';
</script>

<ListGroupItem class="d-flex justify-content-between align-items-center">
	<span class="d-flex justify-content-between align-items-center">
		<img src="//google.com/favicon.ico" alt="" class="rounded border p-1" />
		<span>Lorem, ipsum.</span>
	</span>
	<span class="d-flex align-items-center flex-shrink-0 gap-1">
		<span id="span" class="d-flex align-items-center gap-1">
			<Button>
				<Icon name="dash" />
			</Button>
			<Input value={1} class="text-center" style="width: 3rem" />
			<Button>
				<Icon name="plus" />
			</Button>
		</span>
		<span>$50</span>
	</span>
</ListGroupItem>

<style>
</style>
