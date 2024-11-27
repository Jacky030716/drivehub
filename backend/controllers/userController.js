import { db } from "../drizzle/drizzle.js"; 
import { users } from "../drizzle/schema.js"

const userController = {
  getAllUser: async (req, res) => {
    const data = await db
      .select()
      .from(users)

    return res.json(data)
  }
}

export default userController;