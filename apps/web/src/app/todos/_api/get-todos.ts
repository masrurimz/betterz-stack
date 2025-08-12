import { todo } from '@/db/schema/todo';
import { publicProcedure } from '@/lib/orpc';

export const getTodos = publicProcedure.handler(async ({ context }) => {
  return await context.db.select().from(todo);
});