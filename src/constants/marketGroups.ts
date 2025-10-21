export interface MarketGroupConstant {
  value: string;
  key: string;
}

export const MARKET_GROUPS: MarketGroupConstant[] = [
  {
    value: "TL",
    key: "crypto_tl"
  },
  {
    value: "USDT", 
    key: "crypto_usdt"
  },
  {
    value: "FAN",
    key: "fantoken_chz"
  },
  {
    value: "BOX",
    key: "box_tl"
  }
];
