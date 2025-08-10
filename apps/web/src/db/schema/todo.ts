import { pgTable, text, boolean, uuid } from "drizzle-orm/pg-core";
import { uuidDefault } from "./utils";

export const todo = pgTable("todo", {
  id: uuid("id").primaryKey().default(uuidDefault()),
  text: text("text").notNull(),
  completed: boolean("completed").default(false).notNull()
});
