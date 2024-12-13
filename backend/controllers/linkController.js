import { and, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "../drizzle/drizzle.js";
import { hubs, links, linkShareDetails, users } from "../drizzle/schema.js";

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
      .leftJoin(linkShareDetails, eq(links.id, linkShareDetails.linkId))
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

    const sharedEmails = data.map(row => row.link_share_details?.sharedEmail).filter(Boolean);

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
      sharedEmail: sharedEmails,
      sharedWith: row.links.shared_with,
      username: row.user.name,
      hub_name: row.hubs?.name,
      hub_id: row.link_share_details?.sharedGroupId
    }));

    res.json({
      data: normalizedData
    });
  },
  getLinks: async (req, res) => {
    const { userEmail } = req.query;

    const data = await db
      .selectDistinctOn([links.createdAt])
      .from(links)
      .innerJoin(users, eq(links.owner_email, users.email))
      .leftJoin(linkShareDetails, eq(links.id, linkShareDetails.linkId))
      .where(
        or (
          eq(links.owner_email, userEmail),
          eq(linkShareDetails.sharedEmail, userEmail),
          eq(links.shared_with, users.role)
        )
      )
      .orderBy(desc(links.createdAt))
    
    console.log(data.map(row => row.links.shared_with));
        
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

    const [data] = await db
      .insert(links)
      .values({
        owner_email: userEmail,
        ...link,
        hubId: link.shared_details?.group || null
      })
      .returning()
    
    if (link.shared_with === "Others" && link.shared_details) {
      const shared_emails = link.shared_details.email.split(",").map(email => email.trim());
      console.log(shared_emails);

      // Using shared_emails to store the emails of the users with whom the link is shared
      if (shared_emails.length > 0){
        const sharedData = shared_emails.map(email => ({
          linkId: data.id,
          sharedEmail: email,
          sharedGroupId: null
        }));

        await db.insert(linkShareDetails).values(sharedData).returning();
      }

      // Share using the group
      else {
        const sharedData = {
          linkId: data.id,
          sharedEmail: null,
          sharedGroupId: link.shared_details.group
        };

        await db.insert(linkShareDetails).values(sharedData).returning();
      }
    }

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

    if (!linkId || !link){
      return res.status(400).json({
        message: "Bad request"
      });
    }

    const data = await db
      .update(links)
      .set({
        ...link,
        hubId: link.shared_details?.group || null
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

    // Handle shared details if `shared_with` is "Others"
  if (link.shared_with === "Others" && link.shared_details) {
    const shared_emails = link.shared_details.email
      ? link.shared_details.email.split(",").map(email => email.trim())
      : [];

    // Clear existing sharing details for this link
    await db
      .delete(linkShareDetails)
      .where(eq(linkShareDetails.linkId, linkId));

    // Insert updated sharing details
    if (shared_emails.length > 0) {
      const sharedData = shared_emails.map(email => ({
        linkId: linkId,
        sharedEmail: email,
        sharedGroupId: null
      }));

      await db.insert(linkShareDetails).values(sharedData).returning();
    } else if (link.shared_details.group) {
      const sharedData = {
        linkId: linkId,
        sharedEmail: null,
        sharedGroupId: link.shared_details.group
      };

      await db.insert(linkShareDetails).values(sharedData).returning();
    }
  }

    res.json({
      data
    });
  }
}

export default linkController;