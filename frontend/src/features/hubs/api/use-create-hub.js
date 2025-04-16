import { toast } from "vue-sonner";
import { useMutation } from "@tanstack/vue-query";
import axios from "axios";
import { queryClient } from "@/main";
import { httpClient } from "@/lib/httpClient";

export const useCreateHub = () => {
  const userEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please log in to create a hub");
    return;
  }

  if (!userEmail) {
    toast.error("No user email found");
    return;
  }

  const mutation = useMutation({
    mutationFn: async (newHub) => {
      const response = await httpClient.post(
        "/hubs",
        {
          owner_email: userEmail,
          hub: newHub,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Hub created successfully!");
      queryClient.invalidateQueries(["hubs"]);
    },
    onError: () => {
      toast.error("Error creating hub");
    },
  });

  return mutation;
};
