import { httpClient } from "@/lib/httpClient";
import { useQuery } from "@tanstack/vue-query";

export const useGetHubs = () => {
  const userEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!userEmail) {
    throw new Error("No user email found");
  }

  const query = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await httpClient.get(`/hubs`, {
        params: {
          userEmail,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        throw new Error("No groups found");
      }

      return response.data;
    },
  });

  return query;
};
