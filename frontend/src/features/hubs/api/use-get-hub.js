import { useQuery } from "@tanstack/vue-query"
import axios from "axios"

export const useGetHub = (hubId) => {
  const query = useQuery({
    queryKey: ["hub", hubId],
    queryFn: async () => {
      const response = await axios.get(`/api/hubs/${hubId}`)

      if(!response.data) {
        throw new Error("No Hub found")
      }
      
      return response.data
    },
  })
  
  return query
}