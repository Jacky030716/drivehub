import jwt from "jsonwebtoken";
import axios from "axios";
import { userRepository } from "../repositories/user_repository.js";

const createToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: "3d" });
};

export const userService = {
  login: async (email) => {
    const user = await userRepository.findByEmail(email);
    if (!user.length) return null;

    const token = createToken(email);
    return { user: user[0], token };
  },

  authenticateUser: async (login, password) => {
    try {
      const userRes = await axios.get(
        "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi",
        {
          params: {
            entity: "authentication",
            login,
            password,
          },
        }
      );

      if (userRes.data[0].length === 0) {
        throw new Error("User not found");
      }

      return userRes.data[0];
    } catch (error) {
      console.error("Error authenticating user:", error.message);
      throw new Error("Authentication failed");
    }
  },

  loginAndCreateUser: async ({ email, matricNumber, name, role }) => {
    const newUser = {
      email: email.trim(),
      matricNumber: matricNumber.trim(),
      name: name.trim(),
      role,
    };
    const createdUser = await userRepository.createUser(newUser);
    const token = createToken(email);
    return { user: createdUser[0], token };
  },

  getAllUsers: async () => {
    return await userRepository.getAllUsers();
  },
};
