import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuctionItem } from '../../models/auction.model';

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopListComponent {
  auctions: AuctionItem[] = [
    { id: 1, title: 'První aukce', endsAt: '10. 4. 2026' },
    { id: 2, title: 'Druhá aukce', endsAt: '12. 4. 2026' },
  ];
}
