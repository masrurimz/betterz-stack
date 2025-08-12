import { getSession } from '@/app/auth/_api/get-session';
import { createTodo } from '@/app/todos/_api/create-todo';
import { deleteTodo } from '@/app/todos/_api/delete-todo';
import { getTodos } from '@/app/todos/_api/get-todos';
import { toggleTodo } from '@/app/todos/_api/toggle-todo';
import { protectedProcedure, publicProcedure } from '@/lib/orpc';

/**
 * Main oRPC Router
 *
 * This router provides a unified API interface for the entire application,
 * following Clean Architecture principles with feature-based organization.
 *
 * **Architecture Benefits:**
 * - **Unified Data Layer**: All API calls go through oRPC for consistency
 * - **Type Safety**: End-to-end TypeScript inference from server to client
 * - **Feature Organization**: Endpoints grouped by business domain (auth, todos, etc.)
 * - **Clean Architecture**: Domain logic separated in feature modules (_api folders)
 *
 * **Better Auth Integration:**
 * - Auth endpoints follow Better Auth conventions and terminology
 * - Session management integrated with Better Auth context
 * - Compatible with existing Better Auth patterns and middleware
 */
export default {
  /**
   * Health check endpoint for monitoring
   */
  healthCheck: publicProcedure.handler(() => {
    return 'OK';
  }),

  /**
   * Authentication endpoints following Better Auth conventions
   */
  auth: {
    getSession,
  },

  /**
   * Protected data endpoint demonstrating auth-required functionality
   */
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: 'This is private',
      user: context.session?.user,
    };
  }),

  /**
   * Todo feature endpoints organized by domain
   */
  todo: {
    getAll: getTodos,
    create: createTodo,
    toggle: toggleTodo,
    delete: deleteTodo,
  },
};
