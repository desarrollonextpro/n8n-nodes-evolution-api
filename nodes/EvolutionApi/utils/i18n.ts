import { IExecuteFunctions } from 'n8n-workflow';

// Import locale files
import enLocale from '../locales/en.json';
import ptLocale from '../locales/pt.json';

const locales = {
	en: enLocale,
	pt: ptLocale,
};

export function getLocale(executeFunctions: IExecuteFunctions): string {
	// Get user locale from n8n context or default to 'en'
	const userLocale = executeFunctions.getNode().parameters?.locale as string;

	// If no locale is set, try to detect from browser or default to English
	if (!userLocale) {
		// For n8n nodes, we typically default to English
		return 'en';
	}

	// Check if the locale exists in our supported locales
	return locales[userLocale as keyof typeof locales] ? userLocale : 'en';
}

export function t(executeFunctions: IExecuteFunctions, key: string, params?: Record<string, string>): string {
	const locale = getLocale(executeFunctions);
	const translations = locales[locale as keyof typeof locales];

	// Navigate through the translation object using dot notation
	const keys = key.split('.');
	let translation: any = translations;

	for (const k of keys) {
		translation = translation?.[k];
	}

	// If translation not found, return the key
	if (typeof translation !== 'string') {
		return key;
	}

	// Replace parameters in the translation
	if (params) {
		let result = translation;
		for (const [paramKey, paramValue] of Object.entries(params)) {
			result = result.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue);
		}
		return result;
	}

	return translation;
}

// Helper function for static translations (when we don't have executeFunctions context)
export function getTranslations(locale: string = 'en') {
	return locales[locale as keyof typeof locales] || locales.en;
}