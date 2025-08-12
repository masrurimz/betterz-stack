import { getTodos } from '@/app/todos/_api/get-todos';
import { createTodo } from '@/app/todos/_api/create-todo';
import { toggleTodo } from '@/app/todos/_api/toggle-todo';
import { deleteTodo } from '@/app/todos/_api/delete-todo';
import { publicProcedure, protectedProcedure } from '@/lib/orpc';

export default {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: context.session?.user,
    };
  }),
  todo: {
    getAll: getTodos,
    create: createTodo,
    toggle: toggleTodo,
    delete: deleteTodo,
  },
}
