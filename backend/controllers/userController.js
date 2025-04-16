import { userService } from "../services/user_service.js";

const userController = {
  login: async (req, res) => {
    const { email } = req.params;
    if (!email) return res.status(400).json({ message: "Bad request" });

    const result = await userService.login(email.trim());
    if (!result) return res.status(404).json({ message: "No user found" });

    res.json({ data: result });
  },

  loginCreateUser: async (req, res) => {
    const { email, matricNumber, name, role } = req.body;
    if (!email || !matricNumber || !name || !role) {
      return res.status(400).json({ message: "Bad request" });
    }

    const result = await userService.loginAndCreateUser({
      email,
      matricNumber,
      name,
      role,
    });
    res.json({ data: result });
  },

  getAllUsers: async (req, res) => {
    const users = await userService.getAllUsers();
    if (!users.length)
      return res.status(404).json({ message: "No users found" });

    res.json({ data: users });
  },
};

export default userController;
