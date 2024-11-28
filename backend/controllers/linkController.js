import { eq } from "drizzle-orm";
import { db } from "../drizzle/drizzle.js";
import { links } from "../drizzle/schema.js";

const linkController = {
  getLinks: async (req, res) => {
    const { userId } = req.query;

    const data = await db
      .select()
      .from(links)
      .where(
        eq(links.userId, userId)
      )

    if (!data) {
      return res.status(404).json({
        message: "No links found"
      });
    }
    
    res.json({
      data
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