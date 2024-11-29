import { toast } from "@/components/ui/toast"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import axios from "axios"

export const useDeleteHub = (hubId) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`http://localhost:3000/api/hubs/${hubId}?userId=2fecdb26-503c-408c-a978-1550073cdc85`)
    
      if(!response.data) {
        throw new Error("No Hub found")
      }

      return response.data
    },
    onSuccess: () => {
      toast({
        title: "Hub deleted successfully!",
        variant: 'success'
      })
      queryClient.invalidateQueries(["hubs"])
    },
    onError: () => {
      toast({
        title: "Error deleting hub",
        description: "Please try again",
        variant: "destructive",
      })
    }
  })
  
  return mutation
}