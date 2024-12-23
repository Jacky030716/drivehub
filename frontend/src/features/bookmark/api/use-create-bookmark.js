import { toast } from "vue-sonner";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";

export const useCreateBookmark = () => {
  const queryClient = useQueryClient();
  const userEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error('Please log in to create a bookmark');
    return;
  }

  if (!userEmail) {
    toast.error('No user email found');
    return;
  }

  const mutation = useMutation({
    mutationFn: async ({linkId,userEmail}) => {
      const response = await axios.post(
        "http://localhost:3000/api/bookmarks",
        {  
          linkId,
          userEmail
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
      toast.success('Bookmark created successfully!');
      queryClient.invalidateQueries(["bookmarks"]); // Refetch bookmarks for the user
    },
    onError: () => {
      toast.error('Error creating bookmark');
    },
  });

  return mutation;
};
