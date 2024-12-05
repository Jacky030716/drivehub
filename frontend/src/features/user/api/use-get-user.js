import { useQuery } from "@tanstack/vue-query"

export const useGetUser = (email) => {
  const query = useQuery({
    enabled: !!email,
    queryKey: ["user", { email }],
    queryFn: async () => {
      const response = await axios.get(`/api/users`, {
        email
      })
  
      if(!response.data) {
        throw new Error("No user found")
      }
  
      return response.data
    },
  })

  return query
}