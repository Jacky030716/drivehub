import { db } from "../drizzle/drizzle.js";
import { users } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

export const userRepository = {
  findByEmail: async (email) => {
    return await db.select().from(users).where(eq(users.email, email));
  },

  createUser: async (user) => {
    return await db.insert(users).values(user).returning();
  },

  getAllUsers: async () => {
    return await db.select().from(users);
  },
};
