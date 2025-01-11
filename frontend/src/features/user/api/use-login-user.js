import { toast } from "vue-sonner";
import { useMutation } from "@tanstack/vue-query";
import axios from "axios";
import { queryClient } from "@/main";

export const useLoginUser = () => {
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
        const { email, login_name, full_name, description } =  userData;

        // Check role
        const role = description.toLowerCase().includes("pelajar") ? "Student" : "Lecturer";

        // Check user existence
        try {
          const res = await axios.get(`/api/users/${email}`); // Return token

          const { token } = res.data.data;
          localStorage.setItem("token", token);
          
        } catch (error) {
          // User not found, create new user
          if (error.response && error.response.status === 404) {
            const res = await axios.post(`/api/users`, {
              email,
              matricNumber: login_name,
              name: full_name,
              role: role,
            });

            const { token } = res.data.data;
            localStorage.setItem("token", token);
          } else {
            throw error;
          }
        }

        if (description.toLowerCase().includes("pelajar")){
          localStorage.setItem("role", "Pelajar FC");
        } else {
          localStorage.setItem("role", "Pensyarah FC");
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
      toast.success("Login successful!");
      queryClient.invalidateQueries(["user", userData.email]);
    },
    onError: (error) => {
      toast.error("Login failed! Check your credentials and try again.");
    }
  });

  return mutation;
};