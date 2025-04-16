import { httpClient } from "@/lib/httpClient";
import { useQuery } from "@tanstack/vue-query";

export const useGetLink = (linkId) => {
  const userEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!userEmail) {
    throw new Error("No user email found");
  }

  if (!token) {
    throw new Error("No token found");
  }

  const query = useQuery({
    enabled: !!linkId,
    queryKey: ["link", { linkId }],
    queryFn: async () => {
      const response = await httpClient.get(`/links/${linkId}`, {
        params: {
          userEmail,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        throw new Error("No link found");
      }

      return response.data;
    },
  });

  return query;
};
