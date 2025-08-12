import { Link, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import authClient from '@/lib/auth/auth-client';
import LanguageSwitcher from '@/components/language-switcher';

export default function Header() {
  const routerState = useRouterState();
  const user =
    routerState.location.state?.user || routerState.matches?.[0]?.context?.user;

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
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <span className="text-sm">Welcome, {user.name}!</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Link to="/auth/login">
              <Button variant="outline" size="sm">
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
