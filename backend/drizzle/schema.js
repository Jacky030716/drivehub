import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("user", {
  email: text("email").unique().primaryKey(),
  matricNumber: text("matric_number").notNull().unique(),
  name: text("name").notNull(),
})

export const userRelations = relations(users, ({ many }) => ({
  hubs: many(hubs),
  links: many(links),
  feedbacks: many(feedbacks),
}))

export const hubs = pgTable("hubs", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  session: text("session").notNull(),
  semester: text("semester").notNull(),
  owner_email: text("owner_email").references(() => users.email, {
    onDelete: "CASCADE",
  }).notNull(),
})

export const hubRelations = relations(hubs, ({ one, many }) => ({
  owner: one(users, {
    fields: [hubs.owner_email],
    references: [users.email],
  }),
  links: many(links),
}))

export const links = pgTable("links", {
  id: uuid("id").primaryKey().defaultRandom(),
  url: text("url").notNull().unique(),
  ref_name: text("ref_name").notNull(),
  description: text("description").notNull(),
  semester: text("semester").notNull(),
  session: text("session").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  owner_email: text("owner_email").references(() => users.email, {
    onDelete: "CASCADE",
  }), // fk for owner
  hubId: uuid("hub_id").references(() => hubs.id, {
    onDelete: "CASCADE",
  }), // fk for hub
})

export const linkRelations = relations(links, ({ one, many }) => ({
  owner: one(users, {
    fields: [links.owner_email],
    references: [users.email],
  }),
  hub: one(hubs, {
    fields: [links.hubId],
    references: [hubs.id],
  }),
  feedbacks: many(feedbacks),
}))

export const feedbacks = pgTable("feedback", {
  id: uuid("id").primaryKey().defaultRandom(),
  comment: text("comment").notNull(),
  linkId: uuid("link_id").references(() => links.id, {
    onDelete: "CASCADE",
  }).notNull(),
  owner_email: text("owner_email").references(() => users.email, {
    onDelete: "CASCADE",
  }).notNull(),
})

export const feedbackRelations = relations(feedbacks, ({ one }) => ({
  link: one(links, {
    fields: [feedbacks.linkId],
    references: [links.id],
  }),
  user: one(users, {
    fields: [feedbacks.owner_email],
    references: [users.email],
  }),
}))

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
})