import { queryClient } from "@/main"
import { useMutation } from "@tanstack/vue-query"
import axios from "axios"
import { toast } from "vue-sonner"

export const useEditCategory = () => {
  const userEmail = localStorage.getItem("email")
  const token = localStorage.getItem("token")

  if (!userEmail || !token) {
    return;
  }

  const mutation = useMutation({
    mutationFn: async (newCategory) => {
      const categoryId = newCategory.id

      const response = await axios.put(`/api/categories/${categoryId}`, {
        newCategory,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    
      if (!response.data){
        throw new Error("Failed to edit category")
      }

      return response.data
    },
    onSuccess: (_, { categoryId }) => {
      toast.success("Category edited successfully")
      queryClient.invalidateQueries("categories")
      queryClient.invalidateQueries(["category", categoryId])
    },
    onError: () => {
      toast.error('Failed to edit category')
    }
  })

  return mutation;
}