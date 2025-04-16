import { httpClient } from "@/lib/httpClient";
import { useQuery } from "@tanstack/vue-query";

export const useGetCategory = (id) => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["category", { id: id?.value }],
    queryFn: async () => {
      if (!email || !token || !id?.value) {
        return null;
      }

      const response = await httpClient.get(`/categories/${id.value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        throw new Error("Failed to get category");
      }

      return response.data;
    },
    enabled: !!email && !!token && !!id?.value,
  });
};
