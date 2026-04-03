import { Component, signal } from '@angular/core';
import { AuctionItem } from './models/auction.model';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuctionListComponent } from './components/auction-list/auction-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AuctionListComponent, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = signal('Aukro Test');

  auctions = signal<AuctionItem[]>([
    { id: 1, title: 'První aukce', endsAt: '10. 4. 2026' },
    { id: 2, title: 'Druhá aukce', endsAt: '12. 4. 2026' }
  ]);
}
