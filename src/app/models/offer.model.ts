export interface OfferPrice {
  amount: number;
  currency: string;
}

export interface OfferImage {
  position: number;
  titleImage: boolean;
  url: string;
}

export interface Offer {
  id: number;
  name: string;
  buyNowPrice: OfferPrice;
  endingTime: string;
  status: string;
  seoUrl: string;
  images: {
    lists: {
      medium: OfferImage[];
      medium_preview: OfferImage[];
    };
  };
}

export interface OffersResponse {
  content: Offer[];
}
