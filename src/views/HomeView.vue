<template>
  <AppLayout>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="mx-auto px-4 sm:px-12 py-6 sm:py-12">
        <div class="bg-white dark:bg-[#181a21] rounded-xl shadow-sm overflow-hidden h-[calc(100vh-3rem)] sm:h-[calc(100vh-4rem)]">
          <div class="flex flex-col lg:flex-row h-full">
            <!-- Left Column - Market List (2/3 width) - hidden on mobile -->
            <div class="hidden lg:block flex-1 lg:flex-[2] h-full">
              <MarketList @selected="onMarketSelected" />
            </div>
            <template v-if="marketStore.isMarketSelected">
              <div class="hidden lg:block w-px bg-gray-200 dark:bg-gray-700"></div>
              <!-- Right Column - Trading Panel (1/3 width) -->
              <div class="flex-1 lg:flex-[1] h-full">
                <TradingPanel @open-markets="openMobileMarkets = true" />
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Mobile full-screen markets overlay -->
      <div v-if="openMobileMarkets" class="fixed inset-0 z-50 lg:hidden">
        <div class="absolute inset-0 bg-black/40" @click="openMobileMarkets = false"></div>
        <div class="absolute inset-y-0 right-0 left-0 bg-white dark:bg-[#181a21]">
          <div class="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Piyasalar</h2>
            <button class="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-[#181a21] border border-gray-200 dark:border-gray-700" @click="openMobileMarkets = false">
              <svg class="w-5 h-5 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="h-[calc(100vh-64px)] overflow-y-auto">
            <MarketList @selected="onMobileMarketSelected" />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, defineAsyncComponent } from 'vue';
import AppLayout from '../components/layout/AppLayout.vue';
const MarketList = defineAsyncComponent(() => import('../components/trading/MarketList.vue'));
const TradingPanel = defineAsyncComponent(() => import('../components/trading/TradingPanel.vue'));
import { useConfig } from '../composables/useConfig';
import { useTicker } from '../composables/useTicker';
import { useMarketStore } from '../stores/market';

const { getMarketConfig } = useConfig();
const { fetchTickerData } = useTicker();
const marketStore = useMarketStore();
const openMobileMarkets = ref(false);

const onMarketSelected = () => {
  // desktop list selection already handled by store
};

const onMobileMarketSelected = () => {
  openMobileMarkets.value = false;
};
onMounted(async () => {
  await getMarketConfig();
  await fetchTickerData();
});
</script>
