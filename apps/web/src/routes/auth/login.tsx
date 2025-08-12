import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { LoginForm } from '@/app/auth/_components/login-form';

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute('/auth/login')({
  validateSearch: loginSearchSchema,
  component: LoginPage,
});

function LoginPage() {
  const { redirect } = Route.useSearch();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-lg">
        <LoginForm redirectUrl={redirect || '/'} />
      </div>
    </div>
  );
}
