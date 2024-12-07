import { toast } from "vue-sonner";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";

export const useCreateLink = () => {
  const queryClient = useQueryClient();
  const userEmail = localStorage.getItem("email")
  const token = localStorage.getItem("token")

  if (!token) {
    toast.error('Please log in to create a link')
    return
  }

  if (!userEmail) {
    toast.error('No user email found')
    return
  }

  const mutation = useMutation({
    mutationFn: async (newLink) => {
      const response = await axios.post("/api/links", 
        {
          userEmail: userEmail,
          link: newLink
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
      toast.success('Link created successfully!')
      queryClient.invalidateQueries(["links"])
    },
    onError: () => {
      toast.error('Error creating link')
    }
  })

  return mutation;
}