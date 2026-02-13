# AI Commerce - Production Folder Structure

This project uses a scalable, production-ready folder structure optimized for AI-powered e-commerce features.

## 📁 Directory Structure

```
src/
├── app/                     → Next.js App Router
│   ├── (auth)/             → Authentication routes (route group)
│   │   ├── login/
│   │   └── register/
│   ├── (shop)/             → Shop category routes (route group)
│   │   ├── mobiles/
│   │   ├── laptops/
│   │   └── electronics/
│   ├── product/[slug]/     → Dynamic product pages
│   ├── search/             → AI semantic search
│   ├── compare/            → AI product comparison
│   └── cart/               → Shopping cart
│
├── components/              → Reusable UI components
│   ├── ui/                 → Base UI components (Button, Input, Card)
│   ├── layout/             → Layout components (Navbar, Footer)
│   ├── product/            → Product-related components
│   ├── search/             → AI search components
│   └── comparison/         → Comparison components
│
├── features/                → Business logic modules
│   ├── auth/               → Authentication feature
│   ├── cart/               → Shopping cart feature
│   ├── wishlist/           → Wishlist feature
│   ├── search/             → AI search feature
│   ├── recommendation/     → AI recommendation feature
│   └── compare/            → Product comparison feature
│
├── services/                → API layer
│   ├── api.ts              → Base API client
│   ├── product.service.ts  → Product API calls
│   ├── auth.service.ts     → Authentication API calls
│   └── search.service.ts   → Search API calls
│
├── store/                   → Zustand state management
│   ├── cart.store.ts       → Cart state
│   ├── user.store.ts       → User authentication state
│   └── search.store.ts     → Search state
│
├── types/                   → TypeScript type definitions
│   ├── product.types.ts    → Product types
│   ├── user.types.ts       → User types
│   └── api.types.ts        → API response types
│
├── hooks/                   → Custom React hooks
│   ├── useCart.ts          → Cart management hook
│   ├── useSearch.ts        → Search functionality hook
│   └── useDebounce.ts      → Debounce utility hook
│
├── lib/                     → Utility functions
│   ├── constants.ts        → App-wide constants
│   ├── helpers.ts          → General helper functions
│   └── format.ts           → Formatting utilities
│
└── assets/                  → Static assets
    └── images/             → Image assets
```

## 🚀 Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { productService } from '@/services/product.service';
import type { Product } from '@/types/product.types';
```

Available aliases:
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/features/*` → `./src/features/*`
- `@/services/*` → `./src/services/*`
- `@/store/*` → `./src/store/*`
- `@/types/*` → `./src/types/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/lib/*` → `./src/lib/*`

## 🛠️ Key Features

### State Management (Zustand)
- **Cart Store**: Persistent shopping cart with localStorage
- **User Store**: Authentication state management
- **Search Store**: Search query and history

### API Services
- Centralized API client with interceptors
- Type-safe service methods
- Error handling

### Custom Hooks
- `useCart`: Cart operations
- `useSearch`: AI-powered search with debouncing
- `useDebounce`: Performance optimization

### Utilities
- Price formatting (Indian Rupees)
- Date formatting
- Text truncation
- Slug generation

## 📝 Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_AI_API_KEY=your_ai_api_key
```

## 🎯 Next Steps

1. Implement UI components in `src/components/ui/`
2. Build feature modules in `src/features/`
3. Connect to backend API
4. Add AI-powered search and recommendations
5. Implement product comparison logic

## 🏗️ Architecture Benefits

- **Scalable**: Microservice-ready structure
- **Maintainable**: Clear separation of concerns
- **Type-safe**: Full TypeScript support
- **Performance**: Optimized with debouncing and lazy loading
- **Developer Experience**: Clean imports with path aliases
