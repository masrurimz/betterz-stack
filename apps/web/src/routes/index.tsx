import { createFileRoute, Link } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { user } = Route.useRouteContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <Badge className="mb-4" variant="secondary">
            Better-T-Stack
          </Badge>

          <h1 className="mb-6 font-bold text-5xl text-slate-900 md:text-6xl">
            Full-Stack
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}
              TypeScript{' '}
            </span>
            Starter
          </h1>

          <p className="mb-8 text-slate-600 text-xl md:text-2xl">
            Built with TanStack Start, Better Auth, oRPC, and Shadcn UI.
            Everything you need for modern full-stack development.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button className="w-full sm:w-auto" size="lg">
                    Go to Dashboard
                  </Button>
                </Link>
                <Link to="/demo/orpc-todo">
                  <Button
                    className="w-full sm:w-auto"
                    size="lg"
                    variant="outline"
                  >
                    View Todos
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth/signup">
                  <Button className="w-full sm:w-auto" size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/auth/login">
                  <Button
                    className="w-full sm:w-auto"
                    size="lg"
                    variant="outline"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-center font-bold text-3xl text-slate-900">
          What's Included
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔐 Better Auth
              </CardTitle>
              <CardDescription>
                Modern authentication with email/password and social providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">
                Secure user management with session handling, email
                verification, and social login support.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🚀 oRPC</CardTitle>
              <CardDescription>
                Type-safe RPC with automatic TypeScript inference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">
                End-to-end type safety from server to client with automatic API
                generation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎨 Shadcn UI
              </CardTitle>
              <CardDescription>
                Beautiful, accessible components built on Radix UI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">
                Copy-paste components with Tailwind CSS styling and full
                accessibility support.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 TanStack Query
              </CardTitle>
              <CardDescription>
                Powerful data synchronization for React
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">
                Smart caching, background updates, and optimistic UI updates out
                of the box.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🗂️ File-based Routing
              </CardTitle>
              <CardDescription>
                TanStack Router with type-safe routing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">
                Automatic route generation with full TypeScript support and
                nested layouts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏗️ Clean Architecture
              </CardTitle>
              <CardDescription>
                Feature-based organization with clear separation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">
                Organized code structure with domain, API, and component layers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* User Status */}
      {user && (
        <section className="container mx-auto px-4 py-8">
          <Card className="mx-auto max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Welcome back!</CardTitle>
              <CardDescription>
                You're signed in as <strong>{user.name}</strong>
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      )}
    </div>
  );
}
