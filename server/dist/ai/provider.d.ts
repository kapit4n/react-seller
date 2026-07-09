import { type AIProvider, type AIProviderConfig } from './types';
export type ProviderType = 'openai' | 'mock';
export declare function createProvider(type: ProviderType, config: AIProviderConfig): AIProvider;
export declare function getProviderConfig(): {
    type: ProviderType;
    config: AIProviderConfig;
};
