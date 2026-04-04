import { Pipe, PipeTransform, inject } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

const CURRENCY_SYMBOLS: Record<string, string> = {
  CZK: 'Kč',
  EUR: '€',
  GBP: '£',
};

@Pipe({
  name: 'price',
  standalone: true,
  pure: false,
})
export class PricePipe implements PipeTransform {
  private readonly currencyService = inject(CurrencyService);

  transform(amountCzk: number): string {
    const currency = this.currencyService.current();
    const converted = this.currencyService.convert(amountCzk, currency);
    const symbol = CURRENCY_SYMBOLS[currency];

    const formatted = new Intl.NumberFormat('cs-CZ', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(converted);

    return currency === 'CZK' ? `${formatted} ${symbol}` : `${symbol} ${formatted}`;
  }
}
