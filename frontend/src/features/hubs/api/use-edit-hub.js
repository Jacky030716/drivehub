import { toast } from "@/components/ui/toast"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import axios from "axios"

export const useEditHub = (hubId) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (hub) => {
      const response = await axios.put(`http://localhost:3000/api/hubs/${hubId}`, {  
        hub,
        userId: '2fecdb26-503c-408c-a978-1550073cdc85'
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