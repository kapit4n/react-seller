import {type AIProvider, type AIProviderConfig} from './types';
import {OpenAIProvider} from './providers/openai';
import {MockProvider} from './providers/mock';

export type ProviderType = 'openai' | 'mock';

export function createProvider(
  type: ProviderType,
  config: AIProviderConfig,
): AIProvider {
  switch (type) {
    case 'openai':
      return new OpenAIProvider(config);
    case 'mock':
      return new MockProvider();
    default:
      throw new Error(`Unknown provider type: ${type}`);
  }
}

export function getProviderConfig(): {type: ProviderType; config: AIProviderConfig} {
  const type = (process.env.AI_PROVIDER || 'mock') as ProviderType;
  const config: AIProviderConfig = {
    apiKey: process.env.AI_API_KEY || '',
    model: process.env.AI_MODEL || 'gpt-4o',
    baseUrl: process.env.AI_BASE_URL || 'https://api.openai.com/v1',
  };

  return {type, config};
}
