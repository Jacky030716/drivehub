import { httpClient } from "@/lib/httpClient";
import { useQuery } from "@tanstack/vue-query";

export const useGetHub = (groupId) => {
  const token = localStorage.getItem("token");

  const query = useQuery({
    queryKey: ["group", groupId],
    queryFn: async () => {
      const response = await httpClient.get(`/hubs/${groupId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        throw new Error("No Hub found");
      }

      return response.data;
    },
  });

  return query;
};
