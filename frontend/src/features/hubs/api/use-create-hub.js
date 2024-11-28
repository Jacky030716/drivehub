import { toast } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";

export const useCreateHub = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newHub) => {
      const response = await axios.post("/api/hubs", 
        {
          userId: "2fecdb26-503c-408c-a978-1550073cdc85",
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