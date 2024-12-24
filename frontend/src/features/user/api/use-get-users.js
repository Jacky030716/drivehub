import { useQuery } from "@tanstack/vue-query"
import axios from "axios"

export const useGetUsers = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`/api/users`)
  
      if(!response.data) {
        throw new Error("No user found")
      }
  
      return response.data
    },
  })

  return query
}