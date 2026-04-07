import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { PricePipe } from '../../shared/pipes/price.pipe';
import { BasketService } from '../../shared/services/basket.service';
import { LanguageService } from '../../shared/services/language.service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, TranslatePipe, PricePipe],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent {
  readonly basketService = inject(BasketService);
  private readonly languageService = inject(LanguageService);

  checkout(): void {
    const message = this.languageService.translate()('orderPaid');
    alert(message);
    this.basketService.clear();
  }
}
