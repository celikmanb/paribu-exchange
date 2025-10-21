import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ConfigResponse, Currency, Market, MarketGroup } from '@/types/config';
import { MARKET_GROUPS } from '@/constants/marketGroups';

export const useConfigStore = defineStore('config', () => {
  const markets = ref<Record<string, Market>>({});
  const currencies = ref<Record<string, Currency>>({});
  const marketGroups = ref<MarketGroup[]>([]);
  
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const featuredMarkets = computed(() => 
    marketGroups.value.filter(group => group.featured)
  );

  const marketGroupConstants = computed(() => MARKET_GROUPS);

  // Actions
  const getMarketConfig = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch('https://68e379dd8e14f4523dad88b6.mockapi.io/api/v1/config');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ConfigResponse[] = await response.json();
      
      if (data && data.length > 0) {
        const firstItem = data[0];
        if (firstItem && firstItem.payload) {
          const payload = firstItem.payload;
          
          markets.value = payload.markets || {};
          currencies.value = payload.currencies || {};
          marketGroups.value = payload.app_settings?.market_groups || [];
        }
      } else {
        throw new Error('No data received from API');
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Error fetching config:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const clearConfig = () => {
    markets.value = {};
    currencies.value = {};
    marketGroups.value = [];
    error.value = null;
  };

  return {
    // State
    markets,
    currencies,
    marketGroups,
    isLoading,
    error,
    // Getters
    featuredMarkets,
    marketGroupConstants,
    // Actions
    getMarketConfig,
    clearConfig
  };
});
