  import { useQuery } from "@tanstack/vue-query"
  import axios from "axios"

  export const useGetLinks = () => {
    const query = useQuery({
      queryKey: ["links"],
      queryFn: async () => {
        const response = await axios.get(`http://localhost:3000/api/links?userId=2fecdb26-503c-408c-a978-1550073cdc85`)

        if(!response.data) {
          throw new Error("No links found")
        }

        return response.data
      },
    })
    
    return query
  }