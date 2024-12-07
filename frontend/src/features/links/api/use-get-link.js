import { useQuery } from "@tanstack/vue-query"
import axios from "axios"

export const useGetLink = (linkId) => {
  const userEmail = localStorage.getItem("email")
  const token = localStorage.getItem("token")

  if(!userEmail) {
    throw new Error("No user email found")
  }

  if(!token) {
    throw new Error("No token found")
  }

  const query = useQuery({
    enabled: !!linkId,
    queryKey: ["link", { linkId }],
    queryFn: async () => {
      const response = await axios.get(`/api/links/${linkId}`, {
        params: {
          userEmail
        },
        headers: {
          Authorization: `Bearer ${token}`
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