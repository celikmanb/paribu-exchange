<template>
  <div class="p-6 h-full">
    <!-- No Market Selected State -->
    <div v-if="!marketStore.isMarketSelected" class="flex items-center justify-center h-full">
      <div class="text-center">
        <div class="text-gray-400 dark:text-gray-500 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">Piyasa Seçin</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">İşlem yapmak için sol taraftan bir piyasa seçin.</p>
        <button 
          @click="emit('open-markets')"
          class="lg:hidden bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Piyasaları Görüntüle
        </button>
      </div>
    </div>

    <!-- Trading Interface -->
    <div v-else>
      <!-- Buy/Sell Tabs -->
      <div class="flex bg-gray-100 dark:bg-[#21232a] rounded-[2rem] p-1 mb-6">
        <button 
          :class="[
            'flex-1 py-2 px-4 rounded-[2rem] text-sm font-medium transition-colors',
            activeTab === 'buy' 
              ? 'bg-white dark:bg-[#383940] text-gray-800 dark:text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 dark:text-white'
          ]"
          @click="activeTab = 'buy'"
        >
          Al
        </button>
        <button 
          :class="[
            'flex-1 py-2 px-4 rounded-[2rem] text-sm font-medium transition-colors',
            activeTab === 'sell' 
              ? 'bg-white dark:bg-[#383940] text-gray-800 dark:text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 dark:text-white'
          ]"
          @click="activeTab = 'sell'"
        >
          Sat
        </button>
      </div>

    <!-- Selected Market Header -->
    <div class="flex items-center mb-6 justify-center">
      <button type="button" class="flex items-center focus:outline-none lg:cursor-default" @click="emit('open-markets')">
        <div class="w-10 h-10 rounded-full flex items-center justify-center mr-3">
          <img :src="getCurrencyIconUrl(selectedMarketInfo.icon)" alt="Currency Icon" class="w-full h-full object-cover">
        </div>
        <div class="flex items-center">
          <div class="text-left">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white flex items-center">
              {{ selectedMarketInfo.currencyName }}
              <!-- caret icon only on mobile -->
              <svg class="ml-2 w-4 h-4 text-gray-500 lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </h3>
            <p class="text-sm text-gray-500 dark:text-white">{{ selectedMarketInfo.currentPrice }} {{ selectedMarketInfo.currencySymbol.toUpperCase() }}</p>
          </div>
        </div>
      </button>
    </div>

    <!-- Price Chart -->
    <div class="mb-6">
      <div class="h-32 bg-gray-50 dark:bg-[#181a21] rounded-lg p-4 relative overflow-hidden">
        <!-- Loading State -->
        <div v-if="tickerStore.isLoading" class="flex items-center justify-center h-full">
          <div class="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-sm">Veriler yükleniyor...</span>
          </div>
        </div>
        
        <!-- Error State -->
        <div v-else-if="tickerStore.error" class="flex items-center justify-center h-full">
          <div class="text-center">
            <div class="text-red-500 dark:text-red-400 mb-2">
              <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 class="text-sm font-medium text-gray-800 dark:text-white mb-1">Veri Yüklenemedi</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ tickerStore.error }}</p>
          </div>
        </div>
        
        <!-- No Data State -->
        <div v-else-if="!chartOptions || !chartSeries" class="flex items-center justify-center h-full">
          <div class="text-center">
            <div class="text-gray-400 dark:text-gray-500 mb-2">
              <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-sm font-medium text-gray-800 dark:text-white mb-1">Veri Bulunamadı</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">Bu piyasa için grafik verisi bulunmuyor.</p>
          </div>
        </div>
        
        <!-- Chart -->
        <apexchart
          v-else
          type="line"
          :options="chartOptions"
          :series="chartSeries"
          height="128"
          width="100%"
        />
      </div>
    </div>

    <!-- Current Value Input -->
    <div class="text-center mb-6">
      <div class="relative mb-2">
        <span v-if="activeTab === 'buy'" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-600 dark:text-white">
          {{ balanceSymbol }}
        </span>
        <span v-else class="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-600 dark:text-white">
          {{ selectedMarketInfo.currencySymbol.toUpperCase() }}
        </span>
        <input 
          v-model="inputValue"
          type="number"
          step="0.01"
          min="0"
          placeholder="0"
          :class="[
            'w-full text-4xl font-bold text-gray-800 dark:text-white text-center border-2 dark:bg-[#181a21] border-gray-200 dark:border-[#3b3c41] rounded-lg py-4 focus:border-blue-500 focus:outline-none transition-colors',
            activeTab === 'buy' ? 'pl-12 pr-4' : 'pl-4 pr-24'
          ]"
        />
      </div>
      <div class="flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors" @click="toggleInputMode">
        <span>≈{{ calculatedAmount }} {{ activeTab === 'buy' ? 
        (inputMode === 'fiat' ? selectedMarketInfo.currencySymbol.toUpperCase() : '₺') : 
        (inputMode === 'fiat' ? '₺' : selectedMarketInfo.currencySymbol.toUpperCase()) }}</span>
        
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
        </svg>
      </div>
    </div>

    <!-- Wallet Balance -->
    <div class="mb-6">
      <button class="w-full rounded-lg p-3 flex items-center justify-center transition-colors cursor-auto">
        
        <svg v-if="activeTab === 'buy'" class="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
        </svg> 
        <svg v-else class="mr-2 w-5 h-5 text-gray-600" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8332 9.16197V15.4372L13.9995 17.2072L13.7969 17.3334H9.86947L9.66683 17.2072L6.83317 15.4372V9.16197L9.87679 7.33335H13.7896L16.8332 9.16197ZM13.7896 14H9.87679L8.49984 13.1724V14.5127L10.3464 15.6667H13.32L15.1665 14.5127V13.1724L13.7896 14ZM8.49984 10.1044V11.2282L10.3398 12.3334H13.3265L15.1665 11.2282V10.1044L13.3265 9.00002H10.3398L8.49984 10.1044Z" fill="#1F2229" fill-opacity="0.6" style="fill:#1F2229;fill:color(display-p3 0.1216 0.1333 0.1608);fill-opacity:0.6;"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1665 2.48553V5.4966L9.76204 5.73912L7.12288 7.32522H3.21012L1.83317 6.49758V7.84605L3.67969 9.00002H5.1665V10.6667H3.2028L3.00016 10.5405L1.83317 9.81138V11.1737L3.68294 12.3415H5.1665V14.0082H3.20036L0.554688 12.3382L0.166504 12.0925V2.48553L3.21175 0.666687H7.12126L10.1665 2.48553ZM1.83317 3.43036V4.55341L3.67318 5.65855H6.65983L8.49984 4.55341V3.43036L6.66227 2.33335H3.67074L1.83317 3.43036Z" fill="#1F2229" fill-opacity="0.6" style="fill:#1F2229;fill:color(display-p3 0.1216 0.1333 0.1608);fill-opacity:0.6;"/>
        </svg>

        <span class="text-gray-800 font-medium dark:text-white">{{activeTab === 'buy' ? '₺6,500.00' : '0.014002'}}</span>
      </button>
    </div>

    <!-- Percentage Buttons -->
    <div class="flex space-x-2 mb-6">
      <button 
        v-for="percentage in percentages" 
        :key="percentage"
        class="flex-1 bg-gray-100 text-gray-800 dark:text-white dark:bg-[#181a21] dark:border 
        dark:border-solid dark:border-[#3b3c41] py-2 px-4 rounded-lg text-sm font-medium
         hover:bg-gray-200 dark:hover:bg-[#3b3c41] transition-colors"
        @click="selectPercentage(percentage)"
      >
        {{ percentage }}
      </button>
    </div>

      <!-- Action Button -->
      <button 
        :class="[
          'w-full py-4 rounded-lg text-white font-medium text-lg transition-colors',
          activeTab === 'buy' 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-red-500 hover:bg-red-600'
        ]"
        @click="executeTrade"
      >
        {{ activeTab === 'buy' ? `${selectedMarketInfo.currencySymbol.toUpperCase()} al` : `${selectedMarketInfo.currencySymbol.toUpperCase()} sat` }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useMarketStore } from '../../stores/market'
import { useConfigStore } from '../../stores/config'
import { useTicker } from '../../composables/useTicker'
import { useTickerStore } from '../../stores/ticker'
import { getChartOptions, getChartColors, createChartSeries } from '../../utils/chartOptions'

const marketStore = useMarketStore()
const configStore = useConfigStore()
const tickerStore = useTickerStore()
const { getTickerByPair } = useTicker()

const activeTab = ref<'buy' | 'sell'>('buy')
const percentages = ['%25', '%50', 'Tümü']
const chartOptions = ref<any>(null)
const chartSeries = ref<any>(null)
const inputValue = ref<string>('')
const inputMode = ref<'fiat' | 'crypto'>('fiat') // 'fiat' = TL, 'crypto' = BTC

// Emits
const emit = defineEmits<{
  (e: 'open-markets'): void
}>()

// Computed properties for selected market
const selectedMarketInfo = computed(() => {
  if (!marketStore.selectedPairInfo) {
    return {
      currencyName: 'Market',
      currentPrice: '--',
      currencySymbol: '',
      pair: null,
      icon: ''
    }
  }
  
  const { pair, market } = marketStore.selectedPairInfo
  const ticker = getTickerByPair(pair)
  const currency = configStore.currencies[market.pairs.market]
  
  return {
    currencyName: currency?.name || market.pairs.market.toUpperCase(),
    currentPrice: ticker ? ticker.last : '--',
    currencySymbol: currency?.symbol || '',
    pair: pair,
    icon: currency?.icon || ''
  }
})

const balanceSymbol = computed(() => {
  return inputMode.value === 'fiat' ? '₺' : selectedMarketInfo.value.currencySymbol.toUpperCase()
})

// Computed property for calculated amount
const calculatedAmount = computed(() => {
  if (!inputValue.value || !selectedMarketInfo.value.currentPrice) {
    return '0'
  }
  
  const input = parseFloat(inputValue.value)
  const currentPrice = parseFloat(selectedMarketInfo.value.currentPrice)
  
  if (isNaN(input) || isNaN(currentPrice) || currentPrice === 0) {
    return '0'
  }
  
  let amount: number
  if (inputMode.value === 'fiat') {
    // TL'den crypto'ya çevir
    amount = input / currentPrice
    return amount.toFixed(6)
  } else {
    // Crypto'dan TL'ye çevir
    amount = input * currentPrice
    return amount.toFixed(2)
  }
})

const toggleInputMode = () => {
  // Mevcut input değerini hesaplanan değerle değiştir
  if (inputValue.value && calculatedAmount.value !== '0') {
    inputValue.value = calculatedAmount.value
  }
  
  // Mode'u değiştir
  inputMode.value = inputMode.value === 'fiat' ? 'crypto' : 'fiat'
}

const makeLastPointAnnotation = (data: Array<{ time: string | number; value: number }>, fillColor: string) => {
  if (!data || data.length === 0) return [];
  const last = data[data.length - 1];
  if (!last) return [];
  
  // isteğe bağlı: son değerin bir önceki değere göre renk değişimi
  const prev = data.length > 1 ? data[data.length - 2]?.value : undefined;
  const up = prev === undefined ? true : last.value >= prev;

  return [
    {
      x: last.time,
      y: last.value,
      marker: {
        size: 6,
        fillColor,
        strokeColor: fillColor,
        strokeWidth: 1.5
      },
      label: {
        borderColor: 'transparent',
        offsetY: -10,
        textAnchor: 'middle',
        style: { color: '#fff', background: 'transparent', fontSize: '12px' },
      }
    }
  ];
}

// Chart güncelleme fonksiyonu
const updateChart = () => {
  if (!marketStore.selectedPairInfo) {
    chartOptions.value = null
    chartSeries.value = null
    return
  }
  
  const { pair } = marketStore.selectedPairInfo
  const tickerData = getTickerByPair(pair)
  const priceData = tickerStore.getPriceSeriesByPair(pair)
  
  if (priceData && priceData.length > 0) {
    // Chart renklerini ticker first fiyatına göre hesapla
    const colors = getChartColors(priceData, tickerData?.first)

    const points = makeLastPointAnnotation(priceData.map((point: any, index: number) => ({ 
      time: new Date().getTime() - (priceData.length - index - 1) * 60000,
      value: point
    })), colors[colors.length - 1] || '#10B981');
    /* chartRef.value.updateOptions({ annotations: { points } }, false, false); */
    
    // Chart options'ı güncelle
    chartOptions.value = {
      ...getChartOptions(),
      colors: colors,
      stroke: {
        ...getChartOptions().stroke,
        colors: colors
      },
      plotOptions: {
        line: {
          colors: {
            threshold: parseFloat(tickerData?.first || '0'),
            colorAboveThreshold: '#10B981',
            colorBelowThreshold: '#EF4444',
          },
        },
      },
      annotations: {
        yaxis: [
          {
            y: parseFloat(tickerData?.first || '0'),
            borderColor: '#9aa0a6',
            strokeDashArray: 6,
            label: {
              borderColor: '#9aa0a6',
              style: { color: '#9aa0a6', background: 'transparent', fontSize: '12px' },
            }
          }
        ],
        points: points || []
      },
    }
    
    // Chart series'i güncelle
    chartSeries.value = createChartSeries(priceData, pair)
  } else {
    // Varsayılan chart options
    chartOptions.value = getChartOptions()
    chartSeries.value = createChartSeries([], pair)
  }
}

// Seçili market değiştiğinde chart'ı güncelle
watch(() => marketStore.selectedPairInfo, updateChart, { immediate: true })

// Ticker verisi güncellendiğinde chart'ı güncelle
watch(() => tickerStore.priceSeries, updateChart)

onMounted(() => {
  // İlk yükleme
  updateChart()
})

const getCurrencyIconUrl = (icon: string) => {
  if (!icon) return ''
  const iconUrl = `https://cdn.paribu.com/coin/${icon}`
  return iconUrl
}

const selectPercentage = (percentage: string) => {
  const walletBalance = 6500
  const currentPrice = parseFloat(selectedMarketInfo.value.currentPrice)
  
  let calculatedValue = 0
  switch (percentage) {
    case '%25':
      calculatedValue = walletBalance * 0.25
      break
    case '%50':
      calculatedValue = walletBalance * 0.5
      break
    case 'Tümü':
      calculatedValue = walletBalance
      break
    default:
      calculatedValue = 0
  }
  
  if (inputMode.value === 'fiat') {
    // TL modunda, TL değerini direkt ver
    inputValue.value = calculatedValue.toFixed(2)
  } else {
    // Crypto modunda, TL'yi crypto'ya çevir
    if (currentPrice > 0) {
      const cryptoAmount = calculatedValue / currentPrice
      inputValue.value = cryptoAmount.toFixed(6)
    }
  }
}

const executeTrade = () => {
  if (!selectedMarketInfo.value.pair) {
    console.log('Please select a market pair first')
    return
  }
  console.log('Executing trade...')
}
</script>
