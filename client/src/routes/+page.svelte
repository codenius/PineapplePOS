<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	// @ts-ignore: lib is not correctly typed
	import TypeWriter from 'typewriter-effect/dist/core';
	import type { TypewriterClass } from 'typewriter-effect';
	import GraphemeSplitter from 'grapheme-splitter';
	import { Container } from 'sveltestrap';
	import { language, t } from '$lib/i18n';

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

	let heading: HTMLHeadingElement;
	let typewriter: TypewriterClass;

	function setupTypewriter() {
		if (browser) {
			typewriter = new TypeWriter(heading, {
				loop: true,
				stringSplitter,
				skipAddStyles: false
			}) as TypewriterClass;
			typewriter
				.typeString(
					$t('home:typewriter.welcome_to', {
						br,
						name: strong('Pinappl'),
						interpolation: { escapeValue: false }
					})
				)
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
				.typeString(
					$t('home:typewriter.slogan', {
						br,
						italic: italic($t('home:typewriter.easy-to-use') as string),
						interpolation: { escapeValue: false }
					})
				)
				.pauseFor(300)
				.typeString('.')
				.pauseFor(2000)
				.start();
		}
	}

	$: $language, setupTypewriter(); // setup typewriter with new locales when language changes

	let showDefaultHeading = true;
	onMount(() => {
		showDefaultHeading = false;
		setupTypewriter();
	});
</script>

<Container>
	<div class="h-100 w-100 d-flex pt-5 px-5 flex-column">
		<h1 class="display-2 px-5" style="min-height: 2.5em;" bind:this={heading}>
			{#if showDefaultHeading}
				{@html $t('home:typewriter.welcome_to', {
					br,
					name: strong('PineapplePOS🍍'),
					interpolation: { escapeValue: false }
				})}
			{/if}
		</h1>
		<section class="lead p-5">
			<p>
				{$t('home:product_introduction')}
			</p>
			<p>
				{$t('home:open_source_note')}
			</p>
			<a href="http://github.com" target="_blank" rel="noopener noreferrer">
				{$t('home:on_github', { name: 'PineapplePOS' })}
			</a>
		</section>
	</div>
</Container>
