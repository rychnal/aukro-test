import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavMenuComponent } from './nav-menu.component';
import { BasketService } from '../../services/basket.service';

describe('NavMenuComponent', () => {
  let fixture: ComponentFixture<NavMenuComponent>;
  let basketService: BasketService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [NavMenuComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavMenuComponent);
    basketService = TestBed.inject(BasketService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should not show badge when basket is empty', () => {
    const badgeHost = fixture.nativeElement.querySelector('.mat-badge');
    expect(badgeHost?.classList).toContain('mat-badge-hidden');
  });

  it('should show correct badge count', () => {
    const offer = {
      id: 1,
      name: 'Test',
      buyNowPrice: { amount: 100, currency: 'CZK' },
      endingTime: '',
      status: 'ACTIVE',
      seoUrl: '',
      images: { lists: { medium: [], medium_preview: [] } },
    } as any;

    basketService.add(offer, 3);
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.mat-badge-content');
    expect(badge?.textContent?.trim()).toBe('3');
  });
});
