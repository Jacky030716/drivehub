import { db } from "../drizzle/drizzle.js";
import {
  links,
  linkShareDetails,
  users,
  hubs,
  groupParticipants,
} from "../drizzle/schema.js";
import { and, eq, or, desc } from "drizzle-orm";

const LinkRepository = {
  getLinkById: async (linkId, userEmail) => {
    return await db
      .select()
      .from(links)
      .innerJoin(users, eq(links.owner_email, users.email))
      .leftJoin(linkShareDetails, eq(links.id, linkShareDetails.linkId))
      .leftJoin(hubs, eq(links.hubId, hubs.id))
      .where(and(eq(links.owner_email, userEmail), eq(links.id, linkId)));
  },

  getLinksByUser: async (userEmail, role) => {
    return await db
      .selectDistinctOn([links.id])
      .from(links)
      .innerJoin(users, eq(links.owner_email, users.email))
      .leftJoin(linkShareDetails, eq(links.id, linkShareDetails.linkId))
      .leftJoin(groupParticipants, eq(links.hubId, groupParticipants.hubId))
      .leftJoin(hubs, eq(links.hubId, hubs.id))
      .where(
        or(
          eq(links.owner_email, userEmail),
          eq(linkShareDetails.sharedEmail, userEmail),
          eq(groupParticipants.email, userEmail),
          eq(hubs.owner_email, userEmail),
          eq(links.shared_with, role)
        )
      )
      .orderBy(desc(links.id));
  },

  addLink: async (linkData) => {
    return await db.insert(links).values(linkData).returning();
  },

  deleteLink: async (linkId, userEmail) => {
    return await db
      .delete(links)
      .where(and(eq(links.owner_email, userEmail), eq(links.id, linkId)))
      .returning();
  },

  updateLink: async (linkId, userEmail, linkData) => {
    return await db
      .update(links)
      .set(linkData)
      .where(and(eq(links.owner_email, userEmail), eq(links.id, linkId)))
      .returning();
  },

  getAllLinks: async () => {
    return await db.select().from(links);
  },
};

export default LinkRepository;
