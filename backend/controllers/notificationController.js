import { and, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "../drizzle/drizzle.js";
import {
  groupParticipants,
  hubs,
  links,
  linkShareDetails,
  users,
  notifications
} from "../drizzle/schema.js";

const notificationController = {
  getNotifications: async (req, res) => {
    const { userEmail } = req.query;

    try {
      const data = await db
        .select()
        .from(notifications)
        .leftJoin(links, eq(notifications.linkId, links.id))
        .where(
            eq(notifications.userEmail, userEmail),
        )
        .orderBy(desc(notifications.createdAt))

      
      const normalizedData = data.map((item) => ({
        ...item.notifications,
        ref_name: item.links.ref_name,
        category: item.links.category,
      }))
  
      res.status(200).json(normalizedData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateNotification: async (req, res) => {
    const { id } = req.params;
    const { userEmail, isRead } = req.body;

    try {
      const data = await db
        .update(notifications)
        .set({
          isRead
        })
        .where(
          and(
            eq(notifications.id, id),
            eq(notifications.userEmail, userEmail)
          )
        )
        .returning()

      if (data.length === 0) {
        return res.status(404).json({ message: "Notification not found" });
      }

      res.status(200).json(data[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  bulkUpdateNotifications: async (req, res) => {
    const { userEmail } = req.body;

    try {
      const data = await db
        .update(notifications)
        .set({
          isRead: true
        })
        .where(
          eq(notifications.userEmail, userEmail)
        )
        .returning()

      if (data.length === 0) {
        return res.status(404).json({ message: "Notifications not found" });
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteNotification: async (req, res) => {
    const { id } = req.params;
    const { userEmail } = req.query;

    try {
      const data = await db
        .delete(notifications)
        .where(
          and(
            eq(notifications.id, id),
            eq(notifications.userEmail, userEmail)
          )
        )
        .returning()

      if (data.length === 0) {
        return res.status(404).json({ message: "Notification not found" });
      }

      res.status(200).json(data[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  bulkDeleteNotifications: async (req, res) => {
    const { userEmail } = req.query;

    try {
      const data = await db
        .delete(notifications)
        .where(
          eq(notifications.userEmail, userEmail)
        )
        .returning()
      
      if (data.length === 0) {
        return res.status(404).json({ message: "Notifications not found" });
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
}

export default notificationController;