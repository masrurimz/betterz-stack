import { createFileRoute } from '@tanstack/react-router';
import { SignupForm } from '@/app/auth/_components/signup-form';

export const Route = createFileRoute('/auth/signup')({
  component: SignupPage,
});

function SignupPage() {
  const { redirect } = Route.useSearch<{ redirect?: string }>();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-lg">
        <SignupForm redirectUrl={redirect || '/'} />
      </div>
    </div>
  );
}