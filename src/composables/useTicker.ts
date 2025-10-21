import { useTickerStore } from '@/stores/ticker';
import { computed } from 'vue';

export function useTicker() {
  const tickerStore = useTickerStore();

  const fetchTickerData = async () => {
    try {
      await tickerStore.fetchTickerData();
    } catch (error) {
      console.error('Failed to fetch ticker data:', error);
      throw error;
    }
  };

  const isLoading = computed(() => tickerStore.isLoading);
  const error = computed(() => tickerStore.error);

  return {
    tickerStore,
    
    // State
    isLoading,
    error,
    
    // Actions
    fetchTickerData,
    
    // Store methods
    getTickerByPair: tickerStore.getTickerByPair,
    getPriceSeriesByPair: tickerStore.getPriceSeriesByPair,
    getPairPercentage: tickerStore.getPairPercentage
  };
}
