import { db } from "../drizzle/drizzle.js";
import { users } from "../drizzle/schema.js";

const getUserByEmail = async (email) => {
  const data = await db
    .select()
    .from(users)
    .where(
      eq(users.email, email),
    );
      
  return data;
}