import { toast } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";

export const useCreateLink = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newLink) => {
      const response = await axios.post("http://localhost:3000/api/links", 
        {
          userId: "2fecdb26-503c-408c-a978-1550073cdc85",
          link: newLink
        }
      )
      return response.data
    },
    onSuccess: () => {
      toast({
        title: "Link created!",
        variant: 'success'
      })
      queryClient.invalidateQueries(["links"])
    },
    onError: () => {
      toast({
        title: "Error creating link",
        description: "Please try again",
        variant: "destructive",
      })
    }
  })

  return mutation;
}