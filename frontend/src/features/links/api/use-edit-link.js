import { toast } from "vue-sonner"
import { useMutation } from "@tanstack/vue-query"
import axios from "axios"
import { queryClient } from "@/main"

export const useEditLink = (linkId) => {
  const userEmail = localStorage.getItem('email')
  const token = localStorage.getItem('token')

  if (!userEmail) {
    toast.error('No user email found')
  }

  if(!token) {
    toast.error('Please log in to edit a link')
  }

  const mutation = useMutation({
    mutationFn: async (link) => {
      const response = await axios.put(`http://localhost:3000/api/links/${linkId}`, {  
        link,
        userEmail
      }, {
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
      toast.success('Link edited successfully!')

      queryClient.invalidateQueries({ queryKey: ["link", { linkId }]})
      queryClient.invalidateQueries({ queryKey: ["links"]})
      queryClient.invalidateQueries({ queryKey: ["groups"]})
      queryClient.invalidateQueries({ queryKey: ["notifications"], refetchType: 'inactive'})
      queryClient.refetchQueries(["notifications"], { active: true });
    },
    onError: () => {
      toast.error('Error editing link')
    }
  })
  
  return mutation
}