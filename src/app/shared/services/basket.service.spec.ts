import { TestBed } from '@angular/core/testing';
import { BasketService } from './basket.service';
import { Offer } from '../models/offer.model';

const mockOffer = (id: number, amount: number): Offer =>
  ({
    id,
    name: `Offer ${id}`,
    buyNowPrice: { amount, currency: 'CZK' },
    endingTime: '',
    status: 'ACTIVE',
    seoUrl: '',
    images: { lists: { medium: [], medium_preview: [] } },
  }) as Offer;

describe('BasketService', () => {
  let service: BasketService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketService);
  });

  it('should start with empty basket', () => {
    expect(service.basketItems()).toEqual([]);
    expect(service.totalCount()).toBe(0);
    expect(service.totalPrice()).toBe(0);
  });

  it('should add an offer to basket', () => {
    service.add(mockOffer(1, 100), 2);

    expect(service.basketItems().length).toBe(1);
    expect(service.basketItems()[0].quantity).toBe(2);
    expect(service.totalCount()).toBe(2);
    expect(service.totalPrice()).toBe(200);
  });

  it('should increase quantity when adding existing offer', () => {
    service.add(mockOffer(1, 100), 1);
    service.add(mockOffer(1, 100), 3);

    expect(service.basketItems().length).toBe(1);
    expect(service.basketItems()[0].quantity).toBe(4);
  });

  it('should remove an offer from basket', () => {
    service.add(mockOffer(1, 100), 1);
    service.add(mockOffer(2, 200), 1);
    service.remove(1);

    expect(service.basketItems().length).toBe(1);
    expect(service.basketItems()[0].offer.id).toBe(2);
  });

  it('should clear basket', () => {
    service.add(mockOffer(1, 100), 2);
    service.add(mockOffer(2, 50), 1);
    service.clear();

    expect(service.basketItems()).toEqual([]);
    expect(service.totalCount()).toBe(0);
  });

  it('should calculate total price correctly', () => {
    service.add(mockOffer(1, 100), 2);
    service.add(mockOffer(2, 50), 3);

    expect(service.totalPrice()).toBe(350);
  });
});
