import { db } from "../drizzle/drizzle.js";
import { hubs, users, links, groupParticipants } from "../drizzle/schema.js";
import { and, eq, or, desc } from "drizzle-orm";

const HubRepository = {
  getHubsByUser: async (userEmail) => {
    return await db
      .select()
      .from(hubs)
      .innerJoin(users, eq(hubs.owner_email, users.email))
      .leftJoin(groupParticipants, eq(hubs.id, groupParticipants.hubId))
      .where(
        or(eq(users.email, userEmail), eq(groupParticipants.email, userEmail))
      )
      .orderBy(desc(hubs.id));
  },

  getHubDetails: async (hubId) => {
    const hubData = await db
      .selectDistinctOn([links.createdAt])
      .from(hubs)
      .innerJoin(users, eq(hubs.owner_email, users.email))
      .leftJoin(links, eq(links.hubId, hubs.id))
      .where(eq(hubs.id, hubId))
      .orderBy(desc(links.createdAt));

    const sharedEmails = await db
      .select({ email: groupParticipants.email })
      .from(groupParticipants)
      .where(eq(groupParticipants.hubId, hubId));

    return { hubData, sharedEmails: sharedEmails.map((row) => row.email) };
  },

  createHub: async (hubData, sharedEmails) => {
    const [hub] = await db.insert(hubs).values(hubData).returning();

    if (sharedEmails && sharedEmails.length > 0) {
      const sharedData = sharedEmails.map((email) => ({
        hubId: hub.id,
        email,
      }));
      await db.insert(groupParticipants).values(sharedData).returning();
    }

    return hub;
  },

  deleteHub: async (hubId, userEmail) => {
    return await db
      .delete(hubs)
      .where(and(eq(hubs.id, hubId), eq(hubs.owner_email, userEmail)))
      .returning();
  },

  updateHub: async (hubId, userEmail, hubData, sharedEmails) => {
    const updatedHub = await db
      .update(hubs)
      .set(hubData)
      .where(and(eq(hubs.id, hubId), eq(hubs.owner_email, userEmail)))
      .returning();

    if (sharedEmails) {
      await db
        .delete(groupParticipants)
        .where(eq(groupParticipants.hubId, hubId));
      if (sharedEmails.length > 0) {
        const sharedData = sharedEmails.map((email) => ({
          hubId,
          email,
        }));
        await db.insert(groupParticipants).values(sharedData).returning();
      }
    }

    return updatedHub;
  },
};

export default HubRepository;
