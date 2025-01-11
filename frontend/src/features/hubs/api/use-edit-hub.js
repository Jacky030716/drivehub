import { toast } from "vue-sonner"
import { useMutation } from "@tanstack/vue-query"
import axios from "axios"
import { queryClient } from "@/main"

export const useEditHub = (hubId) => {
  const userEmail = localStorage.getItem("email")
  const token = localStorage.getItem("token")

  if (!token) {
    toast.error('Please log in to edit a hub')
    return
  }

  if(!userEmail) {
    toast.error('No user email found')
    return
  }

  const mutation = useMutation({
    mutationFn: async (hub) => {
      const response = await axios.put(`http://localhost:3000/api/hubs/${hubId}`, {  
        hub,
        userEmail
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    
      if(!response.data) {
        throw new Error("No hub found")
      }

      return response.data
    },
    onSuccess: () => {
      toast.success('Hub edited successfully!')
      queryClient.invalidateQueries(["hubs"])
    },
    onError: () => {
      toast.error('Error editing hub')
    }
  })
  
  return mutation
}