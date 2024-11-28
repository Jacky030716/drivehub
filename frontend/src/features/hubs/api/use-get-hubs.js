import { useQuery } from "@tanstack/vue-query"
import axios from "axios"

export const useGetHubs = () => {
  const query = useQuery({
    queryKey: ["hubs"],
    queryFn: async () => {
      const response = await axios.get(`/api/hubs?userId=2fecdb26-503c-408c-a978-1550073cdc85`)

      if(!response.data) {
        throw new Error("No hubs found")
      }

      return response.data
    },
  })
  
  return query
}