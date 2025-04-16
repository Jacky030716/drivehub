import { toast } from "vue-sonner";
import { useMutation } from "@tanstack/vue-query";
import { queryClient } from "@/main";
import { httpClient } from "@/lib/httpClient";

export const useDeleteHub = (hubId) => {
  const userEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!userEmail) {
    toast.error("No user email found");
    return;
  }

  if (!token) {
    toast.error("Please log in to delete a hub");
    return;
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await httpClient.delete(`/hubs/${hubId}`, {
        params: {
          userEmail,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        throw new Error("No Hub found");
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("Hub deleted successfully!");
      queryClient.invalidateQueries(["hubs"]);
    },
    onError: () => {
      toast.error("Error deleting hub");
    },
  });

  return mutation;
};
