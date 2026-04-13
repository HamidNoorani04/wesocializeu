import { pgTable, serial, text, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const creatorsTable = pgTable("creators", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  handle: text("handle").notNull(),
  category: text("category").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
  instagramFollowers: integer("instagram_followers").notNull().default(0),
  tiktokFollowers: integer("tiktok_followers").notNull().default(0),
  youtubeFollowers: integer("youtube_followers").notNull().default(0),
  engagementRate: real("engagement_rate").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCreatorSchema = createInsertSchema(creatorsTable).omit({ id: true, createdAt: true });
export type InsertCreator = z.infer<typeof insertCreatorSchema>;
export type Creator = typeof creatorsTable.$inferSelect;
