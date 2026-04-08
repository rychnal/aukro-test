import { ChangeDetectionStrategy, Component, DestroyRef, inject, resource, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Offer } from '../../shared/models/offer.model';
import { PricePipe } from '../../shared/pipes/price.pipe';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { BasketService } from '../../shared/services/basket.service';
import { OffersService } from '../../shared/services/offers.service';

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, TranslatePipe, PricePipe],
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopListComponent {
  private readonly offersService = inject(OffersService);
  private readonly basketService = inject(BasketService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly timeouts = new Set<ReturnType<typeof setTimeout>>();

  readonly offersResource = resource({
    loader: () => this.offersService.getOffers(),
  });

  private readonly quantities = signal<Record<number, number>>({});
  readonly addedIds = signal<Set<number>>(new Set());

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.timeouts.forEach((t) => clearTimeout(t));
    });
  }

  getQuantity(offerId: number): number {
    return this.quantities()[offerId] ?? 1;
  }

  increment(offerId: number): void {
    this.quantities.update((q) => ({ ...q, [offerId]: this.getQuantity(offerId) + 1 }));
  }

  decrement(offerId: number): void {
    const current = this.getQuantity(offerId);
    if (current <= 1) return;
    this.quantities.update((q) => ({ ...q, [offerId]: current - 1 }));
  }

  setQuantity(offerId: number, value: string): void {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 1) {
      this.quantities.update((q) => ({ ...q, [offerId]: parsed }));
    }
  }

  addToBasket(offer: Offer): void {
    this.basketService.add(offer, this.getQuantity(offer.id));
    this.quantities.update((q) => ({ ...q, [offer.id]: 1 }));
    this.addedIds.update((ids) => new Set(ids).add(offer.id));
    const t = setTimeout(() => {
      this.addedIds.update((ids) => {
        const next = new Set(ids);
        next.delete(offer.id);
        return next;
      });
      this.timeouts.delete(t);
    }, 1000);
    this.timeouts.add(t);
  }
}
