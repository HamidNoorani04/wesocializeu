import { pgTable, serial, text, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const caseStudiesTable = pgTable("case_studies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  client: text("client").notNull(),
  industry: text("industry").notNull(),
  summary: text("summary").notNull(),
  challenge: text("challenge").notNull(),
  solution: text("solution").notNull(),
  results: text("results").notNull(),
  imageUrl: text("image_url").notNull(),
  roiPercent: integer("roi_percent").notNull().default(0),
  reachMillion: real("reach_million").notNull().default(0),
  engagementRate: real("engagement_rate").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCaseStudySchema = createInsertSchema(caseStudiesTable).omit({ id: true, createdAt: true });
export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;
export type CaseStudy = typeof caseStudiesTable.$inferSelect;
