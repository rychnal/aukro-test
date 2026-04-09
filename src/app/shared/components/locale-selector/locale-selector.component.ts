import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { LanguageService } from '../../services/language.service';
import { CurrencyService } from '../../services/currency.service';
import { LANGUAGES } from '../../models/language.model';
import { CURRENCIES } from '../../models/currency.model';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-locale-selector',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatRadioModule, MatIconModule, MatDividerModule, TranslatePipe],
  templateUrl: './locale-selector.component.html',
  styleUrl: './locale-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocaleSelectorComponent {
  readonly languageService = inject(LanguageService);
  readonly currencyService = inject(CurrencyService);
  readonly languages = LANGUAGES;
  readonly currencies = CURRENCIES;

  readonly currentLocaleLabel = computed(() =>
    `${this.languageService.currentLanguage().toUpperCase()} / ${this.currencyService.current()}`
  );
}
