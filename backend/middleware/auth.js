import jwt from "jsonwebtoken";
import { db } from "../drizzle/drizzle.js";
import { users } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(' ')[1];

    try {
        const { email } = jwt.verify(token, process.env.SECRET);

        // Fetch user from database
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
        
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user;
        next();

    } catch(err) {
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

export default requireAuth;