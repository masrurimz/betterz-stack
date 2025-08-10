import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { generateUUID } from './utils';

export const todo = pgTable('todo', {
  id: uuid('id').primaryKey().$defaultFn(generateUUID),
  text: text('text').notNull(),
  completed: boolean('completed').default(false).notNull(),
});
