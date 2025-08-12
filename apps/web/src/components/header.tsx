import { Link } from '@tanstack/react-router';
import LanguageSwitcher from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import authClient from '@/lib/auth/auth-client';
import { Route } from '@/routes/__root';

export default function Header() {
  const { user } = Route.useRouteContext();

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload();
        },
      },
    });
  };

  return (
    <header className="flex justify-between gap-2 bg-white p-2 text-black">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/orpc-todo">oRPC Todo</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/form/simple">Simple Form</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/form/address">Address Form</Link>
        </div>
      </nav>

      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        {user ? (
          <>
            <Link to="/dashboard">
              <Button size="sm" variant="ghost">
                Dashboard
              </Button>
            </Link>
            <span className="text-sm">Welcome, {user.name}!</span>
            <Button onClick={handleSignOut} size="sm" variant="outline">
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Link to="/auth/login">
              <Button size="sm" variant="outline">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
