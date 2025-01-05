import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";
import { toast } from "vue-sonner";

export const useBulkUpdateNotifications = () => {
  const userEmail = localStorage.getItem('email')
  const token = localStorage.getItem('token')

  if (!userEmail) {
    toast.error('No user email found')
  }

  if(!token) {
    toast.error('Please log in to perform your action')
  }
  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.put(`/api/notifications`, { userEmail }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.data) {
        throw new Error("No Notification found");
      }
  
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["notifications"], { refetchInactive: true });
      await queryClient.refetchQueries(["notifications"], { active: true });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      toast.error("Error updating notification");
    },
  });
  

  return mutation;
}