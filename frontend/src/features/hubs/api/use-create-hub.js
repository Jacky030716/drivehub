import { toast } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";

export const useCreateHub = () => {
  const queryClient = useQueryClient();
  const userEmail = localStorage.getItem("email")
  const token = localStorage.getItem("token")

  if (!token) {
    toast({
      title: "Please log in to create a hub",
      variant: "destructive",
    })
    return
  }

  if (!userEmail) {
    toast({
      title: "Please log in to create a hub",
      variant: "destructive",
    })
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
      toast({
        title: "Hub created!",
        variant: 'success'
      })
      queryClient.invalidateQueries(["hubs"])
    },
    onError: () => {
      toast({
        title: "Error creating hub",
        description: "Please try again",
        variant: "destructive",
      })
    }
  })

  return mutation;
}