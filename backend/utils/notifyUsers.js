export const notifyUsers = (io, targetedUsers, message) => {
  if (targetedUsers.size > 0) {
    console.log("Targeted Users:", Array.from(targetedUsers));
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
  }
};