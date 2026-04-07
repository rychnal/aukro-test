import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopListComponent } from './shop-list.component';
import { OffersService } from '../../shared/services/offers.service';
import { BasketService } from '../../shared/services/basket.service';
import { Offer } from '../../shared/models/offer.model';

const mockOffer = (id: number, name: string, amount = 999): Offer => ({
  id,
  name,
  buyNowPrice: { amount, currency: 'CZK' },
  endingTime: '2099-01-01',
  status: 'ACTIVE',
  seoUrl: `offer-${id}`,
  images: { lists: { medium: [{ position: 0, titleImage: true, url: 'img.jpg' }], medium_preview: [] } },
});

describe('ShopListComponent', () => {
  let fixture: ComponentFixture<ShopListComponent>;
  let offersServiceMock: jest.Mocked<OffersService>;
  let basketService: BasketService;

  beforeEach(async () => {
    localStorage.clear();
    offersServiceMock = { getOffers: jest.fn() } as unknown as jest.Mocked<OffersService>;

    await TestBed.configureTestingModule({
      imports: [ShopListComponent],
      providers: [{ provide: OffersService, useValue: offersServiceMock }],
    }).compileComponents();

    basketService = TestBed.inject(BasketService);
  });

  const createComponent = () => {
    fixture = TestBed.createComponent(ShopListComponent);
    fixture.detectChanges();
  };

  it('should create', () => {
    offersServiceMock.getOffers.mockResolvedValue([]);
    createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show spinner while loading', () => {
    offersServiceMock.getOffers.mockReturnValue(new Promise(() => {}));
    createComponent();

    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should render offer cards after load', async () => {
    offersServiceMock.getOffers.mockResolvedValue([mockOffer(1, 'Offer A'), mockOffer(2, 'Offer B')]);
    createComponent();
    await fixture.whenStable();
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('mat-card');
    expect(cards.length).toBe(2);
  });

  it('should display offer name', async () => {
    offersServiceMock.getOffers.mockResolvedValue([mockOffer(1, 'Testovaci nabidka')]);
    createComponent();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Testovaci nabidka');
  });

  it('should default quantity to 1', () => {
    offersServiceMock.getOffers.mockResolvedValue([]);
    createComponent();

    expect(fixture.componentInstance.getQuantity(42)).toBe(1);
  });

  it('should increment quantity', () => {
    offersServiceMock.getOffers.mockResolvedValue([]);
    createComponent();

    fixture.componentInstance.increment(1);
    expect(fixture.componentInstance.getQuantity(1)).toBe(2);
  });

  it('should decrement quantity but not below 1', () => {
    offersServiceMock.getOffers.mockResolvedValue([]);
    createComponent();

    fixture.componentInstance.increment(1);
    fixture.componentInstance.increment(1);
    fixture.componentInstance.decrement(1);
    expect(fixture.componentInstance.getQuantity(1)).toBe(2);

    fixture.componentInstance.decrement(1);
    fixture.componentInstance.decrement(1);
    expect(fixture.componentInstance.getQuantity(1)).toBe(1);
  });

  it('should add offer to basket with correct quantity', () => {
    offersServiceMock.getOffers.mockResolvedValue([]);
    createComponent();

    fixture.componentInstance.increment(5);
    fixture.componentInstance.increment(5);
    fixture.componentInstance.addToBasket(mockOffer(5, 'Produkt'));

    const items = basketService.basketItems();
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(3);
  });

  it('should reset quantity to 1 after adding to basket', () => {
    offersServiceMock.getOffers.mockResolvedValue([]);
    createComponent();

    fixture.componentInstance.increment(1);
    fixture.componentInstance.addToBasket(mockOffer(1, 'Produkt'));

    expect(fixture.componentInstance.getQuantity(1)).toBe(1);
  });

  it('should show error state when offers fail to load', async () => {
    offersServiceMock.getOffers.mockRejectedValue(new Error('Network error'));
    createComponent();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Nepodařilo se načíst nabídky');
  });
});
