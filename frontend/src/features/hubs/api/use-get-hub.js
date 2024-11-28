import { useQuery } from "@tanstack/vue-query"
import axios from "axios"

export const useGetHub = (hubId) => {
  const query = useQuery({
    queryKey: ["hub"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/hubs/${hubId}`)

      if(!response.data) {
        throw new Error("No Hub found")
      }

      return response.data
    },
  })
  
  return query
}