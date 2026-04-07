import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offer, OffersResponse } from '../models/offer.model';

const API_URL = '/api/offers/carouselOffers?ids=7076190539,7087376758,7087202839,7079604952,7086686044,7086829246,7086469857,7086405806,7086269719,6986190712,7086708273,7086632118,7086307306,7086406787&currency=CZK';

@Injectable({ providedIn: 'root' })
export class OffersService {
  private readonly http = inject(HttpClient);

  async getOffers(): Promise<Offer[]> {
    try {
      return await firstValueFrom(
        this.http.get<OffersResponse>(API_URL).pipe(map((res) => res.content))
      );
    } catch (err) {
      console.error('Failed to load offers:', err);
      throw err;
    }
  }
}
