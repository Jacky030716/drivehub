import { toast } from "vue-sonner";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";

export const useCreateHub = () => {
  const queryClient = useQueryClient();
  const userEmail = localStorage.getItem("email")
  const token = localStorage.getItem("token")

  if (!token) {
    toast.error('Please log in to create a hub')
    return
  }

  if (!userEmail) {
    toast.error('No user email found')
    return
  }

  const mutation = useMutation({
    mutationFn: async (newHub) => {
      const response = await axios.post("/api/hubs", 
        {
          owner_email: userEmail,
          hub: newHub
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    },
    onSuccess: () => {
      toast.success('Hub created successfully!')
      queryClient.invalidateQueries(["hubs"])
    },
    onError: () => {
      toast.error('Error creating hub')
    }
  })

  return mutation;
}