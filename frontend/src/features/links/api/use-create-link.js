import { toast } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";

export const useCreateLink = () => {
  const queryClient = useQueryClient();
  const userEmail = localStorage.getItem("email")

  if (!userEmail) {
    toast({
      title: "Please log in to create a link",
      variant: "destructive",
    })
    return
  }

  const mutation = useMutation({
    mutationFn: async (newLink) => {
      const response = await axios.post("/api/links", 
        {
          userEmail: userEmail,
          link: newLink
        }
      )
      return response.data
    },
    onSuccess: () => {
      toast({
        title: "Link created successfully!",
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