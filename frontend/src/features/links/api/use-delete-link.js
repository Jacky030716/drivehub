import { useMutation, useQuery } from "@tanstack/vue-query"
import axios from "axios"

export const useDeleteLink = (linkId) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/api/links/${linkId}`)
      // console.log(linkId);
    
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