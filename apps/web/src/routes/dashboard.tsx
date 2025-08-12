import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getUser } from '@/lib/auth/functions/getUser';
import { orpc } from '@/lib/orpc/client';
import authClient from '@/lib/auth/auth-client';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const user = await getUser();
    if (!user) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: '/dashboard',
        },
      });
    }
  },
  component: DashboardPage,
});

function DashboardPage() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

  const { data: privateData } = orpc.privateData.useQuery({
    input: {},
  });

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/';
        },
      },
    });
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="mx-auto max-w-md">
          <CardContent className="pt-6 text-center">
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-8 text-center">
          <Badge variant="outline" className="mb-4">
            Protected Route
          </Badge>
          <h1 className="mb-2 text-4xl font-bold text-slate-900">
            Dashboard
          </h1>
          <p className="text-xl text-slate-600">
            Welcome back, {user.name}! 👋
          </p>
        </div>

        {/* User Info Card */}
        <Card className="mx-auto mb-8 max-w-2xl">
          <CardHeader>
            <CardTitle>Your Account</CardTitle>
            <CardDescription>
              Account information and session details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Name:</span>
                <span className="text-sm text-slate-600">{user.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Email:</span>
                <span className="text-sm text-slate-600">{user.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">User ID:</span>
                <span className="text-sm text-slate-600 font-mono">{user.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Email Verified:</span>
                <Badge variant={user.emailVerified ? "default" : "secondary"}>
                  {user.emailVerified ? "Verified" : "Not Verified"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Private Data Card */}
        {privateData && (
          <Card className="mx-auto mb-8 max-w-2xl">
            <CardHeader>
              <CardTitle>Protected Data</CardTitle>
              <CardDescription>
                This data comes from a protected oRPC endpoint
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-slate-100 p-4">
                  <p className="text-sm font-medium mb-2">Server Message:</p>
                  <p className="text-sm text-slate-600">{privateData.message}</p>
                </div>
                <div className="text-xs text-slate-500">
                  This data is only accessible to authenticated users via the{' '}
                  <code className="rounded bg-slate-200 px-1">protectedProcedure</code>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Explore the application features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link to="/demo/orpc-todo">
                <Button variant="outline" className="w-full">
                  📋 View Todos
                </Button>
              </Link>
              <Link to="/demo/form/simple">
                <Button variant="outline" className="w-full">
                  📝 Try Forms
                </Button>
              </Link>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-center">
              <Button variant="destructive" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="ghost">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}