import { and, desc, eq, or } from "drizzle-orm";
import { db } from "../drizzle/drizzle.js";
import { hubs, links, users } from "../drizzle/schema.js";

const linkController = {
  getLink: async (req, res) => {
    const { linkId } = req.params;
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    if (!linkId) {
      return res.status(400).json({
        message: "Bad request"
      });
    }

    const data = await db
      .select()
      .from(links)
      .innerJoin(users, eq(links.owner_email, users.email))
      .leftJoin(hubs, eq(links.hubId, hubs.id))
      .where(
        and(
          eq(links.owner_email, userEmail),
          eq(links.id, linkId),
        ),
      )
        
    if (!data) {
      return res.status(404).json({
        message: "No link found"
      });
    }

    const [normalizedData] = data.map((row) => ({
      id: row.links.id,
      url: row.links.url,
      ref_name: row.links.ref_name,
      title: row.links.title,
      category: row.links.category,
      description: row.links.description,
      session: row.links.session,
      semester: row.links.semester,
      email: row.user.email,
      username: row.user.name,
      hub_name: row.hubs?.name,
      hub_id: row.hubs?.id
    }));

    res.json({
      data: normalizedData
    });
  },
  getLinks: async (req, res) => {
    const { userEmail } = req.query;

    const data = await db
      .select()
      .from(links)
      .innerJoin(users, eq(links.owner_email, users.email))
      .orderBy(desc(links.createdAt))
      .where(
        eq(links.owner_email, userEmail)
      )

    if (!data) {
      return res.status(404).json({
        message: "No links found"
      });
    }

    const normalizedData = data.map((row) => ({
      id: row.links.id,
      url: row.links.url,
      ref_name: row.links.ref_name,
      title: row.links.title,
      description: row.links.description,
      category: row.links.category,
      session: row.links.session,
      semester: row.links.semester,
      email: row.user.email,
      username: row.user.name
    }));
    
    res.json({
      data: normalizedData
    });
  },
  addLink: async (req, res) => {
    const { userEmail, link } = req.body;

    if (!userEmail){
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
        owner_email: userEmail,
        ...link,
        hubId: link.hub_id
      })
      .returning()

    res.json({
      data
    });
  },
  deleteLink: async (req, res) => {
    const { userEmail } = req.query;
    const { linkId } = req.params;

    if (!userEmail){
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    if (!linkId){
      return res.status(400).json({
        message: "Bad request"
      });
    }

    const [data] = await db
      .delete(links)
      .where(
        and(
          eq(links.owner_email, userEmail),
          eq(links.id, linkId)
        )
      )
      .returning({
        id: links.id
      })

    res.json({
      data
    });
  },
  updateLink: async (req, res) => {
    const { userEmail, link } = req.body;
    const { linkId } = req.params;

    if (!userEmail){
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    if (!linkId){
      return res.status(400).json({
        message: "Bad request"
      });
    }

    const data = await db
      .update(links)
      .set({
        ...link
      })
      .where(
        and(
          eq(links.owner_email, userEmail),
          eq(links.id, linkId)
        )
      )
      .returning()

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "No link found"
      });
    }

    res.json({
      data
    });
  }
}

export default linkController;