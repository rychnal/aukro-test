export type Currency = 'CZK' | 'EUR' | 'GBP';

export const CURRENCIES: { value: Currency; label: string }[] = [
  { value: 'CZK', label: 'Česká koruna (CZK)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'GBP', label: 'Britská libra (GBP)' },
];

// Kurzy k 31.12.2024 — základ CZK
export const EXCHANGE_RATES: Record<Currency, number> = {
  CZK: 1,
  EUR: 0.03984,  // 1 CZK = 0.03984 EUR  (1 EUR = 25.10 CZK)
  GBP: 0.03316,  // 1 CZK = 0.03316 GBP  (1 GBP = 30.16 CZK)
};
