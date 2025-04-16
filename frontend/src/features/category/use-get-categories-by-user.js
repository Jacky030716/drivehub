import { httpClient } from "@/lib/httpClient";
import { useQuery } from "@tanstack/vue-query";

export const useGetCategoriesByUser = () => {
  const token = localStorage.getItem("token");
  let role = localStorage.getItem("role");

  if (role === "Pelajar FC") {
    role = "student";
  }

  const query = useQuery({
    queryKey: ["categories_by_users"],
    queryFn: async () => {
      const response = await httpClient.get(`/categories/role/${role}`, {
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
