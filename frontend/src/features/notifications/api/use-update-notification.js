import { httpClient } from "@/lib/httpClient";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/vue-query";
import { toast } from "vue-sonner";

export const useUpdateNotification = (notificationId) => {
  const userEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!userEmail) {
    toast.error("No user email found");
  }

  if (!token) {
    toast.error("Please log in to perform your action");
  }

  const mutation = useMutation({
    mutationFn: async (markedAsRead) => {
      const { isRead } = markedAsRead;

      const response = await httpClient.put(
        `/notifications/${notificationId}`,
        {
          userEmail,
          isRead,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data) {
        throw new Error("No Notification found");
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"], {
        refetchInactive: true,
      });
      queryClient.refetchQueries(["notifications"], { active: true });
    },
  });

  return mutation;
};
