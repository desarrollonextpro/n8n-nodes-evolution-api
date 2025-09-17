import { INodeProperties } from 'n8n-workflow';

export const localeSelector: INodeProperties = {
	displayName: 'Language / Idioma',
	name: 'locale',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'English',
			value: 'en',
		},
		{
			name: 'Português',
			value: 'pt',
		},
	],
	default: 'en',
	description: 'Select the language for the interface / Selecione o idioma da interface',
};