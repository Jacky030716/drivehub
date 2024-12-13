import { useQuery } from "@tanstack/vue-query"
import axios from "axios"

export const useGetHub = (groupId) => {
  const token = localStorage.getItem("token")

  const query = useQuery({
    queryKey: ["group", groupId],
    queryFn: async () => {
      const response = await axios.get(`/api/hubs/${groupId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      if(!response.data) {
        throw new Error("No Hub found")
      }
      
      return response.data
    },
  })
  
  return query
}