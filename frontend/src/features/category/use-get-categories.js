import { httpClient } from "@/lib/httpClient";
import { useQuery } from "@tanstack/vue-query";

export const useGetCategories = () => {
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");

  if (!token) {
    return;
  }

  if (!userEmail) {
    return;
  }

  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await httpClient.get(`/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        throw new Error("No categories found");
      }

      return response.data;
    },
  });

  return query;
};
