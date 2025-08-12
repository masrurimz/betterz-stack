<!-- vibe-rules Integration -->

<bts>
# Better-T-Stack Project Rules

This is a my-better-t-app-2 project created with Better-T-Stack CLI.

## Project Structure

This is a full-stack TanStack Start application with the following structure:

- **`apps/web/`** - Full-stack application (TanStack Start + oRPC)
- **`apps/fumadocs/`** - Documentation site (Fumadocs)


## Available Scripts

- `bun run dev` - Start the full-stack application in development mode
- `bun run dev:web` - Start only the web application
- `bun run dev:fumadocs` - Start only the documentation site

## Database Commands

All database operations should be run from the web workspace:

- `bun run db:push` - Push schema changes to database
- `bun run db:studio` - Open database studio
- `bun run db:generate` - Generate Drizzle files
- `bun run db:migrate` - Run database migrations

Database schema files are located in `apps/web/src/lib/db/schema/`

## API Structure

- oRPC procedures are in feature `_api/` folders (e.g., `apps/web/src/app/auth/_api/`)
- oRPC router is in `apps/web/src/orpc/router.ts`
- Client-side oRPC client is in `apps/web/src/orpc/client.ts`

## Authentication

Authentication is enabled in this project:
- Auth configuration is in `apps/web/src/lib/auth.ts`
- Auth feature module is in `apps/web/src/app/auth/`

## Architecture Guidelines

This project follows Clean Architecture principles with feature-based organization:

### Layer Definitions

- **`_api/`** - Application Layer (use cases, business operations)
- **`_domain/`** - Domain Layer (business rules, entities, validation)
- **`_components/`** - Presentation Layer (UI components with direct oRPC calls)
- **`lib/`** - Infrastructure Layer (external services, database)

### Folder Structure Rules

- **Root level**: No underscores (`lib/`, `components/`, `hooks/`, `app/`)
- **Feature layers**: Underscores (`_api/`, `_domain/`, `_components/`)
- **Sub-features**: No underscores (`signin/`, `signout/`, `categories/`)
- **Sub-feature layers**: Underscores (`signin/_api/`, `signin/_components/`)

### Feature Organization Principles

1. **Start local**: Keep shared code within features first (`auth/_domain/`)
2. **Extract when needed**: Move to cross-feature only when actually shared (`app/shared/`)
3. **High cohesion**: Related code that changes together stays together
4. **Clear dependencies**: Presentation → Application → Domain ← Infrastructure

### Example Structure

```
src/app/
├── auth/
│   ├── _api/           # Login, signup, logout procedures
│   ├── _domain/        # Auth validation, user entity, password rules
│   ├── _components/    # login-form, signup-form components
│   ├── signin/         # Sub-feature
│   │   ├── _api/       # Social login procedures
│   │   └── _components/ # social-buttons component
│   └── signout/        # Sub-feature
│       ├── _api/       # Logout all sessions
│       └── _components/ # logout-button component
└── todos/
    ├── _api/           # CRUD procedures
    ├── _domain/        # Todo entity, validation
    └── _components/    # todo-list, todo-form (with direct oRPC calls)
```

### Import Patterns

```typescript
// Infrastructure layer
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'

// Cross-feature domain
import { checkPermissions } from '@/app/shared/permissions'

// Feature layers
import { loginUser } from '@/app/auth/_api/login'
import { validateEmail } from '@/app/auth/_domain/validation'
import { LoginForm } from '@/app/auth/_components/login-form'

// Sub-features
import { GoogleLogin } from '@/app/auth/signin/_components/google-login'
```

## Adding More Features

You can add additional addons or deployment options to your project using:

```bash
bunx create-better-t-stack
add
```

Available addons you can add:
- **Documentation**: Starlight, Fumadocs
- **Linting**: Biome, Oxlint, Ultracite
- **Other**: vibe-rules, Turborepo, PWA, Tauri, Husky

You can also add web deployment configurations like Cloudflare Workers support.

## Project Configuration

This project includes a `bts.jsonc` configuration file that stores your Better-T-Stack settings:

- Contains your selected stack configuration (database, ORM, backend, frontend, etc.)
- Used by the CLI to understand your project structure
- Safe to delete if not needed
- Updated automatically when using the `add` command

## Key Points

- This is a Turborepo monorepo using bun workspaces
- Each app has its own `package.json` and dependencies
- Run commands from the root to execute across all workspaces
- Run workspace-specific commands with `bun run command-name`
- Turborepo handles build caching and parallel execution
- Use `bunx
create-better-t-stack add` to add more features later
</bts>

<!-- /vibe-rules Integration -->
