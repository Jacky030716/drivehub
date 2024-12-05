import { toast } from "@/components/ui/toast"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import axios from "axios"

export const useDeleteLink = (linkId) => {
  const userEmail = localStorage.getItem("email")

  if(!userEmail) {
    throw new Error("No user email found")
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`http://localhost:3000/api/links/${linkId}`, {
        params: {
          userEmail
        }
      })
    
      if(!response.data) {
        throw new Error("No Link found")
      }

      return response.data
    },
    onSuccess: () => {
      toast({
        title: "Link deleted successfully!",
        variant: 'success'
      })
      queryClient.invalidateQueries(["links"])
    },
    onError: () => {
      toast({
        title: "Error deleting link",
        description: "Please try again",
        variant: "destructive",
      })
    }
  })
  
  return mutation
}