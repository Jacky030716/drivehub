import { useQuery } from "@tanstack/vue-query"
import axios from "axios"

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(`/api/categories?userId=2fecdb26-503c-408c-a978-1550073cdc85`)

      if(!response.data) {
        throw new Error("No categories found")
      }

      return response.data
    },
  })
  
  return query
}