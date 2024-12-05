  import { useQuery } from "@tanstack/vue-query"
  import axios from "axios"

  export const useGetLinks = () => {
    const userEmail = localStorage.getItem("email")

    if (!userEmail) {
      return
    }

    const query = useQuery({
      queryKey: ["links"],
      queryFn: async () => {
        const response = await axios.get(`http://localhost:3000/api/links`, {
          params: {
            userEmail
          }
        })

        if(!response.data) {
          throw new Error("No links found")
        }

        return response.data
      },
    })
    
    return query
  }