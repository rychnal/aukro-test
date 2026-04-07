import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { PricePipe } from '../../pipes/price.pipe';
import { OffersService } from '../../services/offers.service';
import { BasketService } from '../../services/basket.service';
import { Offer } from '../../models/offer.model';

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

  readonly offersResource = rxResource({
    stream: () => this.offersService.getOffers(),
  });

  private readonly quantities = signal<Record<number, number>>({});
  readonly addedIds = signal<Set<number>>(new Set());

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
    setTimeout(() => {
      this.addedIds.update((ids) => {
        const next = new Set(ids);
        next.delete(offer.id);
        return next;
      });
    }, 1000);
  }
}
