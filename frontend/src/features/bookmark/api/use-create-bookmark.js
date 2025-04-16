import { toast } from "vue-sonner";
import { useMutation } from "@tanstack/vue-query";
import { queryClient } from "@/main";
import { httpClient } from "@/lib/httpClient";

export const useCreateBookmark = () => {
  const userEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please log in to add a bookmark to a link");
    return;
  }

  if (!userEmail) {
    toast.error("No user email found");
    return;
  }

  const mutation = useMutation({
    mutationFn: async ({ linkId, userEmail }) => {
      const response = await httpClient.post(
        "/bookmarks",
        {
          linkId,
          userEmail,
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
      toast.success("Bookmark added successfully!");
      queryClient.invalidateQueries(["bookmarks"]); // Refetch bookmarks for the user
    },
    onError: () => {
      toast.error("Error adding bookmark");
    },
  });

  return mutation;
};
