import type { I18n } from '@lingui/core';
import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  retainSearchParams,
  Scripts,
  useSearch,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { z } from 'zod';
import Header from '../components/header';
import { orpc } from '../lib/orpc/client';
import TanStackQueryLayout from '../lib/tanstack-query/layout';
import appCss from '../styles/globals.css?url';

interface MyRouterContext {
  queryClient: QueryClient;
  i18n: I18n;
  user: Awaited<ReturnType<typeof orpc.auth.getSession>>['user'];
}

const rootSearchSchema = z.object({
  locale: z
    .string()
    .optional()
    .refine((val) => !val || ['en', 'id'].includes(val), {
      message: 'Invalid locale',
    }),
});

export const Route = createRootRouteWithContext<MyRouterContext>()({
  validateSearch: rootSearchSchema,
  beforeLoad: async ({ context }) => {
    /**
     * Load user session using unified oRPC architecture
     *
     * This approach provides several benefits:
     * - Unified caching with TanStack Query for all auth state
     * - Type-safe session data from Better Auth through oRPC
     * - Single pattern for all data loading (no mixed createServerFn)
     * - Better performance through optimized React Query caching
     */
    const session = await context.queryClient.ensureQueryData(
      orpc.auth.getSession.queryOptions({
        input: {},
      })
    );
    return { user: session?.user || null };
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  search: {
    middlewares: [retainSearchParams(['locale'])],
  },

  shellComponent: RootDocument,
});

function RootDocument() {
  const { i18n } = Route.useRouteContext();

  return (
    <html lang={i18n.locale}>
      {/** biome-ignore lint/style/noHeadElement: need for TanStack Start */}
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        <Outlet />
        <TanStackRouterDevtools />
        <TanStackQueryLayout />
        <Scripts />
      </body>
    </html>
  );
}
