import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketComponent } from './basket.component';
import { BasketService } from '../../shared/services/basket.service';
import { Offer } from '../../shared/models/offer.model';

const mockOffer = (id: number, name: string, amount: number): Offer => ({
  id,
  name,
  buyNowPrice: { amount, currency: 'CZK' },
  endingTime: '',
  status: 'ACTIVE',
  seoUrl: '',
  images: { lists: { medium: [{ position: 0, titleImage: true, url: 'img.jpg' }], medium_preview: [] } },
});

describe('BasketComponent', () => {
  let fixture: ComponentFixture<BasketComponent>;
  let basketService: BasketService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [BasketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketComponent);
    basketService = TestBed.inject(BasketService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show empty basket message when no items', () => {
    const el = fixture.nativeElement.querySelector('.text-gray-500');
    expect(el).toBeTruthy();
  });

  it('should render items added to basket', () => {
    basketService.add(mockOffer(1, 'Produkt A', 499), 1);
    basketService.add(mockOffer(2, 'Produkt B', 999), 2);
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('mat-card-content.basket__item');
    expect(cards.length).toBe(2);
  });

  it('should display item name', () => {
    basketService.add(mockOffer(1, 'Testovaci produkt', 100), 1);
    fixture.detectChanges();

    const name = fixture.nativeElement.querySelector('.basket__name');
    expect(name.textContent).toContain('Testovaci produkt');
  });

  it('should display item quantity', () => {
    basketService.add(mockOffer(1, 'Produkt', 100), 3);
    fixture.detectChanges();

    const qty = fixture.nativeElement.querySelector('.basket__quantity');
    expect(qty.textContent).toContain('3');
  });

  it('should remove item when remove button clicked', () => {
    basketService.add(mockOffer(1, 'Produkt', 100), 1);
    fixture.detectChanges();

    const removeBtn = fixture.nativeElement.querySelector('button[color="warn"]');
    removeBtn.click();
    fixture.detectChanges();

    expect(basketService.basketItems().length).toBe(0);
  });

  it('should call checkout and clear basket', () => {
    jest.spyOn(window, 'alert').mockImplementation(jest.fn());
    basketService.add(mockOffer(1, 'Produkt', 100), 1);
    fixture.detectChanges();

    const checkoutBtn = fixture.nativeElement.querySelector('button[color="primary"]');
    checkoutBtn.click();
    fixture.detectChanges();

    expect(basketService.basketItems().length).toBe(0);
    expect(window.alert).toHaveBeenCalled();
  });
});
