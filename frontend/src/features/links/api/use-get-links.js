  import { toast } from "@/components/ui/toast"
import { useQuery } from "@tanstack/vue-query"
  import axios from "axios"

  export const useGetLinks = () => {
    const userEmail = localStorage.getItem("email")
    const token = localStorage.getItem("token")

    if (!userEmail) {
      throw new Error("No user email found")
    }

    if (!token) {
      toast({
        title: "Error getting links",
        description: "Please sign in",
        variant: "destructive",
      })
    }

    const query = useQuery({
      queryKey: ["links"],
      queryFn: async () => {
        const response = await axios.get(`http://localhost:3000/api/links`, {
          params: {
            userEmail
          },
          headers: {
            Authorization: `Bearer ${token}`
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