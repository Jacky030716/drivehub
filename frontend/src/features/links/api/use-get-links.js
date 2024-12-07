import { toast } from "vue-sonner";
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

export const useGetLinks = () => {
  const userEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!userEmail) {
    toast.error("No user email found");
  }

  if (!token) {
    toast.error("Please log in to get links");
  }

  const query = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/links`, {
        params: {
          userEmail,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        throw new Error("No links found");
      }

      return response.data;
    },
  });

  return query;
};
