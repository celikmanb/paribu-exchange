import { useConfigStore } from '@/stores/config';

export function useConfig() {
  const configStore = useConfigStore();

  const getMarketConfig = async () => {
    try {
      await configStore.getMarketConfig();
    } catch (error) {
      console.error('Failed to fetch market config:', error);
      throw error;
    }
  };

  return {
    configStore,
    getMarketConfig
  };
}
