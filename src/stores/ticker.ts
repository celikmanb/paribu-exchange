import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TickerData, TickerApiResponse } from '@/types';

export const useTickerStore = defineStore('ticker', () => {
  // State
  const tickerData = ref<Record<string, TickerData>>({});
  const priceSeries = ref<Record<string, number[]>>({});
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const getPairPercentage = (pair: string) => {
    return tickerData.value[pair]?.percentage || "--";
  };

  // Actions
  const fetchTickerData = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch('https://68e379dd8e14f4523dad88b6.mockapi.io/api/v1/ticker');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: TickerApiResponse[] = await response.json();
      
      if (data && data.length > 0) {
        const firstItem = data[0];
        if (firstItem && firstItem.ticker && firstItem.priceSeries) {
          tickerData.value = firstItem.ticker;
          priceSeries.value = firstItem.priceSeries;
        } else {
          throw new Error('Invalid ticker data structure');
        }
      } else {
        throw new Error('No ticker data received from API');
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Error fetching ticker data:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const getTickerByPair = (pair: string) => {
    return tickerData.value[pair] || null;
  };

  const getPriceSeriesByPair = (pair: string) => {
    return priceSeries.value[pair] || [];
  };

  return {
    // State
    tickerData,
    priceSeries,
    isLoading,
    error,
    // Actions
    fetchTickerData,
    getTickerByPair,
    getPriceSeriesByPair,
    getPairPercentage
  };
});
