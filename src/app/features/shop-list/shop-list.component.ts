import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { PricePipe } from '../../pipes/price.pipe';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatProgressSpinnerModule, TranslatePipe, PricePipe],
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopListComponent {
  private readonly offersService = inject(OffersService);

  readonly offersResource = rxResource({
    stream: () => this.offersService.getOffers(),
  });
}
