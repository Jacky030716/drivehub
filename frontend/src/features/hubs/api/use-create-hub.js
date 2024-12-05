import { toast } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";

export const useCreateHub = () => {
  const queryClient = useQueryClient();
  const userEmail = localStorage.getItem("email")

  const mutation = useMutation({
    mutationFn: async (newHub) => {
      const response = await axios.post("/api/hubs", 
        {
          owner_email: userEmail,
          hub: newHub
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