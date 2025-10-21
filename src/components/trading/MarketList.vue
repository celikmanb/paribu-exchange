<template>
  <div class="p-2 h-full overflow-y-scroll">
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4 px-4">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Piyasalar</h2>
        
        <!-- Dark/Light Mode Switch -->
        <button 
          @click="toggleTheme"
          class="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors bg-white dark:bg-[#181a21] dark:border-gray-600 dark:text-white dark:hover:border-gray-500"
        >
          <svg v-if="!isDark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <span class="text-sm font-medium">{{ isDark ? 'Dark' : 'Light' }}</span>
        </button>
      </div>
      
      <!-- Currency Tabs and Filter Icons -->
      <div class="flex items-center justify-between mb-4 px-4">
        <div class="flex items-center space-x-4">
          <button 
            v-for="group in featuredMarketGroups" 
            :key="group.key"
            :class="[
              'text-sm font-medium transition-colors relative',
              activeCurrency === group.value 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            ]"
            @click="activeCurrency = group.value"
          >
            {{ group.value }}
            <div 
              v-if="activeCurrency === group.value"
              class="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-400 dark:bg-green-500"
            ></div>
          </button>
        </div>

        <!-- Filter Icons -->
        <div class="flex space-x-2">
          <button 
            @click="filterMarketsGainers"
            :class="[
              'w-8 h-8 rounded-full border flex items-center justify-center transition-colors',
              currentSortMode === 'default' 
                ? 'border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 dark:border-gray-600 dark:text-gray-500 dark:hover:text-gray-300 dark:hover:border-gray-500'
                : currentSortMode === 'gainers'
                ? 'border-green-300 text-green-600 bg-green-50 dark:border-green-500 dark:text-green-400 dark:bg-green-900/20'
                : 'border-red-300 text-red-600 bg-red-50 dark:border-red-500 dark:text-red-400 dark:bg-red-900/20'
            ]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
            </svg>
          </button>
          <button 
            @click="filterMarketsHotPairs" 
            :class="[
              'w-8 h-8 rounded-full border flex items-center justify-center transition-colors',
              showHotPairs 
                ? 'border-orange-300 text-orange-600 bg-orange-50 dark:border-orange-500 dark:text-orange-400 dark:bg-orange-900/20' 
                : 'border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 dark:border-gray-600 dark:text-gray-500 dark:hover:text-gray-300 dark:hover:border-gray-500'
            ]"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <button 
            @click="filterMarketsFavorites" 
            :class="[
              'w-8 h-8 rounded-full border flex items-center justify-center transition-colors',
              showFavorites 
                ? 'border-yellow-300 text-yellow-600 bg-yellow-50 dark:border-yellow-500 dark:text-yellow-400 dark:bg-yellow-900/20' 
                : 'border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 dark:border-gray-600 dark:text-gray-500 dark:hover:text-gray-300 dark:hover:border-gray-500'
            ]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="configStore.isLoading" class="flex items-center justify-center py-12">
      <div class="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
        <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Veriler yükleniyor...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="configStore.error" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="text-red-500 dark:text-red-400 mb-2">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-1">Veri Yüklenemedi</h3>
        <p class="text-gray-500 dark:text-gray-400">{{ configStore.error }}</p>
      </div>
    </div>

    <!-- No Data State -->
    <div v-else-if="Object.keys(filteredMarkets).length === 0" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="text-gray-400 dark:text-gray-500 mb-2">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.647M12 15a7.962 7.962 0 01-5.824-2.647M12 15a7.962 7.962 0 005.824-2.647M12 15a7.962 7.962 0 00-5.824-2.647"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-1">Veri Bulunamadı</h3>
        <p class="text-gray-500 dark:text-gray-400">Bu kategoride henüz piyasa verisi bulunmuyor.</p>
      </div>
    </div>

    <!-- Market List -->
    <div v-else class="space-y-3">
      <div v-for="(market, marketKey) in filteredMarkets" :key="marketKey" 
      class="flex items-center justify-between py-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-4 cursor-pointer" @click="onSelect(marketKey.toString())">
        <div class="flex items-center">
          <div class="flex items-center">
            <div class="ml-0">
              <div class="flex items-center space-x-2">
                <div class="font-medium text-gray-800 dark:text-white">{{ getCurrencyName(market.pairs.market) }}</div>
                <!-- Badge icons - currency name'in sağında -->
                <div v-if="market.badges && market.badges.length > 0" class="flex space-x-1">
                  <div v-for="badge in market.badges" :key="badge.langkey" class="w-3 h-3">
                    <!-- Box badge -->
                    <svg v-if="badge.langkey === 'labels.box'" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.333336 2.66667H13.6667V12H0.333336V2.66667ZM1.66667 4V10.6667H12.3333V4H1.66667Z" fill="#1F2229"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.66667 8V6.66667H11V8H9.66667Z" fill="#1F2229"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3333 1.33333H1.66667V0H12.3333V1.33333Z" fill="#1F2229"/>
                    </svg>
                    <!-- New badge -->
                    <svg v-else-if="badge.langkey === 'labels.new'" width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.05598 1.30859C5.91809 2.45807 6.25829 2.81257 6.86458 3.72201L7.03906 3.98307L6.92252 4.27409C6.4239 5.52063 6.33995 5.72695 5.97851 6.61003C5.98308 6.61166 5.98879 6.61394 5.99544 6.61654C6.00158 6.61849 6.01129 6.62196 6.02539 6.6263C6.05916 6.63671 6.1114 6.65147 6.19075 6.67513C6.55745 6.29682 6.69261 6.15314 7.52213 5.26042L7.95898 4.79036L8.39648 5.26042C8.78738 5.68115 9.16775 6.32618 9.44921 6.97982C9.72886 7.62929 9.94726 8.37238 9.94726 9C9.94722 11.5627 7.78617 13.5964 5.17513 13.5964C2.56422 13.5962 0.40368 11.5626 0.403641 9C0.403641 7.66981 1.00439 6.19554 1.9733 5.24154L2.15039 5.06576C2.2505 4.96261 2.25753 4.93469 3.20312 3.91341C3.47446 3.23824 3.49312 3.18119 4.00846 1.49284L4.35156 0.369141L5.05598 1.30859ZM4.80924 2.94792C4.58029 3.68409 4.51175 3.85824 4.27018 4.45898L4.22916 4.5612L4.15429 4.64193C2.86587 6.03204 3.21775 5.69171 2.80989 6.09245L2.80924 6.0918C2.07244 6.81755 1.59635 7.9838 1.59635 9C1.59639 10.856 3.17429 12.4035 5.17513 12.4036C7.1761 12.4036 8.75451 10.8561 8.75455 9C8.75455 8.60651 8.60544 8.03623 8.35351 7.45117C8.21837 7.13736 8.06326 6.84441 7.9082 6.5957C7.37483 7.16881 7.27821 7.27037 6.79622 7.76628L6.54557 8.02409L6.20052 7.92253C5.90253 7.83494 5.75096 7.79005 5.67382 7.76628C5.63871 7.75545 5.60835 7.74591 5.58528 7.73763C5.582 7.73645 5.57763 7.73446 5.57226 7.73242C5.56433 7.73014 5.55443 7.72742 5.54231 7.72396C5.46768 7.70264 5.317 7.65957 5.01302 7.57357L4.37044 7.39193L4.62369 6.77409C5.17748 5.4223 5.21489 5.3275 5.69596 4.125C5.38973 3.68218 5.15946 3.39566 4.80924 2.94792ZM5.53385 7.7155L5.53776 7.7168C5.53436 7.71527 5.53086 7.71292 5.52669 7.71094C5.52998 7.71247 5.53207 7.71469 5.53385 7.7155ZM6.02799 7.71354C6.03497 7.71036 6.04283 7.70814 6.05013 7.70443C6.05187 7.70354 6.05419 7.70116 6.05794 7.69922C6.04719 7.70489 6.037 7.70941 6.02799 7.71354ZM5.1914 7.07031C5.19488 7.05124 5.20072 7.03218 5.20638 7.01237L5.20442 7.01172C5.19932 7.03048 5.19471 7.04995 5.1914 7.07031Z" fill="#DB4F58" style="fill:#DB4F58;fill:color(display-p3 0.8588 0.3098 0.3451);fill-opacity:1;"/>
                    </svg>

                    <!-- Other badges -->
                    <svg v-else-if="badge.severity === 'dark'" class="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg v-else-if="badge.severity === 'success'" class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{getPairVolume(marketKey.toString()) }} {{ getCurrencySymbol(market.pairs.market) }}</div>
            </div>
          </div>
        </div>
        <div class="text-right">
          <div class="font-medium text-gray-800 dark:text-white">{{ getLastPairPrice(marketKey.toString(), market.precisions.price) }}</div>
          <div class="text-xs font-medium" :style="{ color: getPairPercentageColor(marketKey.toString()) }">{{getPairPercentageStatus(marketKey.toString())}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useConfigStore } from '../../stores/config'
