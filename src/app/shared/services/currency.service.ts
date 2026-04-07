import { Injectable, signal } from '@angular/core';
import { Currency, EXCHANGE_RATES } from '../models/currency.model';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  readonly current = signal<Currency>('CZK');

  setCurrency(currency: Currency): void {
    this.current.set(currency);
  }

  convert(amountCzk: number, to: Currency): number {
    return amountCzk * EXCHANGE_RATES[to];
  }
}
