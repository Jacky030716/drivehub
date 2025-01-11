import { toast } from "vue-sonner"
import { useMutation } from "@tanstack/vue-query"
import axios from "axios"
import { queryClient } from "@/main"

export const useDeleteLink = (linkId) => {
  const userEmail = localStorage.getItem("email")
  const token = localStorage.getItem("token")

  if(!userEmail) {
    toast.error("No user email found")
  }

  if(!token) {
    toast.error("Please log in to delete a link")
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`http://localhost:3000/api/links/${linkId}`, {
        params: {
          userEmail
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    
      if(!response.data) {
        throw new Error("No Link found")
      }

      return response.data
    },
    onSuccess: () => {
      toast.success("Link deleted successfully!")
      queryClient.invalidateQueries(["links"])
    },
    onError: () => {
      toast.error("Error deleting link")
    }
  })
  
  return mutation
}