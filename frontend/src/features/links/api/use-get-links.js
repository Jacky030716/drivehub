import { toast } from "vue-sonner";
import { useQuery } from "@tanstack/vue-query";
import { httpClient } from "@/lib/httpClient";

export const useGetLinks = () => {
  const userEmail = localStorage.getItem("email");
  let role = localStorage.getItem("role");

  if (role.includes("Pelajar")) {
    role = "Student";
  } else {
    role = "Lecturer";
  }

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
      const response = await httpClient.get(`/links`, {
        params: {
          userEmail,
          role,
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