import { useMarketStore } from '../../stores/market'
import type { Market } from '../../types/config';
import { useTicker } from '../../composables/useTicker';
import { useTheme } from '../../composables/useTheme';
import { formatCurrency, formatAmount } from '../../utils/helpers';
const configStore = useConfigStore()
const marketStore = useMarketStore()
const activeCurrency = ref<string>('TL')
const { getTickerByPair, getPairPercentage } = useTicker();
const { isDark, toggleTheme } = useTheme();

// Sort state management
type SortMode = 'default' | 'gainers' | 'losers';
const currentSortMode = ref<SortMode>('default');

// Hot pairs filter state
const showHotPairs = ref<boolean>(false);

// Favorites filter state
const showFavorites = ref<boolean>(false);


// Featured market groups'ları al
const featuredMarketGroups = computed(() => {
  return configStore.marketGroupConstants.filter(group => {
    // API'den gelen market groups'da featured olanları bul
    const apiGroup = configStore.marketGroups.find(apiGroup => apiGroup.key === group.key)
    return apiGroup?.featured === true
  })
})

// Aktif currency'ye göre market'ları filtrele ve sırala
const filteredMarkets = computed(() => {
  // Aktif currency'ye karşılık gelen market group key'ini bul
  const activeGroup = featuredMarketGroups.value.find(group => group.value === activeCurrency.value)
  if (!activeGroup) return {}
  
  // Bu key'e sahip market'ları filtrele
  let filtered = Object.entries(configStore.markets).filter(([marketKey, market]) => {
    return market.labels.includes(activeGroup.key)
  })
  
  // Hot pairs filtresi uygulanıyorsa, sadece 'labels.new' badge'ine sahip coinleri göster
  if (showHotPairs.value) {
    filtered = filtered.filter(([marketKey, market]) => {
      return market.badges && market.badges.some(badge => badge.langkey === 'labels.new')
    })
  }
  
  // Favorites filtresi uygulanıyorsa, sadece 'labels.star' badge'ine sahip coinleri göster
  if (showFavorites.value) {
    filtered = filtered.filter(([marketKey, market]) => {
      return market.badges && market.badges.some(badge => badge.langkey === 'labels.star')
    })
  }
  
  // Sıralama moduna göre sırala
  let sorted = [...filtered];
  
  if (currentSortMode.value === 'gainers') {
    sorted.sort((a, b) => {
      const percentageA = parseFloat(getPairPercentage(a[0])) || 0;
      const percentageB = parseFloat(getPairPercentage(b[0])) || 0;
      return percentageB - percentageA; // En yüksekten en düşüğe
    });
  } else if (currentSortMode.value === 'losers') {
    sorted.sort((a, b) => {
      const percentageA = parseFloat(getPairPercentage(a[0])) || 0;
      const percentageB = parseFloat(getPairPercentage(b[0])) || 0;
      return percentageA - percentageB; // En düşükten en yükseğe (en çok kaybeden en başta)
    });
  }
  // 'default' modunda orijinal sıralama korunur
  
  // Object'e çevir
  return Object.fromEntries(sorted)
})

