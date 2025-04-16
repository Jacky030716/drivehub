import { httpClient } from "@/lib/httpClient";
import { useQuery } from "@tanstack/vue-query";
import { toast } from "vue-sonner";

export const useGetBookmark = () => {
  const userEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please log in to view bookmarked links");
    return;
  }

  if (!userEmail) {
    toast.error("No user email found");
    return;
  }

  const query = useQuery({
    queryKey: ["bookmarks", userEmail],
    queryFn: async () => {
      const response = await httpClient.get("/bookmarks", {
        params: { userEmail },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        throw new Error("No bookmarked links found");
      }
      return response.data;
    },
    onError: () => {
      toast.error("Error fetching bookmarked links");
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  return query;
};
