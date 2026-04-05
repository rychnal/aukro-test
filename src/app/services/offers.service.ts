import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Offer, OffersResponse } from '../models/offer.model';

const API_URL =
  'https://aukro.cz/backend-web/api/offers/carouselOffers?ids=7116065708,7116009189,7116012740,7115858281,7114613130,7115967567,7116056520,7115713511,7116103251,7115826362,7115960367,7116104773,7115657530,7115208240,7115630606,7114867206,7115541019,7116060980,7116065246,7115551823,7115353852,7115268699,7115767406,7115813785,7115962735,7115552076,7115859390,7115913322,7115962205,7115913492,7115965310,7115369085,7115909979,7115207855,7115961445,7115657163,7115853421,7115767505,7115091600,7116065231,7115966123,7115713555,7115905455,7115956378,7115451473,7115356275,7116064037,7115268410,7115268090,7116062517,7116065280,7115831550,7115467244,7115208015,7115443990,7115460598,7115205504,7115459984,7116041200,7115268345&currency=CZK';

@Injectable({ providedIn: 'root' })
export class OffersService {
  private readonly http = inject(HttpClient);

  getOffers(): Observable<Offer[]> {
    return this.http.get<OffersResponse>(API_URL).pipe(
      map((res) => res.content),
      catchError((err) => {
        console.error('Failed to load offers:', err);
        return throwError(() => err);
      })
    );
  }
}
