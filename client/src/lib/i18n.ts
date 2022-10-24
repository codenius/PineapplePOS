import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { createI18nStore } from 'svelte-i18next';
import { writable } from 'svelte/store';

i18next
	.use(HttpBackend)
	.use(LanguageDetector)
	.init({
		detection: {
			order: ['querystring', 'localStorage', 'navigator'],
			caches: ['localStorage'],
			lookupQuerystring: 'lng',
			lookupLocalStorage: 'locale'
		},
		fallbackLng: ['en', 'de'],
		ns: 'common',
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json'
		},
		interpolation: { escapeValue: true }
	});

export const i18n = createI18nStore(i18next);

let tInitial: any;
export const t = writable(tInitial);
i18n.subscribe((writable) => {
	t.set(writable.t);
});
