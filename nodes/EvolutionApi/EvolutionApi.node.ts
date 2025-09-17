import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from 'n8n-workflow';
import { evolutionNodeProperties } from './properties';
import { resourceOperationsFunctions } from './execute';
import { getTranslations, t } from './utils/i18n';

export class EvolutionApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: getTranslations('en').evolutionApi.displayName,
		name: 'evolutionApi',
		icon: 'file:evolutionapi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: getTranslations('en').evolutionApi.description,
		defaults: {
			name: getTranslations('en').evolutionApi.defaultName,
		},
		// @ts-ignore
		inputs: ['main'],
		// @ts-ignore
		outputs: ['main'],
		credentials: [
			{
				name: 'evolutionApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://doc.evolution-api.com/api-reference',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		// A estrutura de propriedades do nó:
		// • Resources: Recursos disponíveis (Instancia, Mensagens, Eventos, Integrações)
		// • Operations: Operações de cada recurso (Ex: Criar instancia, Enviar mensagem, Definir Webhook)
		// • Fields: Campos de cada operação
		properties: evolutionNodeProperties,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Busca a função para o recurso e operação selecionados
		const fn = resourceOperationsFunctions[resource][operation];

		// Se não encontrar a função, retorna um erro
		if (!fn) {
			throw new NodeApiError(this.getNode(), {
				message: t(this, 'evolutionApi.errors.operationNotSupported'),
				description: t(this, 'evolutionApi.errors.functionNotSupported', {
					operation,
					resource,
				}),
			});
		}

		// Executa a função
		const responseData = await fn(this);

		// Retornar apenas o JSON
		return [this.helpers.returnJsonArray(responseData)];
	}
}
