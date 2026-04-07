import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LanguageService } from './services/language.service';
import { CurrencyService } from './services/currency.service';
import { Language, LANGUAGES } from './models/language.model';
import { Currency, CURRENCIES } from './models/currency.model';
import { MatBadgeModule } from '@angular/material/badge';
import { TranslatePipe } from './pipes/translate.pipe';
import { BasketService } from './services/basket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatBadgeModule,
    TranslatePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly languageService = inject(LanguageService);
  readonly basketService = inject(BasketService);
  readonly currencyService = inject(CurrencyService);
  readonly languages = LANGUAGES;
  readonly currencies = CURRENCIES;

  setLanguage(lang: Language): void {
    this.languageService.setLanguage(lang);
  }

  setCurrency(currency: Currency): void {
    this.currencyService.setCurrency(currency);
  }
}
