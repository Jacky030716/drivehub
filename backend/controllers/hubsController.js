import { and, desc, eq, or } from "drizzle-orm";
import { db } from "../drizzle/drizzle.js";
import { hubs, users, links, groupParticipants } from "../drizzle/schema.js";

const hubsController = {
  getHubs: async (req, res) => {
    const { userEmail } = req.query;
  
    if (!userEmail) {
      return res.status(400).json({ message: "Missing email!" });
    }
  
    try {
      const data = await db
        .select()
        .from(hubs)
        .innerJoin(users, eq(hubs.owner_email, users.email))
        .leftJoin(groupParticipants, eq(hubs.id, groupParticipants.hubId))
        .where(
          or(
            eq(users.email, userEmail),
            eq(groupParticipants.email, userEmail)
          )
        )
        .orderBy(desc(hubs.id));
  
      if (data.length === 0) {
        return res.json({ data: [] });
      }
  
      // Normalize the data by grouping hubs and their participants
      let normalizedData = data.reduce((acc, row) => {
        const existingHub = acc.find(hub => hub.id === row.hubs.id);
  
        if (existingHub) {
          // Add participant if it's not null and doesn't already exist
          if (row.group_participants?.email && !existingHub.participants.includes(row.group_participants.email)) {
            existingHub.participants.push(row.group_participants.email);
          }
        } else {
          // Create a new hub entry
          acc.push({
            id: row.hubs.id,
            name: row.hubs.name,
            description: row.hubs.description,
            semester: row.hubs.semester,
            session: row.hubs.session,
            userId: row.hubs.userId,
            createdAt: row.hubs.createdAt,
            email: row.user.email,
            username: row.user.name,
            participants: row.group_participants?.email ? [row.group_participants.email] : []
          });
        }
  
        return acc;
      }, []);

      normalizedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      res.json({
        data: normalizedData,
      });
    } catch (error) {
      console.error("Error fetching hubs:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },  
  getHubDetail: async (req, res) => {
    const { hubId } = req.params;
  
    if (!hubId) {
      return res.status(400).json({ message: "Missing hubId" });
    }
  
    try {
      const data = await db
        .selectDistinctOn([links.createdAt])
        .from(hubs)
        .innerJoin(users, eq(hubs.owner_email, users.email))
        .leftJoin(links, eq(links.hubId, hubs.id))
        .where(
          eq(hubs.id, hubId)
        )
        .orderBy(desc(links.createdAt));
  
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No group found" });
      }

      let sharedEmails = await db
        .select({
          email: groupParticipants.email
        })
        .from(groupParticipants)
        .where(
          eq(groupParticipants.hubId, hubId)
        );
      
      sharedEmails = sharedEmails.map(row => row.email);

  
      // Group links associated with the hub
      const hubLinks = data
        .filter(row => row.links?.id)
        .map(row => ({
          id: row.links.id,
          url: row.links.url,
          name: row.links.ref_name,
          email: row.links.owner_email,
          description: row.links.description,
          semester: row.links.semester,
          session: row.links.session,
          category: row.links.category,
        }));
  
      // Normalize hub details (taking the first row as reference)
      const {
        hubs: { id, name, description, semester, session, userId },
        user: { email, name: username },
      } = data[0];
  
      const normalizedData = {
        id,
        name,
        description,
        semester,
        session,
        userId,
        email,
        username,
        links: hubLinks,
        shared_email: sharedEmails
      };
  
      return res.json({ data: normalizedData });
    } catch (error) {
      console.error("Error fetching hub details:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  createHub: async (req, res) => {
    const { owner_email, hub } = req.body;

    if (!owner_email) {
      return res.status(400).json({ message: "Missing email" });
    }

    if (!owner_email) {
      return res.status(400).json({ message: "Missing hub" });
    }

    const [data] = await db
      .insert(hubs)
      .values({
        owner_email,
        ...hub
      })
      .returning();
    
    if (hub.shared_email){
      const shared_emails = hub.shared_email.split(",").map(email => email.trim());

      if (shared_emails.length > 0){
        const sharedData = shared_emails.map(email => ({
          hubId: data.id,
          email
        }));

        await db
          .insert(groupParticipants)
          .values(sharedData)
          .returning();
      }
    }

    if (!data) {
      return res.status(500).json({
        message: "Error creating hub"
      });
    }

    res.json({
      data
    });
  },
  deleteHub: async (req, res) => {
    const { userEmail } = req.query;
    const { hubId } = req.params;

    if (!userEmail) {
      return res.status(400).json({ message: "Missing email" });
    }

    if (!hubId) {
      return res.status(400).json({ message: "Missing hubId" });
    }

    const data = await db
      .delete(hubs)
      .where(eq(hubs.id, hubId), eq(hubs.owner_email, userEmail))
      .returning();

    if (!data) {
      return res.status(500).json({
        message: "Error deleting hub"
      });
    }

    res.json({
      data
    });
  },
  editHub: async (req, res) => {
    const { userEmail, hub } = req.body;
    const { hubId } = req.params;

    if (!userEmail) {
      return res.status(400).json({ message: "Missing email" });
    }

    if (!hubId) {
      return res.status(400).json({ message: "Missing hubId" });
    }

    if (!hub) {
      return res.status(400).json({ message: "Missing hub" });
    }

    const data = await db
      .update(hubs)
      .set({
        ...hub
      })
      .where(
        and(
          eq(hubs.owner_email, userEmail),
          eq(hubs.id, hubId), 
        ) 
      )
      .returning();

    if (!data || !data.length) {
      return res.status(500).json({
        message: "Error editing hub"
      });
    }

    if (hub.shared_email){
      const shared_emails = hub.shared_email.split(",").map(email => email.trim());

      await db
        .delete(groupParticipants)
        .where(eq(groupParticipants.hubId, hubId))
        .returning();

      if (shared_emails.length > 0){
        const sharedData = shared_emails.map(email => ({
          hubId: hubId,
          email
        }));

        await db
          .insert(groupParticipants)
          .values(sharedData)
          .returning();
      }
    }

    res.json({
      data
    });
  }
};

export default hubsController;
