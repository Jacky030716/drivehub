import jwt from "jsonwebtoken";
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
