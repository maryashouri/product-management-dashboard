# Product Management Dashboard

A product management dashboard built with React, TypeScript, Vite, TanStack Query, React Hook Form, Zod, Axios, and Tailwind CSS.

The application allows users to:

- View products with pagination
- Search and filter products by category and status
- Persist filters and pagination state in URL query parameters
- Create and edit products with strict validation
- Validate SKU uniqueness asynchronously
- Delete products with optimistic updates
- Synchronize UI state efficiently using React Query cache updates

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Query
- React Hook Form
- Zod
- Axios
- React Router
- Tailwind CSS
- shadcn/ui
- json-server (Mock API)

# Installation & Running

## Install dependencies

```bash
npm install
```

## Run development server

```bash
npm run dev
```

Application will be available at:

```
http://localhost:5173
```

## Run Mock API

This project uses json-server as a mock backend.

Run:

```bash
npm run server
```

API will be available at:

```
http://localhost:3000
```

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Mock API

```bash
npm run server
```

Starts json-server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

# Folder Structure

```
src
├── api
│   └── axios.ts
│
├── components
│   └── ui
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Dialog.tsx
│
├── features
│   └── products
│       ├── api
│       │   └── products.api.ts
│       │
│       ├── components
│       │   ├── ProductForm.tsx
│       │   ├── ProductTable.tsx
│       │   ├── ProductFilters.tsx
│       │   └── DeleteProductDialog.tsx
│       │
│       ├── hooks
│       │   ├── useProducts.ts
│       │   ├── useCreateProduct.ts
│       │   ├── useUpdateProduct.ts
│       │   └── useDeleteProduct.ts
│       │
│       ├── product.schema.ts
│       ├── constants.ts
│       │
│       └── types
│           └── product.ts
│
├── pages
│   └── ProductsPage.tsx
│
├── providers
│   └── QueryProvider.tsx
│
├── router
│   └── router.tsx
│
└── main.tsx
```

# Architectural Decisions

## Feature-based Architecture

The project uses a feature-based folder structure.

Instead of grouping files by type, all product-related code is located inside:

```
features/products
```

This includes:

- Components
- Hooks
- API services
- Types
- Validation schemas

### Why?

This approach improves:

- Scalability
- Maintainability
- Separation of business logic
- Easier feature ownership

---

## Server State Management with TanStack Query

TanStack Query is used for managing server state.

For example, when updating a product:

- The existing cache is updated immediately
- Only the changed product is replaced
- The entire product list is not refetched

---

## Form Management and Validation

React Hook Form is used together with Zod.

Validation includes:

### Standard Validation

- Required fields
- String length limits
- Numeric validation

### Cross-field Validation

Example:

```
If category is Electronics,
weight must be greater than zero.
```

### Asynchronous Validation

SKU uniqueness is checked against the API before submitting the form.

---

## URL-based Filter State

Search, category, status, and pagination are stored in URL query parameters.

Example:

```
/products?page=2&category=Electronics&status=active
```

---

## Optimistic Updates

Mutation operations use optimistic updates.

For update and delete:

## Mock API

The project uses json-server as a backend simulation.

Because of this:

- Authentication is not implemented
- Backend validation is limited

In a production application:

- Authentication
- Authorization
- Server-side validation

would be handled by backend services.

# Conclusion

This project demonstrates a scalable React architecture with strong TypeScript typing, efficient server state management, form validation, optimistic updates, and cache synchronization strategies suitable for production-level applications.
