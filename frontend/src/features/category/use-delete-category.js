import { httpClient } from "@/lib/httpClient";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/vue-query";
import { toast } from "vue-sonner";

export const useDeleteCategory = (categoryId) => {
  const userEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!userEmail || !token) {
    throw new Error("Missing user email or token");
  }

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await httpClient.delete(`/categories/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data) {
          throw new Error("Failed to delete category");
        }

        return response.data;
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error("Failed to delete category");
        }
      }
    },
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries("categories");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
