import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

// Numéro Mobile Money de chaque agent (user_id = id Supabase du profil)
export const mobileMoney = pgTable("mobile_money", {
  userId: text("user_id").primaryKey(),
  operator: text().notNull().default(""),
  number: text().notNull().default(""),
  holder: text().notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
