import { pgTable, text, serial, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const sites = pgTable("sites", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  blockNumber: integer("block_number").notNull(),
  lotNumber: integer("lot_number").notNull(),
  currentFAR: real("current_far").notNull(),
  allowedFAR: real("allowed_far").notNull(),
  potentialUnits: integer("potential_units").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  zoning: text("zoning").notNull(),
});

export const insertSiteSchema = createInsertSchema(sites).omit({
  id: true,
});

export const scenarios = pgTable("scenarios", {
  id: serial("id").primaryKey(),
  siteId: integer("site_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  unitCount: integer("unit_count").notNull(),
  affordablePercentage: integer("affordable_percentage").notNull(),
  buildingHeight: real("building_height").notNull(),
  stories: integer("stories").notNull(),
  squareFootage: integer("square_footage").notNull(),
  far: real("far").notNull(),
  constructionTimeline: integer("construction_timeline").notNull(),
  estimatedCost: real("estimated_cost").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertScenarioSchema = createInsertSchema(scenarios).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Site = typeof sites.$inferSelect;
export type InsertSite = z.infer<typeof insertSiteSchema>;
export type Scenario = typeof scenarios.$inferSelect;
export type InsertScenario = z.infer<typeof insertScenarioSchema>;
