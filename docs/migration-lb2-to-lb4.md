# Migration: LoopBack 2 to LoopBack 4

## Summary
Migrated `server/` from LoopBack 2.x (JavaScript, models defined via JSON, built-in middleware) to LoopBack 4.x (TypeScript, decorators, dependency injection, controllers, repositories, OpenAPI-first).

## Architecture Changes

| LB2 | LB4 |
|---|---|
| `server/model-config.json` + `server/datasources.json` | Programmatic `@model()`/`@property()` decorators + `DataSource` class |
| `server/models/*.json` + `server/models/*.js` | `server/src/models/*.model.ts` (Entity classes with decorators) |
| `server/boot/` scripts | `server/src/controllers/*.controller.ts` |
| `server/server.js` | `server/src/application.ts` |
| Built-in REST routing | `@get`, `@post`, `@patch`, `@del` decorators on controller methods |
| Callback-based remote methods | Async controller methods |
| LoopBack middleware phases | LB4 sequence + Express middleware |
| `app.start()` | `app.start()` (similar API, but internally different) |

## Key Files

| File | Purpose |
|---|---|
| `server/src/application.ts` | Application class with `BootMixin(RepositoryMixin(RestApplication))` |
| `server/src/models/*.model.ts` | 6 Entity model classes with `@model()`, `@property()`, `@belongsTo()`, `@hasMany()` decorators |
| `server/src/repositories/*.repository.ts` | 6 repository classes extending `DefaultCrudRepository` with relation accessors and `registerInclusionResolver()` |
| `server/src/controllers/*.controller.ts` | 7 controller classes with CRUD endpoints and custom remote methods |
| `server/src/datasources/db.datasource.ts` | Memory datasource with file persistence, handles file loading synchronously on `start()` to avoid race conditions |
| `server/src/migrate.ts` | Seed script (10 products with real image paths) |
| `server/src/index.ts` | Entry point; boots app, runs migrate, starts server |
| `server/tsconfig.json` | TypeScript config for ES2020, NodeNext module |

## Data Sources

Memory connector with file persistence (`react-seller-data.json`) retained from LB2.

**Race condition fix:** The LB4 boot sequence starts datasources (triggering async file load) before repositories register models. The memory connector's `parseAndLoad()` replaces `this.cache` entirely, losing models defined after the file load completes. Fixed by overriding `start()` in `DbDataSource` to read the file synchronously and merge entries into the existing cache.

## Models

All 6 models migrated from LB2 JSON/LoopBack definition to LB4 Entity classes:

- **Product** — `@hasMany(() => OrderDetail)`, `@hasMany(() => PurchaseItem)`
- **Customer** — `@hasMany(() => Order)`, `@hasMany(() => PurchaseOrder)`
- **Order** — `@belongsTo(() => Customer)`, `@hasMany(() => OrderDetail)`
- **OrderDetail** — `@belongsTo(() => Product)`, `@belongsTo(() => Order)`
- **PurchaseOrder** — `@belongsTo(() => Customer)`, `@hasMany(() => PurchaseItem)`
- **PurchaseItem** — `@belongsTo(() => Product)`, `@belongsTo(() => PurchaseOrder)`

## Relations and Inclusion

LB4 handles relations differently from LB2/LB3:
- Relations are defined via decorators (`@belongsTo`, `@hasMany`) on Entity classes
- Accessors (`createBelongsToAccessorFor`, `createHasManyRepositoryFactoryFor`) are created in repository constructors
- Inclusion resolvers are registered via `registerInclusionResolver()` to support the `filter[include]` query parameter
- Inclusion resolvers allow `DefaultCrudRepository.find()` to resolve related models automatically when `filter.include` is provided as a JSON array of `{relation: "name"}` objects

## Endpoints

### CRUD Endpoints (auto-generated via controllers)
- `GET /api/{modelName}` — List with `?filter=...` (supports JSON string or bracket-notation filters)
- `GET /api/{modelName}/{id}` — Find by ID
- `POST /api/{modelName}` — Create
- `PATCH /api/{modelName}/{id}` — Update by ID
- `DELETE /api/{modelName}/{id}` — Delete by ID

### Custom Remote Methods (migrated as controller endpoints)
- `GET /api/products/updateStock?id=N&amount=N` — Update stock quantity
- `GET /api/products/checkStock?id=N&amount=N` — Check stock availability
- `GET /api/products/getname?id=N` — Get product name
- `GET /api/orderDetails/currentTotal` — Get current total

### Filter Format
Supports two formats:
1. **JSON string:** `?filter={"where":{"code":"MOU-G502X"},"include":[{"relation":"orderDetails"}]}`
2. **Legacy bracket (Express qs):** `?filter[where][code]=MOU-G502X`

## Known Issues

### Version compatibility
`@loopback/repository@8.x` uses `loopback-datasource-juggler@7.x` internally. The memory connector stores model data in `this.cache` while newer juggler versions introduced `this.collections`. A race condition in `parseAndLoad` (replaces `this.cache` instead of merging) is worked around in `DbDataSource.start()`.

### Startup
```bash
cd server
npm run build    # TypeScript compilation
npm start        # Run server (port 3000)
```

### Seed data
```bash
npm run migrate
```
