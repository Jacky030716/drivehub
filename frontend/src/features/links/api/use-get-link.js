import { useQuery } from "@tanstack/vue-query"
import axios from "axios"

export const useGetLink = (linkId) => {
  const query = useQuery({
    queryKey: ["link", linkId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/links?userId=2fecdb26-503c-408c-a978-1550073cdc85&linkId=${linkId}`)

      if(!response.data) {
        throw new Error("No link found")
      }

      return response.data
    },
  })
  
  return query
}