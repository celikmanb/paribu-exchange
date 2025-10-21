# Paribu Exchange

Modern bir kripto para borsası arayüzü uygulaması. Vue 3, TypeScript ve Tailwind CSS kullanılarak geliştirilmiştir.

## Uygulama Nasıl Çalışır?

Bu uygulama, kripto para piyasalarını görüntülemek ve işlem yapmak için tasarlanmış bir arayüzdür. İşleyişi şu şekildedir:

### 🏗️ Mimari
- **Vue 3 Composition API** ile modern reaktif bileşenler
- **Pinia** ile merkezi state yönetimi
- **TypeScript** ile tip güvenliği
- **Tailwind CSS** ile responsive tasarım
- **ApexCharts** ile interaktif grafikler

### 📊 Veri Akışı
1. **Config Store**: Piyasa yapılandırması, para birimleri ve piyasa gruplarını yönetir
2. **Market Store**: Seçili piyasa çiftini ve ilgili verileri takip eder
3. **Ticker Store**: Fiyat verilerini ve grafik serilerini yönetir

### 🎯 Ana Özellikler
- **Piyasa Listesi**: Kripto para çiftlerini kategorilere göre filtreleme
- **Trading Panel**: Alım/satım işlemleri için arayüz
- **24 Saatlik Grafikler**: Fiyat hareketlerini görselleştirme
- **Dark/Light Mode**: Tema değiştirme özelliği
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu

### 🔄 Veri Kaynakları
- Mock API'lerden piyasa yapılandırması ve ticker verileri
- Paribu CDN'den kripto para ikonları

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
