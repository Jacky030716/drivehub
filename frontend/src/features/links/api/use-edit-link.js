import { toast } from "@/components/ui/toast"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import axios from "axios"

export const useEditLink = (linkId) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (link) => {
      const response = await axios.put(`http://localhost:3000/api/links/${linkId}`, {  
        link,
        userId: '2fecdb26-503c-408c-a978-1550073cdc85'
      })
    
      if(!response.data) {
        throw new Error("No Link found")
      }

      return response.data
    },
    onSuccess: () => {
      toast({
        title: "Link edited successfully!",
        variant: 'success'
      })

      queryClient.invalidateQueries({ queryKey: ["link", { linkId }]})
      queryClient.invalidateQueries({ queryKey: ["links"]})
      queryClient.invalidateQueries({ queryKey: ["hubs"]})
    },
    onError: () => {
      toast({
        title: "Error editing link",
        description: "Please try again",
        variant: "destructive",
      })
    }
  })
  
  return mutation
}