import { Injectable, signal, computed } from '@angular/core';
import { Language } from '../models/language.model';
import { TranslationKey, TRANSLATIONS } from '../i18n/translations';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly currentLanguage = signal<Language>('cs');

  readonly translate = computed(() => {
    const lang = this.currentLanguage();
    return (key: TranslationKey): string => TRANSLATIONS[lang][key];
  });

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
  }
}
