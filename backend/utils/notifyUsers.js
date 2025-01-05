import { db } from "../drizzle/drizzle.js";
import { notifications } from "../drizzle/schema.js";

export const notifyUsers = async (io, targetedUsers, message, link_id, hub_id) => {
  if (targetedUsers.size > 0) {
    targetedUsers.forEach((targetUser) => {
      try {
        io.to(targetUser).emit("notification", {
          userEmail: targetUser,
          message,
        });
      } catch (emitError) {
        console.error(`Socket.IO Emit Error for ${targetUser}:`, emitError);
      }
    });

    const notificationsData = Array.from(targetedUsers).map((userEmail) => ({
      userEmail,
      message,
      linkId: link_id || null,
      hubId: hub_id || null,
    }));

    await db
      .insert(notifications)
      .values(notificationsData)
      .returning();

    
  }
};