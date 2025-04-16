import { notificationRepository } from "../repositories/notification_repository.js";

export const notificationService = {
  getUserNotifications: async (userEmail) => {
    const rawData = await notificationRepository.getNotificationsByUser(
      userEmail
    );

    return rawData.map((item) => ({
      ...item.notifications,
      ref_name: item.links?.ref_name,
      category: item.links?.category,
    }));
  },

  markNotificationRead: async (id, userEmail, isRead) => {
    const result = await notificationRepository.updateNotificationByIdAndEmail(
      id,
      userEmail,
      isRead
    );
    return result[0] ?? null;
  },

  markAllAsRead: async (userEmail) => {
    return await notificationRepository.bulkUpdateReadByEmail(userEmail);
  },

  deleteNotification: async (id, userEmail) => {
    const result = await notificationRepository.deleteNotificationByIdAndEmail(
      id,
      userEmail
    );
    return result[0] ?? null;
  },

  deleteAllNotifications: async (userEmail) => {
    return await notificationRepository.bulkDeleteByEmail(userEmail);
  },
};
