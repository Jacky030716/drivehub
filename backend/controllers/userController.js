import { eq } from "drizzle-orm";
import { db } from "../drizzle/drizzle.js"; 
import { users } from "../drizzle/schema.js";

const userController = {
  getUser: async (req, res) => {
    let { email } = req.params;

    if (!email) {
      return res.status(400).json({
        message: "Bad request"
      });
    }

    // Sanitize the email
    email = email.trim();

    const data = await db
      .select()
      .from(users)
      .where(
        eq(users.email, email),
      )

      console.log(data);

    if (data.length === 0) {
      return res.status(404).json({
        message: "No user found"
      });
    }

    res.json({
      data
    });
  },
  loginUser: async (req, res) => {
    const { email, matricNumber, name } = req.body;    

    if (!email || !matricNumber || !name) {
      return res.status(400).json({
        message: "Bad request"
      });
    }

    // Sanitize the values
    const user = {
      email: email.trim(),
      matricNumber: matricNumber.trim(),
      name: name.trim()
    };

    // Create the new user
    const data = await db
      .insert(users)
      .values({
        email: user.email,
        matricNumber: user.matricNumber,
        name: user.name
      })
      .returning();
    
    if (!data) {
      return res.status(500).json({
        message: "Error creating user"
      });
    }

    res.json({
      data
    });
  }
};

export default userController;