# GiftAcrossWorld 🎁

A production-quality, premium e-commerce website for sending thoughtful gifts worldwide.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + CSS custom properties (design tokens)
- **State**: Zustand (persisted to localStorage)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Fonts**: Playfair Display (headings) + DM Sans (body) via Google Fonts

## Brand Colors

| Token | Value | Usage |
|---|---|---|
| `--brand-primary` | `#e87289` | Primary accent, buttons |
| `--brand-primary-dark` | `#d65d75` | Hover states |
| `--brand-primary-pale` | `#fce8ed` | Light backgrounds |
| `--brand-dark` | `#2b2225` | Footer, dark CTAs |
| `--bg-base` | `#fff0f3` | Page background |

## Setup & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Production build
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── products/          # Product listing + detail
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Multi-step checkout
│   ├── wishlist/          # Wishlist
│   ├── account/           # User account + orders
│   └── auth/login/        # Authentication
│
├── components/
│   ├── home/              # Homepage sections
│   ├── layout/            # Navbar, Footer
│   ├── product/           # ProductCard, ProductsClient, ProductDetailClient
│   └── ui/                # ToastContainer, WhatsAppButton
│
├── data/products.ts       # Mock product catalogue (12 products, 6 categories)
├── store/                 # Zustand stores (cart, wishlist, auth, toast)
└── types/index.ts         # Full TypeScript type system
```

## Pages

| Page | Route | Features |
|---|---|---|
| Homepage | `/` | Hero carousel, categories, featured products, bestsellers, testimonials, newsletter |
| All Gifts | `/products` | Filter by category/country/price, sort, search, pagination |
| Product Detail | `/products/[slug]` | Gallery, variants, quantity, add to cart, wishlist |
| Cart | `/cart` | Edit quantities, shipping methods, coupon codes |
| Checkout | `/checkout` | 3-step form: delivery → payment → review |
| Wishlist | `/wishlist` | Saved products, move to cart |
| Account | `/account` | Profile, overview of orders/addresses/wishlist |
| Address Book | `/account/addresses` | Add, edit, remove, set default shipping addresses |
| Orders & Tracking | `/account/orders` | Order history with live milestone timeline |
| Auth | `/auth/login` | Login, register, forgot password |

## Demo Credentials

```
Email:    demo@giftacrossworld.com
Password: Demo@1234
```

## Coupon Codes

| Code | Discount |
|---|---|
| `GIFT10` | 10% off (min $30) |
| `WELCOME20` | 20% off (min $50, max $25 off) |
| `FLAT5` | $5 off (min $20) |
| `LOVE15` | 15% off (min $40) |

## Delivery Countries

USA · Canada · UK · Australia · New Zealand · Germany · Malaysia

## Future Backend Integration

The service layer is designed for clean integration:
- Replace mock data in `src/data/products.ts` with API calls to your backend
- Cart/wishlist stores use `jaw_*` localStorage keys (prefix: `jaw` = Just Across World)
- Auth store is ready for JWT token injection
- Checkout form is gateway-ready (Razorpay, Stripe, PayPal)

## WhatsApp Support

- Number: +91 9167261683 / +91 7045561683
- Email: support@giftacrossworld.com
