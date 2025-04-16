import { toast } from "vue-sonner";
import { useMutation } from "@tanstack/vue-query";
import { queryClient } from "@/main";
import { httpClient } from "@/lib/httpClient";

export const useDeleteNotification = (notificationId) => {
  const userEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!userEmail) {
    toast.error("No user email found");
  }

  if (!token) {
    toast.error("Please log in to delete a notification");
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await httpClient.delete(
        `/notifications/${notificationId}`,
        {
          params: {
            userEmail,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data) {
        throw new Error("No notification found");
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("Notification deleted successfully!");
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: () => {
      toast.error("Error deleting notification");
    },
  });

  return mutation;
};
