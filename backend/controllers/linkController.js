import { eq } from "drizzle-orm";
import { db } from "../drizzle/drizzle.js";
import { links, users } from "../drizzle/schema.js";

const linkController = {
  getLinks: async (req, res) => {
    const { userId } = req.query;

    const data = await db
      .select()
      .from(links)
      .innerJoin(users, eq(links.userId, users.id))
      .where(
        eq(links.userId, userId)
      )

    if (!data) {
      return res.status(404).json({
        message: "No links found"
      });
    }

    const normalizedData = data.map((row) => ({
      id: row.links.id,
      url: row.links.url,
      title: row.links.title,
      description: row.links.description,
      session: row.links.session,
      semester: row.links.semester,
      userId: row.links.userId,
      email: row.user.email,
      username: row.user.name
    }));
    
    res.json({
      data: normalizedData
    });
  },
  addLink: async (req, res) => {
    const { userId, link } = req.body;

    if (!userId){
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    if (!link){
      return res.status(400).json({
        message: "Bad request"
      });
    }

    const data = await db
      .insert(links)
      .values({
        userId,
        ...link
      })
      .returning()

    res.json({
      data
    });
  }
}

export default linkController;