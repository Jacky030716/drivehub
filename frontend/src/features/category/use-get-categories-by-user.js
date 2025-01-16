import { useQuery } from "@tanstack/vue-query"
import axios from "axios"

export const useGetCategoriesByUser = () => {
  const token = localStorage.getItem('token')
  let role = localStorage.getItem('role')

  if(role === 'Pelajar FC'){
    role = 'student'
  }
  
  const query = useQuery({
    queryKey: ["categories_by_users"],
    queryFn: async () => {
      const response = await axios.get(`/api/categories/role/${role}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.data) {
        throw new Error("No categories found")
      }

      return response.data
    }
  })

  return query
}