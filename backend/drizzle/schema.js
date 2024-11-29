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
  // notifications: many(notifications),
}))

export const hubs = pgTable("hubs", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
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
  links: many(links),
}))

// export const hubParticipants = pgTable("hub_participants", {
//   hubId: uuid("hub_id").references(() => hubs.id, { onDelete: "CASCADE" }).notNull(),
//   userId: uuid("user_id").references(() => users.id, { onDelete: "CASCADE" }).notNull(),
// });

// export const hubParticipantRelations = relations(hubParticipants, ({ one }) => ({
//   hub: one(hubs, {
//     fields: [hubParticipants.hubId],
//     references: [hubs.id],
//   }),
//   user: one(users, {
//     fields: [hubParticipants.userId],
//     references: [users.id],
//   }),
// }));

export const links = pgTable("links", {
  id: uuid("id").primaryKey().defaultRandom(),
  url: text("url").notNull(),
  description: text("description").notNull(),
  semester: text("semester").notNull(),
  session: text("session").notNull(),
  category: text("category").notNull(),
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "CASCADE",
  }).notNull(), // fk for owner
  hubId: uuid("hub_id").references(() => hubs.id, {
    onDelete: "CASCADE",
  }), // fk for hub
})

export const linkRelations = relations(links, ({ one, many }) => ({
  owner: one(users, {
    fields: [links.userId],
    references: [users.id],
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
