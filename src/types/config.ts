export interface Currency {
  color: string;
  icon: string;
  labels: string[];
  name: string;
  networks: string[];
  precision: number;
  step: string;
  symbol: string;
  type: string;
}

export interface MarketGroup {
  featured?: boolean;
  key: string;
  value: string;
}

export interface Badge {
  langkey: string;
  severity: string;
}

export interface Market {
  badges?: Badge[];
  labels: string[];
  pairs: {
    market: string;
    payment: string;
  };
  precisions: {
    amount: number;
    price: number;
  };
  steps: {
    amount: string;
    price: string;
  };
}

export interface AppSettings {
  market_groups: MarketGroup[];
}

export interface ConfigPayload {
  app_settings: AppSettings;
  currencies: Record<string, Currency>;
  markets: Record<string, Market>;
}

export interface ConfigResponse {
  payload: ConfigPayload;
}
