import { Injectable, computed, effect, signal } from '@angular/core';
import { Offer } from '../models/offer.model';

export interface BasketItem {
  offer: Offer;
  quantity: number;
}

const STORAGE_KEY = 'aukro-basket';

@Injectable({ providedIn: 'root' })
export class BasketService {
  private readonly items = signal<BasketItem[]>(
    JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  );

  readonly basketItems = this.items.asReadonly();

  readonly totalCount = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this.items().reduce((sum, item) => sum + item.offer.buyNowPrice.amount * item.quantity, 0)
  );

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items()));
    });
  }

  add(offer: Offer, quantity: number): void {
    this.items.update((items) => {
      const existing = items.find((i) => i.offer.id === offer.id);
      if (existing) {
        return items.map((i) =>
          i.offer.id === offer.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...items, { offer, quantity }];
    });
  }

  remove(offerId: number): void {
    this.items.update((items) => items.filter((i) => i.offer.id !== offerId));
  }

  clear(): void {
    this.items.set([]);
  }
}
