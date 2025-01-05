// Only for admin users

import { toast } from "vue-sonner";
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

export const useGetAllLinks = () => {
  const userEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!userEmail) {
    toast.error("No user email found");
  }

  if (!token) {
    toast.error("Please log in to get all links");
    throw new Error("Please log in to get all links");
  }

  const query = useQuery({
    queryKey: ["all_links"],
    queryFn: async () => {
      try{
        const response = await axios.get(`/api/admin/links`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          toast.error("You are not authorized to view this page");
          throw new Error("You are not authorized to view this page");
        }
  
        if (!response.data) {
          throw new Error("No links found");
        }

        return response.data;
      } catch (error) {
        throw new Error("No links found");
      }
    },
  });

  return query;
};
