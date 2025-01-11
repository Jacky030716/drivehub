import { and, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "../drizzle/drizzle.js";
import {
  groupParticipants,
  hubs,
  links,
  linkShareDetails,
  users,
} from "../drizzle/schema.js";
import { notifyUsers } from "../utils/notifyUsers.js";

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
    const { userEmail, role } = req.query;

    const data = await db
      .selectDistinctOn([links.id])
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
          eq(hubs.owner_email, userEmail),

          // Role are same
          eq(links.shared_with, role)
        )
      )
      .orderBy(desc(links.id));
    
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
      createdAt: row.links.createdAt,
      category: row.links.category,
      shared_with: row.links.shared_with,
      session: row.links.session,
      semester: row.links.semester,
      email: row.user.email,
      username: row.user.name,
    }));

    // Sort by descending order of creation date
    normalizedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      data: normalizedData,
    });
  },
  addLink: async (req, res) => {
    const { userEmail, link } = req.body;
    let targetedUsers = new Set(); // Array to store target user emails for notifications

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
      const { io } = req;

      const allUsers = await db
        .select({
          email: users.email,
          role: users.role,
        })
        .from(users)
      
      const [data] = await db
        .insert(links)
        .values({
          owner_email: userEmail,
          ...link,
          hubId: link.shared_details?.group || null,
        })
        .returning();

      // Handle shared with "Students"
      if (link.shared_with === "Student") {
        const studentEmails = allUsers.filter((user) => user.role === "Student").map((user) => user.email).filter((email) => email !== userEmail);

        studentEmails.forEach(email => targetedUsers.add(email));

        const message = `New link (${link.ref_name}) shared with you by ${userEmail}`;
        notifyUsers(io, targetedUsers, message, data.id, null);
      }

      // Handle shared with "Lecturers"
      if (link.shared_with === "Lecturer") {
        const lecturerEmails = allUsers.filter((user) => user.role === "Lecturer").map((user) => user.email).filter((email) => email !== userEmail);

        lecturerEmails.forEach(email => targetedUsers.add(email));

        const message = `New link (${link.ref_name}) shared with you by ${userEmail}`;
        notifyUsers(io, targetedUsers, message, data.id, null);
      }

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

          // Add targeted users for notifications
          shared_emails.forEach(email => targetedUsers.add(email));

          console.log("Shared through email", targetedUsers);

          // Notify shared users
          const message = `New link (${link.ref_name}) shared with you by ${userEmail}`;
          notifyUsers(io, targetedUsers, message, data.id, null);
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

          // get the group participants
          const groupParticipantsList = await db
            .select({
              email: groupParticipants.email,
              hub_name: hubs.name,
              hub_id: hubs.id,
            })
            .from(groupParticipants)
            .leftJoin(hubs, eq(groupParticipants.hubId, hubs.id))
            .where(
              or(
                eq(groupParticipants.hubId, link.shared_details.group),
                eq(hubs.owner_email, userEmail)
              )
            );
          
          const hub_name = groupParticipantsList[0].hub_name;
          const hub_id = groupParticipantsList[0].hub_id;

          // Create notifications
          const groupParticipantsEmails = groupParticipantsList.map((participant) => participant.email);
          groupParticipantsEmails.forEach(email => targetedUsers.add(email));

          console.log("Shared through group", targetedUsers);

          const message = `New link (${link.ref_name}) shared within your group (${hub_name}) by ${userEmail}`;
          notifyUsers(io, targetedUsers, message, data.id, hub_id);
        }

        // Scenario 3: Both shared emails and group
        else if (shared_emails.length > 0 && link.shared_details.group) {
          sharedData = shared_emails.map((email) => ({
            linkId: data.id,
            sharedEmail: email,
            sharedGroupId: link.shared_details.group,
          }));

          // get the group participants
          const groupParticipantsList = await db
            .select({
              email: groupParticipants.email,
              hub_id: hubs.id,
            })
            .from(groupParticipants)
            .leftJoin(hubs, eq(groupParticipants.hubId, hubs.id))
            .where(
              or(
                eq(groupParticipants.hubId, link.shared_details.group),
                eq(hubs.owner_email, userEmail)
              )
            );

          const groupParticipantsEmails = groupParticipantsList.map((participant) => participant.email);
          groupParticipantsEmails.forEach(email => targetedUsers.add(email));

          const hub_id = groupParticipantsList[0].hub_id;

          // Notify shared users
          const message = `New link (${link.ref_name}) shared with you by ${userEmail}`;
          notifyUsers(io, targetedUsers, message, data.id, hub_id);
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
  
    try {
      const { io } = req;
  
      const allUsers = await db
        .select({
          email: users.email,
          role: users.role,
        })
        .from(users);
  
      const [data] = await db
        .update(links)
        .set({
          ...link,
          hubId: link.shared_details?.group || null,
        })
        .where(and(eq(links.owner_email, userEmail), eq(links.id, linkId)))
        .returning();
  
      if (!data) {
        return res.status(404).json({
          message: "No link found",
        });
      }
  
      let targetedUsers = new Set();
  
      // Handle shared with "Students"
      if (link.shared_with === "Student") {
        const studentEmails = allUsers
          .filter((user) => user.role === "Student")
          .map((user) => user.email)
          .filter((email) => email !== userEmail);
  
        studentEmails.forEach((email) => targetedUsers.add(email));
  
        const message = `Link (${link.ref_name}) has been updated by ${userEmail}`;
        notifyUsers(io, targetedUsers, message, data.id, null);
      }
  
      // Handle shared with "Lecturers"
      if (link.shared_with === "Lecturer") {
        const lecturerEmails = allUsers
          .filter((user) => user.role === "Lecturer")
          .map((user) => user.email)
          .filter((email) => email !== userEmail);
  
        lecturerEmails.forEach((email) => targetedUsers.add(email));
  
        const message = `Link (${link.ref_name}) has been updated by ${userEmail}`;
        notifyUsers(io, targetedUsers, message, data.id, null);
      }
  
      if (link.shared_with === "Others" && link.shared_details) {
        let sharedData = [];
  
        const shared_emails = link.shared_details.email
          ? link.shared_details.email
              .split(",")
              .map((email) => email.trim())
              .filter((email) => email)
          : [];
  
        // Clear existing sharing details for this link
        await db.delete(linkShareDetails).where(eq(linkShareDetails.linkId, linkId));
  
        // Scenario 1: Only shared emails
        if (shared_emails.length > 0 && !link.shared_details.group) {
          sharedData = shared_emails.map((email) => ({
            linkId: data.id,
            sharedEmail: email,
            sharedGroupId: null,
          }));
  
          shared_emails.forEach((email) => targetedUsers.add(email));
  
          const message = `Link (${link.ref_name}) has been updated and shared with you by ${userEmail}`;
          notifyUsers(io, targetedUsers, message, data.id, null);
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
  
          const groupParticipantsList = await db
            .select({
              email: groupParticipants.email,
              hub_name: hubs.name,
            })
            .from(groupParticipants)
            .leftJoin(hubs, eq(groupParticipants.hubId, hubs.id))
            .where(
              or(
                eq(groupParticipants.hubId, link.shared_details.group),
                eq(hubs.owner_email, userEmail)
              )
            );
  
          const hub_name = groupParticipantsList[0]?.hub_name || "your group";
          const groupParticipantsEmails = groupParticipantsList.map(
            (participant) => participant.email
          );
          groupParticipantsEmails.forEach((email) => targetedUsers.add(email));
  
          const message = `Link (${link.ref_name}) has been updated in your group (${hub_name}) by ${userEmail}`;
          notifyUsers(io, targetedUsers, message, data.id, link.shared_details.group);
        }
  
        // Scenario 3: Both shared emails and group
        else if (shared_emails.length > 0 && link.shared_details.group) {
          sharedData = shared_emails.map((email) => ({
            linkId: data.id,
            sharedEmail: email,
            sharedGroupId: link.shared_details.group,
          }));
  
          const groupParticipantsList = await db
            .select({
              email: groupParticipants.email,
            })
            .from(groupParticipants)
            .leftJoin(hubs, eq(groupParticipants.hubId, hubs.id))
            .where(
              or(
                eq(groupParticipants.hubId, link.shared_details.group),
                eq(hubs.owner_email, userEmail)
              )
            );
  
          const groupParticipantsEmails = groupParticipantsList.map(
            (participant) => participant.email
          );
          groupParticipantsEmails.forEach((email) => targetedUsers.add(email));
  
          const message = `Link (${link.ref_name}) has been updated and shared with you by ${userEmail}`;
          notifyUsers(io, targetedUsers, message, data.id, link.shared_details.group);
        }
  
        // Insert shared data if exists
        if (sharedData.length > 0) {
          await db.insert(linkShareDetails).values(sharedData).returning();
        }
      } else {
        await db.delete(linkShareDetails).where(eq(linkShareDetails.linkId, linkId));
      }
  
      res.json({
        message: "Link updated successfully",
        data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  
  // Only for admin users
  getAllLinks: async (req, res) => {
    const { user } = req; // `user` is set by `requireAuth` middleware

    if (!user || !user.role.toLowerCase() === "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }

    const data = await db.select().from(links);

    if (!data || data.length === 0) {
        return res.status(404).json({ message: "No links found" });
    }

    const normalizedData = data.map((row) => ({
        id: row.id,
        url: row.url,
        ref_name: row.ref_name,
        description: row.description,
        category: row.category,
        session: row.session,
        semester: row.semester,
        email: row.owner_email,
    }))

    res.json(normalizedData);
  }
};

export default linkController;
