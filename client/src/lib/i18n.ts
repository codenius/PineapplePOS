import i18next, { type TFunction } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { createI18nStore } from 'svelte-i18next';
import { writable } from 'svelte/store';

i18next
	.use(
		resourcesToBackend(
			(language: string, namespace: string) =>
				import(`../locales/${language}/${namespace}.json`)
		)
	)
	.use(LanguageDetector)
	.init({
		detection: {
			order: ['querystring', 'localStorage', 'navigator'],
			caches: ['localStorage'],
			lookupQuerystring: 'lng',
			lookupLocalStorage: 'locale'
		},
		fallbackLng: ['en', 'de'],
		ns: ['common', 'shop', 'stock', 'employees', 'help'],
		interpolation: { escapeValue: true }
	});

export const i18n = createI18nStore(i18next);

let tInitial!: TFunction;
export const t = writable(tInitial);
i18n.subscribe((writable) => {
	t.set(writable.t);
});

let languageInitial!: string;
export const language = writable(languageInitial);
i18n.subscribe((i18n) => {
	language.set(i18n.language);
});
