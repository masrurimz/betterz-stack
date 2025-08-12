# my-better-t-app-2

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, TanStack Start, Hono, ORPC, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Start** - SSR framework with TanStack Router
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Hono** - Lightweight, performant server framework
- **oRPC** - End-to-end type-safe APIs with OpenAPI integration
- **Bun** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Authentication** - Email & password authentication with Better Auth
- **Turborepo** - Optimized monorepo build system
- **Husky** - Git hooks for code quality

## Getting Started

First, install the dependencies:

```bash
bun install
```
## Database Setup

This project uses PostgreSQL with Drizzle ORM.

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/web/.env` file with your PostgreSQL connection details.

3. Apply the schema to your database:
```bash
bun db:push
```


Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the full-stack application.



## Project Structure

```
my-better-t-app-2/
├── apps/
│   └── web/         # Full-stack application (TanStack Start + oRPC)
│       └── src/
│           ├── app/             # Feature modules
│           │   ├── auth/
│           │   │   ├── _api/           # Application layer (use cases)
│           │   │   ├── _domain/        # Domain layer (business rules)
│           │   │   ├── _components/    # Presentation layer (UI)
│           │   │   ├── _hooks/         # Presentation layer (state)
│           │   │   └── signin/         # Sub-features
│           │   └── todos/
│           │       ├── _api/
│           │       ├── _domain/
│           │       ├── _components/
│           │       └── _hooks/
│           ├── lib/             # Infrastructure layer
│           ├── components/      # Shared UI components
│           ├── hooks/           # Shared hooks
│           └── routes/          # TanStack Start file-based routing
├── docs/            # Documentation (Fumadocs)
└── public/          # Static assets
```

## Available Scripts

- `bun dev`: Start the full-stack application in development mode
- `bun build`: Build the application
- `bun check-types`: Check TypeScript types
- `bun db:push`: Push schema changes to database
- `bun db:studio`: Open database studio UI
- `bun db:generate`: Generate Drizzle files
- `bun db:migrate`: Run database migrations

## Clean Architecture Structure

This project follows Clean Architecture principles with feature-based organization:

### Layer Organization

- **Root Level** (no underscores): Global utilities and shared components
  - `lib/` - Infrastructure layer (database, external services)
  - `components/` - Shared UI components
  - `hooks/` - Shared React hooks

- **Feature Layers** (with underscores): Architectural layers within features
  - `_api/` - Application layer (use cases, business operations)
  - `_domain/` - Domain layer (business rules, entities, validation)
  - `_components/` - Presentation layer (UI components)
  - `_hooks/` - Presentation layer (state management)

- **Sub-features** (no underscores): Nested features within main features
  - `signin/`, `signout/` under `auth/`
  - `categories/` under `todos/`

### Import Patterns

```typescript
// Global utilities
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'

// Feature layers
import { loginUser } from '@/app/auth/_api/login'
import { validatePassword } from '@/app/auth/_domain/validation'
import { LoginForm } from '@/app/auth/_components/LoginForm'

// Sub-features
import { SocialLogin } from '@/app/auth/signin/_components/SocialLogin'
```

### Guidelines

1. **Start local**: Keep shared code within features first (`auth/_domain/`)
2. **Extract when needed**: Move to cross-feature only when actually shared (`app/shared/`)
3. **Clear dependencies**: Presentation → Application → Domain ← Infrastructure
4. **High cohesion**: Related code stays together within features
