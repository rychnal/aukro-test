import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocaleSelectorComponent } from './locale-selector.component';
import { LanguageService } from '../../services/language.service';
import { CurrencyService } from '../../services/currency.service';

describe('LocaleSelectorComponent', () => {
  let fixture: ComponentFixture<LocaleSelectorComponent>;
  let languageService: LanguageService;
  let currencyService: CurrencyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocaleSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocaleSelectorComponent);
    languageService = TestBed.inject(LanguageService);
    currencyService = TestBed.inject(CurrencyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display current locale label', () => {
    languageService.setLanguage('en');
    currencyService.setCurrency('EUR');
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('.locale-btn__label');
    expect(btn.textContent.trim()).toBe('EN / EUR');
  });

  it('should update label when language changes', () => {
    languageService.setLanguage('sk');
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('.locale-btn__label');
    expect(btn.textContent.trim()).toContain('SK');
  });

  it('should update label when currency changes', () => {
    currencyService.setCurrency('GBP');
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('.locale-btn__label');
    expect(btn.textContent.trim()).toContain('GBP');
  });
});