const filterMarketsGainers = () => {
  // Sıralama modlarını döngüsel olarak değiştir
  if (currentSortMode.value === 'default') {
    currentSortMode.value = 'gainers';
  } else if (currentSortMode.value === 'gainers') {
    currentSortMode.value = 'losers';
  } else {
    currentSortMode.value = 'default';
  }
}

// Currency name'ini al
const getCurrencyName = (symbol: string) => {
  const currency = configStore.currencies[symbol]
  return currency ? currency.name : symbol.toUpperCase()
}

const getCurrencySymbol = (symbol: string) => {
  const currency = configStore.currencies[symbol]
  return currency ? currency.symbol?.toUpperCase() : ''
}

const getLastPairPrice = (pair: string, precision: number) => {
  const ticker = getTickerByPair(pair)
  return ticker ? formatCurrency(ticker.last, precision) : '--'
}

const getPairPercentageStatus = (pair: string) => {
  const percentage = getPairPercentage(pair)
  // Eğer değer "-" ile başlıyorsa onu kaldır
  const cleanPercentage = percentage.toString().startsWith('-') 
    ? percentage.toString().substring(1) 
    : percentage.toString()
  return `%${cleanPercentage}`
}

const getPairPercentageColor = (pair: string) => {
  const percentage = parseFloat(getPairPercentage(pair))
  if (percentage > 0) return '#7B9530' // Green for positive
  if (percentage < 0) return '#DB4F58' // Red for negative
  return '#6B7280' // Gray for zero
}

const getPairVolume = (pair: string) => {
  const ticker = getTickerByPair(pair)
  if (!ticker) return '--'
  
  const volume = parseFloat(ticker.volume)
  
  if (volume >= 1e9) {
    return `${(volume / 1e9).toFixed(1)}B`
  } else if (volume >= 1e6) {
    return `${(volume / 1e6).toFixed(1)}M`
  } else if (volume >= 1e3) {
    return `${(volume / 1e3).toFixed(1)}K`
  } else {
    return volume.toFixed(1)
  }
}

const filterMarketsHotPairs = () => {
  showHotPairs.value = !showHotPairs.value;
}

const filterMarketsFavorites = () => {
  showFavorites.value = !showFavorites.value;
}

const selectMarketPair = (marketKey: string) => {
  const marketData = configStore.markets[marketKey]
  if (marketData) {
    marketStore.selectMarketPair(marketKey, marketData)
  }
}

// Emits selected event for mobile overlay to close
const emit = defineEmits<{
  (e: 'selected'): void
}>()

const onSelect = (marketKey: string) => {
  selectMarketPair(marketKey)
  emit('selected')
}

// İlk featured group'u default olarak seç
onMounted(() => {
  if (featuredMarketGroups.value.length > 0 && featuredMarketGroups.value[0]) {
    activeCurrency.value = featuredMarketGroups.value[0].value
  }
})
</script>
