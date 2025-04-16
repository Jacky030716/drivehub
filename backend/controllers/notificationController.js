import { notificationService } from "../services/notification_service.js";

const notificationController = {
  getNotifications: async (req, res) => {
    const { userEmail } = req.query;

    try {
      const data = await notificationService.getUserNotifications(userEmail);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateNotification: async (req, res) => {
    const { id } = req.params;
    const { userEmail, isRead } = req.body;

    try {
      const data = await notificationService.markNotificationRead(
        id,
        userEmail,
        isRead
      );
      if (!data)
        return res.status(404).json({ message: "Notification not found" });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  bulkUpdateNotifications: async (req, res) => {
    const { userEmail } = req.body;

    try {
      const data = await notificationService.markAllAsRead(userEmail);
      if (!data.length)
        return res.status(404).json({ message: "Notifications not found" });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteNotification: async (req, res) => {
    const { id } = req.params;
    const { userEmail } = req.query;

    try {
      const data = await notificationService.deleteNotification(id, userEmail);
      if (!data)
        return res.status(404).json({ message: "Notification not found" });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  bulkDeleteNotifications: async (req, res) => {
    const { userEmail } = req.query;

    try {
      const data = await notificationService.deleteAllNotifications(userEmail);
      if (!data.length)
        return res.status(404).json({ message: "Notifications not found" });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default notificationController;
