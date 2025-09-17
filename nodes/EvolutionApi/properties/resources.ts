import { INodeProperties } from 'n8n-workflow';
import { getTranslations } from '../utils/i18n';

// Get translations for default locale (English)
const translations = getTranslations('en');

export const resources: INodeProperties = {
	displayName: translations.evolutionApi.resource.displayName,
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: translations.evolutionApi.resource.instances,
			value: 'instances-api',
		},
		{
			name: translations.evolutionApi.resource.messages,
			value: 'messages-api',
		},
		{
			name: translations.evolutionApi.resource.chat,
			value: 'chat-api',
		},
		{
			name: translations.evolutionApi.resource.groups,
			value: 'groups-api',
		},
		{
			name: translations.evolutionApi.resource.profile,
			value: 'profile-api',
		},
		{
			name: translations.evolutionApi.resource.events,
			value: 'events-api',
		},
		{
			name: translations.evolutionApi.resource.integrations,
			value: 'integrations-api',
		},
	],
	default: 'instances-api',
};
