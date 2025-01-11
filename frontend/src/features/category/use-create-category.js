import { toast } from "vue-sonner";
import { useMutation } from "@tanstack/vue-query";
import axios from "axios";
import { queryClient } from "@/main";

export const useCreateCategory = () => {
  const userEmail = localStorage.getItem("email")
  const token = localStorage.getItem("token")

  if (!token) {
    return
  }

  if (!userEmail) {
    return
  }

  const mutation = useMutation({
    mutationFn: async (newCategory) => {
      const response = await axios.post("/api/categories", 
        {
          userEmail: userEmail,
          newCategory: newCategory.category
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    },
    onSuccess: (_, newData) => {
      toast.success('Category added successfully!')
      queryClient.invalidateQueries(["categories"])
    },
    onError: () => {
      toast.error('Error adding new category')
    }
  })

  return mutation;
}