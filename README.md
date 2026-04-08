# Aukro Test — Angular 21 E-shop

Ukázkový e-shop vytvořený jako technické zadání. Zobrazuje produkty z Aukro API, umožňuje přidávání do košíku a podporuje přepínání jazyka a měny.

## Technologie

- **Angular 21** — standalone komponenty, signals, OnPush, zoneless
- **Angular Material** — UI komponenty
- **Tailwind CSS 4** — utility třídy
- **RxJS** — reaktivní programování
- **Jest** — unit testy
- **ESLint** — statická analýza kódu

## Funkcionality

- **Produkty** — seznam načítaný z REST API s loading a error stavem
- **Košík** — přidávání, odebírání, změna množství, persistence v `localStorage`
- **i18n** — překlady v češtině, slovenštině a angličtině
- **Měny** — konverze cen mezi CZK, EUR a GBP
- **Routing** — `/shop` (produkty) a `/basket` (košík), lazy loading

## Spuštění

```bash
npm install
npm start
```

Aplikace běží na [http://localhost:4200](http://localhost:4200).

> Dev server proxy přesměrovává `/api` požadavky na `https://aukro.cz/backend-web`.

## Příkazy

| Příkaz | Popis |
|--------|-------|
| `npm start` | Spustí dev server |
| `npm run build` | Produkční build |
| `npm test` | Spustí Jest testy |
| `npm run test:coverage` | Testy s coverage reportem |
| `npm run lint` | Zkontroluje kód ESLintem |
| `npm run lint:fix` | Automaticky opraví lint chyby |

## Struktura projektu

```
src/
├── app/
│   ├── features/
│   │   ├── shop-list/            # Seznam produktů
│   │   └── basket/               # Košík
│   └── shared/
│       ├── components/
│       │   ├── locale-selector/  # Výběr jazyka a měny
│       │   └── nav-menu/         # Navigace
│       ├── models/               # TypeScript interfaces
│       ├── pipes/                # TranslatePipe, PricePipe
│       └── services/             # BasketService, OffersService, LanguageService, CurrencyService
├── environments/
└── styles.scss
```

