import { toast } from "vue-sonner";
import { useMutation } from "@tanstack/vue-query";
import axios from "axios";
import { queryClient } from "@/main";

export const useDeleteBookmark = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please log in to remove a bookmarked link");
    return;
  }

  const mutation = useMutation({
    mutationFn: async (bookmarkId) => {
        if (!bookmarkId) {
            throw new Error('Bookmark ID is required');
        }

        const response = await axios.delete(`http://localhost:3000/api/bookmarks/${bookmarkId}`, 
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
    );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Bookmark removed successfully!");
      queryClient.invalidateQueries(["bookmarks"]); // Refetch bookmarks for the user
    },
    onError: (error) => {
      console.error('Remove bookmark error:', error);
      toast.error("Error removing bookmark");
    },
  });

  return mutation;
};
