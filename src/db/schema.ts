// import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// export const auth = sqliteTable("users_table", {
//   id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
//   title: text("title").notNull(),
//   description: text("description"),
//   done: integer("done", { mode: "boolean" }).notNull().default(false),
//   createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
//   updateAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()).$onUpdate(() => new Date()),
// });
