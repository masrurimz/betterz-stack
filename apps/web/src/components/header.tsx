import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { getUser } from '@/lib/auth/functions/getUser';
import authClient from '@/lib/auth/auth-client';

export default function Header() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

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
        {user ? (
          <>
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
