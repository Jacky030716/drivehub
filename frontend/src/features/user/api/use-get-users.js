import { httpClient } from "@/lib/httpClient";
import { useQuery } from "@tanstack/vue-query";

export const useGetUsers = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await httpClient.get(`/users`);

      if (!response.data) {
        throw new Error("No user found");
      }

      return response.data;
    },
  });

  return query;
};
