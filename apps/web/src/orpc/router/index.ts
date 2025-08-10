import { addTodo, listTodos, toggleTodo, deleteTodo } from './todos'
import { publicProcedure, protectedProcedure } from '@/lib/orpc'

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
    getAll: listTodos,
    create: addTodo,
    toggle: toggleTodo,
    delete: deleteTodo,
  },
}
