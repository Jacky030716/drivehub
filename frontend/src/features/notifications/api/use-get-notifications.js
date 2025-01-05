import { toast } from "vue-sonner";
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

export const useGetNotifications = () => {
  const userEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!userEmail) {
    toast.error("No user email found");
  }

  if (!token) {
    toast.error("Please log in to view notifications");
  }

  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await axios.get(`/api/notifications`, {
        params: {
          userEmail,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        throw new Error("No notifications found");
      }

      return response.data;
    },
  });

  return query;
};
