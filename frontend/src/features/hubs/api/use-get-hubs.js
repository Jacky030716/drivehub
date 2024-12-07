import { useQuery } from "@tanstack/vue-query"
import axios from "axios"

export const useGetHubs = () => {
  const userEmail = localStorage.getItem("email")
  const token = localStorage.getItem("token")

  if (!userEmail) {
    throw new Error("No user email found")
  }

  const query = useQuery({
    queryKey: ["hubs"],
    queryFn: async () => {
      const response = await axios.get(`/api/hubs`, {
        params: {
          userEmail,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      if(!response.data) {
        throw new Error("No hubs found")
      }

      return response.data
    },
  })
  
  return query
}