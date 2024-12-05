import { toast } from "@/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (user) => {
      try {
        // External authentication
        const verificationResponse = await axios.get(
          `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi`, 
          {
            params: {
              entity: 'authentication',
              login: user.username,
              password: user.password,
            }
          }
        );

        // Check authentication response
        if (verificationResponse.status !== 200) {
          throw new Error("Authentication failed");
        }

        const userData = verificationResponse.data[0];
        const { email, login_name, full_name } =  userData;

        // Check user existence
        try {
          await axios.get(`/api/users/${email}`);
        } catch (error) {
          // User not found, create new user
          if (error.response && error.response.status === 404) {
            console.log('User not exist, creating new user');
            await axios.post(`/api/users`, {
              email,
              matricNumber: login_name,
              name: full_name
            });
          } else {
            throw error;
          }
        }

        // Set user data in local storage or state management
        localStorage.setItem("email", email.trim());
        localStorage.setItem("matric_number", login_name);
        localStorage.setItem("name", full_name);

        return userData;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    onSuccess: (userData) => {
      toast({
        title: "Login Successful",
        description: `Welcome, ${userData.full_name}`,
        variant: 'success'
      });
      queryClient.invalidateQueries(["user", userData.email]);
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  });

  return mutation;
};