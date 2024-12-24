import { pgTable, text, uuid, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("user", {
  email: text("email").unique().primaryKey(),
  matricNumber: text("matric_number").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  hubs: many(hubs),
  links: many(links),
  feedbacks: many(feedbacks),
}));

export const hubs = pgTable("hubs", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  session: text("session").notNull(),
  semester: text("semester").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  owner_email: text("owner_email").references(() => users.email, {
    onDelete: "CASCADE",
  }).notNull(),
  links: jsonb("links").default([]), // New column to store array of links objects
});

export const hubRelations = relations(hubs, ({ one, many }) => ({
  owner: one(users, {
    fields: [hubs.owner_email],
    references: [users.email],
  }),
  links: many(links),
}));

export const groupParticipants = pgTable("group_participants", {
  id: uuid("id").primaryKey().defaultRandom(),
  hubId: uuid("hub_id").references(() => hubs.id, {
    onDelete: "CASCADE",
  }).notNull(),
  email: text("email").references(() => users.email, {
    onDelete: "CASCADE",
  }).notNull(),
});

export const groupParticipantsRelations = relations(groupParticipants, ({ one }) => ({
  hub: one(hubs, {
    fields: [groupParticipants.hubId],
    references: [hubs.id],
  }),
  user: one(users, {
    fields: [groupParticipants.email],
    references: [users.email],
  }),
}));

export const links = pgTable("links", {
  id: uuid("id").primaryKey().defaultRandom(),
  url: text("url").notNull().unique(),
  ref_name: text("ref_name").notNull(),
  description: text("description").notNull(),
  semester: text("semester").notNull(),
  session: text("session").notNull(),
  category: text("category").notNull(),
  shared_with: text("share_with").notNull().default("Private"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  owner_email: text("owner_email").references(() => users.email, {
    onDelete: "CASCADE",
  }), // fk for owner
  hubId: uuid("hub_id").references(() => hubs.id, {
    onDelete: "CASCADE",
  }), // fk for hub

  // new one try xia
  // isBookmarked: boolean("is_bookmarked").notNull().default(false),
});

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
  sharedDetails: many(linkShareDetails),
}));

// Table for storing details of "Others" shareWith option
export const linkShareDetails = pgTable("link_share_details", {
  id: uuid("id").primaryKey().defaultRandom(),
  linkId: uuid("link_id").references(() => links.id, {
    onDelete: "CASCADE",
  }).notNull(),
  sharedEmail: text("shared_email"), // Nullable; used when sharing with individual emails
  sharedGroupId: uuid("shared_hub_id").references(() => hubs.id, {
    onDelete: "CASCADE",
  }), // Nullable; used when sharing with hub
});

export const linkShareDetailsRelations = relations(linkShareDetails, ({ one }) => ({
  link: one(links, {
    fields: [linkShareDetails.linkId],
    references: [links.id],
  }),
  hub: one(hubs, {
    fields: [linkShareDetails.sharedGroupId],
    references: [hubs.id],
  }),
}));

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
});


export const bookmarks = pgTable("bookmarks", {
  id: uuid("id").primaryKey().defaultRandom(),
  linkId: uuid("link_id").references(() => links.id, {
    onDelete: "CASCADE",
  }).notNull(), // Reference to the links table
  userEmail: text("user_email").references(() => users.email, {
    onDelete: "CASCADE",
  }).notNull(), // Reference to the users table
  createdAt: timestamp("created_at").notNull().defaultNow(), // Timestamp for when the bookmark was created
});

export const bookmarkRelations = relations(bookmarks, ({ one }) => ({
  link: one(links, {
    fields: [bookmarks.linkId],
    references: [links.id],
  }),
  user: one(users, {
    fields: [bookmarks.userEmail],
    references: [users.email],
  }),
}));