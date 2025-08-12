import { publicProcedure } from '@/lib/orpc';

/**
 * Get current user session using oRPC
 *
 * This endpoint provides a unified way to access user session data through oRPC,
 * replacing the standalone TanStack Start `getUser` function for a more consistent
 * and type-safe architecture.
 *
 * **Why oRPC over createServerFn:**
 * - **Unified Architecture**: All data fetching through single oRPC pattern
 * - **Type Safety**: End-to-end TypeScript inference from server to client
 * - **Better Caching**: Integrated with TanStack Query for optimal performance
 * - **Consistent Error Handling**: Unified error patterns across the entire app
 * - **Developer Experience**: Single pattern to learn, better IDE support
 *
 * **Better Auth Integration:**
 * - Uses existing auth context from oRPC middleware (see `lib/context.ts`)
 * - Returns session structure compatible with Better Auth conventions
 * - Handles both authenticated and unauthenticated states gracefully
 * - Maintains compatibility with existing Better Auth session management
 *
 * **Architecture Benefits:**
 * - Follows Clean Architecture principles with auth logic in auth module
 * - Separates concerns: auth endpoints in `_api`, auth UI in `_components`
 * - Enables easy testing and mocking of auth endpoints
 * - Provides foundation for additional auth endpoints (refresh, validate, etc.)
 *
 * @returns User session object if authenticated, null if not authenticated
 * @example
 * ```typescript
 * // In components, use via oRPC:
 * const { data: session } = useQuery(orpc.auth.getSession.queryOptions({}));
 * const user = session?.user;
 *
 * // In route loaders:
 * const session = await queryClient.ensureQueryData(
 *   orpc.auth.getSession.queryOptions({})
 * );
 * ```
 */
export const getSession = publicProcedure.handler(({ context }) => {
  // Return the session from Better Auth context, or null if not authenticated
  // This maintains compatibility with Better Auth's session structure
  return context.session || null;
});
