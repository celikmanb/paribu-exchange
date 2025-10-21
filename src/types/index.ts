// Global type definitions
export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

// Ticker interfaces
export interface TickerData {
  id: string;
  interval: string;
  lowest: string;
  highest: string;
  first: string;
  last: string;
  volume: string;
  pair_volume: string;
  change: string;
  percentage: string;
}

export interface TickerApiResponse {
  ticker: Record<string, TickerData>;
  priceSeries: Record<string, number[]>;
}
