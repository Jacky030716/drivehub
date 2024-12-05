import { toast } from "@/components/ui/toast"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import axios from "axios"

export const useEditHub = (hubId) => {
  const userEmail = localStorage.getItem("email")

  if(!userEmail) {
    throw new Error("No user email found")
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (hub) => {
      const response = await axios.put(`http://localhost:3000/api/hubs/${hubId}`, {  
        hub,
        userEmail
      })
    
      if(!response.data) {
        throw new Error("No hub found")
      }

      return response.data
    },
    onSuccess: () => {
      toast({
        title: "Hub edited successfully!",
        variant: 'success'
      })
      queryClient.invalidateQueries(["hubs"])
    },
    onError: () => {
      toast({
        title: "Error editing hub",
        description: "Please try again",
        variant: "destructive",
      })
    }
  })
  
  return mutation
}