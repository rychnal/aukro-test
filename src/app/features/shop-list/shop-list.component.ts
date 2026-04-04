import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product.model';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, TranslatePipe, PricePipe],
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopListComponent {
  readonly products: Product[] = [
    { id: 1, name: 'Banán', pricePerUnit: 29.90, unit: 'kg' },
    { id: 2, name: 'Čokoláda', pricePerUnit: 49.90, unit: 'ks' },
    { id: 3, name: 'Cibule', pricePerUnit: 15.90, unit: 'kg' },
  ];
}
