import { toast } from "vue-sonner";
import { useMutation } from "@tanstack/vue-query";
import { queryClient } from "@/main";
import { httpClient } from "@/lib/httpClient";

export const useCreateLink = () => {
  const userEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please log in to create a link");
    return;
  }

  if (!userEmail) {
    toast.error("No user email found");
    return;
  }

  const mutation = useMutation({
    mutationFn: async (newLink) => {
      const response = await httpClient.post(
        "/links",
        {
          userEmail: userEmail,
          link: newLink,
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
      toast.success("Link created successfully!");
      queryClient.invalidateQueries(["links"]);
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: () => {
      toast.error("Error creating link");
    },
  });

  return mutation;
};
