import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../drizzle/drizzle.js"; 
import { users } from "../drizzle/schema.js";

// Create token using email
const createToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: "3d" });
}

const userController = {
  login: async (req, res) => {
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
      );
        
    const token = createToken(email);

    if (data.length === 0) {
      return res.status(404).json({
        message: "No user found"
      });
    }

    res.json({
      data: {
        user: data[0],
        token
      }
    });
  },
  loginCreateUser: async (req, res) => {
    const { email, matricNumber, name, role } = req.body;    

    if (!email || !matricNumber || !name || !role ) {
      return res.status(400).json({
        message: "Bad request"
      });
    }

    // Sanitize the values
    const user = {
      email: email.trim(),
      matricNumber: matricNumber.trim(),
      name: name.trim(),
      role
    };

    // Create the new user
    const data = await db
      .insert(users)
      .values({
        email: user.email,
        matricNumber: user.matricNumber,
        name: user.name,
        role: user.role
      })
      .returning();
    
    const token = createToken(user.email);
    
    if (!data) {
      return res.status(500).json({
        message: "Error creating user"
      });
    }

    res.json({
      data: {
        user: data[0],
        token
      }
    });
  }
};

export default userController;