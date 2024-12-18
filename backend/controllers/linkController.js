import { and, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "../drizzle/drizzle.js";
import {
  groupParticipants,
  hubs,
  links,
  linkShareDetails,
  users,
} from "../drizzle/schema.js";

const linkController = {
  getLink: async (req, res) => {
    const { linkId } = req.params;
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!linkId) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    const data = await db
      .select()
      .from(links)
      .innerJoin(users, eq(links.owner_email, users.email))
      .leftJoin(linkShareDetails, eq(links.id, linkShareDetails.linkId))
      .leftJoin(hubs, eq(links.hubId, hubs.id))
      .where(and(eq(links.owner_email, userEmail), eq(links.id, linkId)));

    if (!data) {
      return res.status(404).json({
        message: "No link found",
      });
    }

    const sharedEmails = data
      .map((row) => row.link_share_details?.sharedEmail)
      .filter(Boolean);

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
      hub_id: row.link_share_details?.sharedGroupId,
    }));

    res.json({
      data: normalizedData,
    });
  },
  getLinks: async (req, res) => {
    const { userEmail } = req.query;

    const data = await db
      .selectDistinctOn([links.createdAt]) // Use links.id to avoid duplicates
      .from(links)
      .innerJoin(users, eq(links.owner_email, users.email)) // Link's owner
      .leftJoin(linkShareDetails, eq(links.id, linkShareDetails.linkId)) // Shared details
      .leftJoin(groupParticipants, eq(links.hubId, groupParticipants.hubId))
      .leftJoin(hubs, eq(links.hubId, hubs.id))
      .where(
        or(
          // 1. Links owned by the user
          eq(links.owner_email, userEmail),

          // 2. Links directly shared with the user
          eq(linkShareDetails.sharedEmail, userEmail),

          // 3a. Links from groups the user has participated in
          eq(groupParticipants.email, userEmail),

          // 3b. Links from groups the user has created
          eq(hubs.owner_email, userEmail)
        )
      )
      .orderBy(desc(links.createdAt));

    if (!data) {
      return res.status(404).json({
        message: "No links found",
      });
    }

    const normalizedData = data.map((row) => ({
      id: row.links.id,
      url: row.links.url,
      ref_name: row.links.ref_name,
      description: row.links.description,
      category: row.links.category,
      session: row.links.session,
      semester: row.links.semester,
      email: row.user.email,
      username: row.user.name,
    }));

    res.json({
      data: normalizedData,
    });
  },
  addLink: async (req, res) => {
    const { userEmail, link } = req.body;

    if (!userEmail) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!link) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    try {
      const [data] = await db
        .insert(links)
        .values({
          owner_email: userEmail,
          ...link,
          hubId: link.shared_details?.group || null,
        })
        .returning();

      let sharedData = [];

      if (link.shared_with === "Others" && link.shared_details) {
        const shared_emails = link.shared_details.email
          ? link.shared_details.email
              .split(",")
              .map((email) => email.trim())
              .filter((email) => email)
          : [];

        // Scenario 1: Only shared emails
        if (shared_emails.length > 0 && !link.shared_details.group) {
          sharedData = shared_emails.map((email) => ({
            linkId: data.id,
            sharedEmail: email,
            sharedGroupId: null,
          }));
        }

        // Scenario 2: Only shared group
        else if (shared_emails.length === 0 && link.shared_details.group) {
          sharedData = [
            {
              linkId: data.id,
              sharedEmail: null,
              sharedGroupId: link.shared_details.group,
            },
          ];
        }

        // Scenario 3: Both shared emails and group
        else if (shared_emails.length > 0 && link.shared_details.group) {
          sharedData = shared_emails.map((email) => ({
            linkId: data.id,
            sharedEmail: email,
            sharedGroupId: link.shared_details.group,
          }));
        }

        // Insert shared data if exists
        if (sharedData.length > 0) {
          await db.insert(linkShareDetails).values(sharedData).returning();
        }
      }

      res.status(201).json({
        message: "Link added successfully",
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  deleteLink: async (req, res) => {
    const { userEmail } = req.query;
    const { linkId } = req.params;

    if (!userEmail) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!linkId) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    const [data] = await db
      .delete(links)
      .where(and(eq(links.owner_email, userEmail), eq(links.id, linkId)))
      .returning({
        id: links.id,
      });

    res.json({
      data,
    });
  },
  updateLink: async (req, res) => {
    const { userEmail, link } = req.body;
    const { linkId } = req.params;

    if (!userEmail) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!linkId || !link) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    const [data] = await db
      .update(links)
      .set({
        ...link,
        hubId: link.shared_details?.group || null,
      })
      .where(and(eq(links.owner_email, userEmail), eq(links.id, linkId)))
      .returning();

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "No link found",
      });
    }

    // Handle shared details if `shared_with` is "Others"
    if (link.shared_with === "Others" && link.shared_details) {
      let sharedData = [];

      const shared_emails = link.shared_details.email
        ? link.shared_details.email
            .split(",")
            .map((email) => email.trim())
            .filter((email) => email)
        : [];

      // Clear existing sharing details for this link
      await db
        .delete(linkShareDetails)
        .where(eq(linkShareDetails.linkId, linkId));

      // Scenario 1: Only shared emails
      if (shared_emails.length > 0 && !link.shared_details.group) {
        sharedData = shared_emails.map((email) => ({
          linkId: data.id,
          sharedEmail: email,
          sharedGroupId: null,
        }));
      }

      // Scenario 2: Only shared group
      else if (shared_emails.length === 0 && link.shared_details.group) {
        sharedData = [
          {
            linkId: data.id,
            sharedEmail: null,
            sharedGroupId: link.shared_details.group,
          },
        ];
      }

      // Scenario 3: Both shared emails and group
      else if (shared_emails.length > 0 && link.shared_details.group) {
        sharedData = shared_emails.map((email) => ({
          linkId: data.id,
          sharedEmail: email,
          sharedGroupId: link.shared_details.group,
        }));
      }

      // Insert shared data if exists
      if (sharedData.length > 0) {
        await db.insert(linkShareDetails).values(sharedData).returning();
      }
    } else {
      // New thing
      await db
        .delete(linkShareDetails)
        .where(eq(linkShareDetails.linkId, linkId));
    }

    res.json({
      data,
    });
  },
};

export default linkController;
