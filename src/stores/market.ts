import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Market } from '@/types/config';

export const useMarketStore = defineStore('market', () => {
  // State
  const selectedMarketPair = ref<string | null>(null);
  const selectedMarketData = ref<Market | null>(null);

  // Getters
  const isMarketSelected = computed(() => selectedMarketPair.value !== null);
  
  const selectedPairInfo = computed(() => {
    if (!selectedMarketPair.value || !selectedMarketData.value) {
      return null;
    }
    
    return {
      pair: selectedMarketPair.value,
      market: selectedMarketData.value
    };
  });

  // Actions
  const selectMarketPair = (pair: string, marketData: Market) => {
    selectedMarketPair.value = pair;
    selectedMarketData.value = marketData;
  };

  return {
    // State
    selectedMarketPair,
    selectedMarketData,
    // Getters
    isMarketSelected,
    selectedPairInfo,
    // Actions
    selectMarketPair,
  };
});
