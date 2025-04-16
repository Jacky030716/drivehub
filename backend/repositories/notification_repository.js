import { and, desc, eq } from "drizzle-orm";
import { db } from "../drizzle/drizzle.js";
import { notifications, links } from "../drizzle/schema.js";

export const notificationRepository = {
  getNotificationsByUser: async (userEmail) => {
    const data = await db
      .select()
      .from(notifications)
      .leftJoin(links, eq(notifications.linkId, links.id))
      .where(eq(notifications.userEmail, userEmail))
      .orderBy(desc(notifications.createdAt));

    return data;
  },

  updateNotificationByIdAndEmail: async (id, userEmail, isRead) => {
    return await db
      .update(notifications)
      .set({ isRead })
      .where(
        and(eq(notifications.id, id), eq(notifications.userEmail, userEmail))
      )
      .returning();
  },

  bulkUpdateReadByEmail: async (userEmail) => {
    return await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.userEmail, userEmail))
      .returning();
  },

  deleteNotificationByIdAndEmail: async (id, userEmail) => {
    return await db
      .delete(notifications)
      .where(
        and(eq(notifications.id, id), eq(notifications.userEmail, userEmail))
      )
      .returning();
  },

  bulkDeleteByEmail: async (userEmail) => {
    return await db
      .delete(notifications)
      .where(eq(notifications.userEmail, userEmail))
      .returning();
  },
};
