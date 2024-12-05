import { useQuery } from "@tanstack/vue-query"
import axios from "axios"

export const useGetLink = (linkId) => {
  const userEmail = localStorage.getItem("email")

  if(!userEmail) {
    throw new Error("No user email found")
  }

  const query = useQuery({
    enabled: !!linkId,
    queryKey: ["link", { linkId }],
    queryFn: async () => {
      const response = await axios.get(`/api/links/${linkId}`, {
        params: {
          userEmail
        }
      })

      if(!response.data) {
        throw new Error("No link found")
      }

      return response.data
    },
  })
  
  return query
}