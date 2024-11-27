import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  matricNumber: text("matric_number").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
})

export const userRelations = relations(users, ({ many }) => ({
  hubs: many(hubs),
  links: many(links),
  feedbacks: many(feedbacks),
  notifications: many(notifications),
}))

export const hubs = pgTable("hubs", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  session: text("session").notNull(),
  semester: text("semester").notNull(),
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "CASCADE",
  }).notNull(),
})

export const hubRelations = relations(hubs, ({ one, many }) => ({
  owner: one(users, {
    fields: [hubs.userId],
    references: [users.id],
  }),
  participants: many(hubParticipants),
  links: many(links, "hubId"),
}))

export const hubParticipants = pgTable("hub_participants", {
  hubId: uuid("hub_id").references(() => hubs.id, { onDelete: "CASCADE" }),
  userId: uuid("user_id").references(() => users.id, { onDelete: "CASCADE" }),
});

export const links = pgTable("links", {
  id: uuid("id").primaryKey().defaultRandom(),
  category: text("category").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  session: text("session").notNull(),
  semester: text("semester").notNull(),
  url: text("url").notNull(),
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "CASCADE",
  }).notNull(), // fk for owner
  hubId: uuid("hub_id").references(() => hubs.id, {
    onDelete: "CASCADE",
  }).notNull(), // fk for hub
})

export const linkRelations = relations(links, ({ one }) => ({
  owner: one(users, {
    fields: [links.userId],
    references: [users.id],
  }),
  hub: one(hubs, {
    fields: [links.hubId],
    references: [hubs.id],
  }),
  feedbacks: many(feedbacks, "linkId"),
}))

export const feedbacks = pgTable("feedback", {
  id: uuid("id").primaryKey().defaultRandom(),
  comment: text("comment").notNull(),
  linkId: uuid("link_id").references(() => links.id, {
    onDelete: "CASCADE",
  }).notNull(),
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "CASCADE",
  }).notNull(),
})

export const feedbackRelations = relations(feedbacks, ({ one }) => ({
  link: one(links, {
    fields: [feedbacks.linkId],
    references: [links.id],
  }),
  user: one(users, {
    fields: [feedbacks.userId],
    references: [users.id],
  }),
}))

// export const notifications = pgTable("notifications", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   message: text("message").notNull(),
//   userId: uuid("user_id").notNull(),
// })
