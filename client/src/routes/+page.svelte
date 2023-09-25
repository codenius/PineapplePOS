<script lang="ts">
	import { onMount } from 'svelte';
	// @ts-ignore: lib not correctly typed
	import TypeWriter from 'typewriter-effect/dist/core';
	import type { TypewriterClass } from 'typewriter-effect';
	import GraphemeSplitter from 'grapheme-splitter';
	import { Container } from 'sveltestrap';

	let heading: HTMLHeadingElement;

	function stringSplitter(string: string) {
		const splitter = new GraphemeSplitter();
		return splitter.splitGraphemes(string);
	}

	function encloseWithTag(tag: keyof HTMLElementTagNameMap) {
		return (child: string = '') => {
			return `<${tag}>${child}</${tag}>`;
		};
	}

	const strong = encloseWithTag('strong');
	const italic = encloseWithTag('em');
	const br = '<br>';

	onMount(() => {
		const typewriter = new TypeWriter(heading, {
			loop: true,
			stringSplitter,
			skipAddStyles: false
		}) as TypewriterClass;
		typewriter
			.typeString(`Welcome to ${br}${strong('Pinappl')}`)
			.deleteChars(4)
			.pauseFor(100)
			.changeDelay(300)
			.typeString(strong('eap'))
			.changeDelay('natural')
			.typeString(strong('plePOS'))
			.pauseFor(300)
			.typeString('🍍')
			.pauseFor(5000)
			.deleteAll()
			.typeString(`The ${italic('easy-to-use')} ${br}shop software`)
			.pauseFor(300)
			.typeString('.')
			.pauseFor(2000)
			.start();
	});
</script>

<Container>
	<div class="h-100 w-100 d-flex pt-5 px-5 flex-column">
		<h1 class="display-2 px-5" style="min-height: 2.5em;" bind:this={heading}>
			Welcome to <strong>PineapplePOS🍍</strong>
		</h1>
		<section class="lead p-5">
			<p>
				This is a simple and easy-to-use inventory managment software made for
				small sales. The user interface is based on tapping products instad of
				scanning barcodes for even greater simplicity.
			</p>
			<p>
				PineapplePOS is Open Source software. <br />
				Find this project on GitHub to contribute, ask questions or request features.
			</p>
			<a href="http://github.com" target="_blank" rel="noopener noreferrer">
				PineapplePOS on GitHub
			</a>
		</section>
	</div>
</Container>
