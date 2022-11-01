<script>
	import { Button, ButtonToolbar, Icon } from 'sveltestrap';
</script>

<ButtonToolbar
	id="wrapper"
	style="left: initial; right: 0"
	class="fixed-bottom m-4 gap-2"
>
	<span class="shadow-lg rounded-pill bg-secondary text-white btn-lg"
		>€44.23</span
	>
	<Button size="lg" color="primary" class="shadow-lg rounded-pill"
		>Pay <Icon name="arrow-right" /></Button
	>
</ButtonToolbar>
