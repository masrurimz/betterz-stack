import type { I18n } from '@lingui/core';
import { createRouter as createTanstackRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { getContext } from './lib/tanstack-query/root-provider';
import { routerWithLingui } from './lib/lingui/i18n-router-plugin';
// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const createRouter = ({ i18n }: { i18n: I18n }) => {
  const rqContext = getContext();

  const router = routerWithLingui(
    createTanstackRouter({
      routeTree,
      context: { queryClient: rqContext.queryClient, i18n },
      defaultPreload: 'intent',
    }),
    i18n
  );

  setupRouterSsrQueryIntegration({
    router,
    queryClient: rqContext.queryClient,
  });

  return router;
};

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
