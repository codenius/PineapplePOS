<script>
	import { CardImg, Card, CardSubtitle, CardFooter } from 'sveltestrap';
</script>

<Card class="m-1 card"
	><CardImg
		style="height: 8rem; object-fit: contain"
		src="//google.com/favicon.ico"
	/>

	<CardFooter class="d-flex justify-content-between align-items-center">
		<span class="d-flex justify-content-between align-items-baseline gap-1">
			<span>Lorem, ipsum.</span>
			<CardSubtitle>
				<small class="text-muted">46 available</small>
			</CardSubtitle>
		</span>
		<span> $50 </span>
	</CardFooter>
</Card>
