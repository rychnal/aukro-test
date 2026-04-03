import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuctionItem } from '../../models/auction.model';

@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.scss'
})
export class AuctionListComponent {
  auctions = input<AuctionItem[]>([]);
}
