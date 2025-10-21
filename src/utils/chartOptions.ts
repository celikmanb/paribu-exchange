// ApexCharts yapılandırması için utility fonksiyonları
export interface ChartDataPoint {
  x: number;
  y: number;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
}

// Chart options yapılandırması
export const getChartOptions = (isDarkMode: boolean = false) => ({
  chart: {
    type: 'line',
    height: 128,
    width: '100%',
    background: 'transparent',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    }
  },
  stroke: {
    curve: 'straight',
    width: 2,
    lineCap: 'round'
  },
  grid: {
    show: false
  },
  xaxis: {
    type: 'datetime',
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    labels: {
      show: false
    }
  },
  tooltip: {
    enabled: false
  },
  legend: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 0,
    hover: {
      size: 4,
      sizeOffset: 2
    }
  },
  colors: ['#10B981'], // Varsayılan renk
  theme: {
    mode: isDarkMode ? 'dark' : 'light'
  }
});

// Chart için dinamik renk hesaplama - ticker first fiyatına göre (zones kullanımı için)
export const getChartColors = (priceData: number[], tickerFirstPrice?: string): string[] => {
  if (priceData.length === 0) return ['#10B981'];
  
  // Ticker'dan first fiyatını al, yoksa priceData'nın ilk elemanını kullan
  const firstPrice = tickerFirstPrice ? parseFloat(tickerFirstPrice) : priceData[0];
  const lastPrice = priceData[priceData.length - 1];
  
  // Güvenli karşılaştırma
  if (firstPrice === undefined || lastPrice === undefined) return ['#10B981'];
  
  // Son fiyat first fiyattan yüksekse yeşil, düşükse kırmızı
  return lastPrice >= firstPrice ? ['#10B981'] : ['#EF4444'];
};

// Series verisi oluşturma
export const createChartSeries = (priceData: number[], pair: string): ChartSeries[] => {
  const now = new Date().getTime();
  const interval = 60000; // 1 dakika aralıklarla
  
  return [{
    name: pair.toUpperCase(),
    data: priceData.map((price, index) => ({
      x: now - (priceData.length - index - 1) * interval,
      y: price
    }))
  }];
};
