# React Seller

An inventory and sales management dashboard built with React 19, TypeScript, and Vite.

## Architecture

```
react-seller/
├── client/                   # React 19 frontend (Vite + TypeScript)
│   └── src/
│       ├── app/              # App shell (layouts, providers, router)
│       ├── components/       # Reusable UI and shared components
│       ├── features/         # Feature-based modules
│       │   ├── auth/         # Authentication
│       │   ├── dashboard/    # Overview page
│       │   ├── products/     # Product CRUD
│       │   ├── customers/    # Customer CRUD
│       │   ├── vendors/      # Vendor CRUD
│       │   └── sales/        # Orders and cart management
│       ├── hooks/            # Global hooks (auth, theme, toast)
│       ├── lib/              # Utility functions
│       ├── services/api/     # Axios client with interceptors
│       └── types/            # Shared TypeScript types
├── server/                   # LoopBack 4 API
│   └── src/
│       ├── controllers/      # REST API controllers
│       ├── datasources/      # Memory datasource
│       ├── models/           # Entity models
│       ├── repositories/     # Data access layer
│       └── migrate.ts        # Seed data script
└── docs/                     # Documentation
```

## Tech Stack

### Frontend
- **React 19** — Latest React with hooks and concurrent features
- **TypeScript** — Strict mode
- **Vite** — Fast dev server and build tool
- **React Router v7** — Nested routing with lazy loading
- **TanStack Query** — Server state management and caching
- **Zustand** — Lightweight client state (auth, theme)
- **React Hook Form + Zod** — Form handling and validation
- **Tailwind CSS** — Utility-first CSS framework
- **shadcn/ui** — Accessible, reusable UI components
- **Lucide React** — Icon library
- **Axios** — HTTP client with interceptors

### Backend
- **LoopBack 4** — TypeScript REST framework
- **Memory connector** — Zero-setup data persistence

## Prerequisites

- **Node.js** >= 20
- **npm** >= 9

## Development Setup

```bash
# Clone the repository
git clone https://github.com/kapit4n/react-seller.git
cd react-seller

# Start the API server (port 3000)
cd server
npm install
npm run build
npm run migrate   # Seed sample data
npm start

# In a new terminal, start the client (port 3001)
cd client
npm install
npm run dev
```

The client proxies `/api` requests to the server at `http://localhost:3000`.

## Available Scripts

### Client
| Command | Description |
|---|---|
| `npm run dev` | Start dev server (port 3001) |
| `npm run build` | TypeScript check + Vite production build |
| `npm run preview` | Preview production build |

### Server
| Command | Description |
|---|---|
| `npm run build` | Compile TypeScript |
| `npm start` | Start server (port 3000) |
| `npm run migrate` | Seed database with sample data |

## Features

- **Dashboard** — Overview with stat cards (products, customers, orders, revenue)
- **Products** — Full CRUD with stock management, search, image preview
- **Customers** — Full CRUD with budget tracking
- **Vendors** — Full CRUD
- **Sales / Cart** — Shopping cart, order submission with stock update, order history
- **Authentication** — Token-based, protected routes, auto-logout on 401
- **Dark Mode** — Toggleable light/dark theme with persistence
- **Responsive** — Desktop, tablet, mobile layouts

## API Endpoints

All endpoints are under `/api` and proxied to `http://localhost:3000`.

| Method | Endpoint | Description |
|---|---|---|
| GET/POST/PUT/DELETE | `/api/products` | Product CRUD |
| GET/POST/PUT/DELETE | `/api/customers` | Customer CRUD |
| GET/POST/PUT/DELETE | `/api/vendors` | Vendor CRUD |
| GET/POST/PUT/DELETE | `/api/orders` | Order CRUD |
| GET/POST/PUT/DELETE | `/api/orderDetails` | Order detail CRUD |

## Filtering

Supports legacy bracket notation and JSON string filters:

```
GET /api/products?filter[where][code]=ABC
GET /api/products?filter={"where":{"code":"ABC"}}
GET /api/products?filter={"include":[{"relation":"orderDetails"}]}
```

## Architectural Decisions

- **Feature-based folders** — Each feature owns its pages, components, hooks, services, types, and validation for better cohesion and scalability.
- **Zustand over Redux** — Lighter weight, simpler API, sufficient for the app's global state needs (auth, theme).
- **TanStack Query for server state** — Automatic caching, background refetching, optimistic updates.
- **React Hook Form + Zod** — Centralized validation schemas, type-safe forms, reduced boilerplate.
- **No AI features** — Milestone 1 focuses exclusively on modernization; AI capabilities are deferred.

## Contributing

1. Create a feature branch from `develop`
2. Make changes with logically grouped commits
3. Verify the build: `npm run build`
4. Open a pull request
