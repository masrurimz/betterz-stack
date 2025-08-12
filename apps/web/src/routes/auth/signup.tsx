import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { SignupForm } from '@/app/auth/_components/signup-form';

const signupSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute('/auth/signup')({
  validateSearch: signupSearchSchema,
  component: SignupPage,
});

function SignupPage() {
  const { redirect } = Route.useSearch();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-lg">
        <SignupForm redirectUrl={redirect || '/'} />
      </div>
    </div>
  );
}
