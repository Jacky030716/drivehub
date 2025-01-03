import { toast } from "vue-sonner";
import socket from "@/features/notifications/socket";

export function useNotifications() {
  const setupNotifications = () => {
    socket.on("connect", () => {
      const userEmail = localStorage.getItem("email");
      if (userEmail) {
        socket.emit("join", userEmail);
      }
    })

    socket.on("notification", (data) => {
      if (data.userEmail === localStorage.getItem("email")) {
        // Show toast for the notification
        toast.success(data.message);
      }
    });
  };

  const cleanupNotifications = () => {
    socket.off("notification");
  };

  return {
    setupNotifications,
    cleanupNotifications
  };
}