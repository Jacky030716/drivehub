import { and, eq } from "drizzle-orm";
import { db } from "../drizzle/drizzle.js";
import { hubs, users, links } from "../drizzle/schema.js";

const hubsController = {
  getHubs: async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const data = await db
      .select()
      .from(hubs)
      .innerJoin(users, eq(hubs.userId, users.id))
      .where(eq(users.id, userId));

    if (!data) {
      return res.status(404).json({
        message: "No hubs found",
      });
    }
  
    const normalizedData = data.map((row) => ({
      id: row.hubs.id,
      name: row.hubs.name,
      category: row.hubs.category,
      description: row.hubs.description,
      semester: row.hubs.semester,
      session: row.hubs.session,
      userId: row.hubs.userId,
      email: row.user.email,
      username: row.user.name
    }));

    res.json({
      data: normalizedData,
    });
  },
  getHubDetail: async (req, res) => {
    const { hubId } = req.params;

    if (!hubId) {
      return res.status(400).json({ message: "Missing hubId" });
    }

    const data = await db
      .select()
      .from(hubs)
      .innerJoin(users, eq(hubs.userId, users.id))
      .innerJoin(links, eq(links.hubId, hubs.id))
      .where(
        eq(hubs.id, hubId),
        eq(users.id, hubs.userId),
        eq(links.hubId, hubs.id)
      );

    if (!data) {
      return res.status(404).json({
        message: "No hub found",
      });
    }

    const hubLinks = data.map((row) => ({
      id: row.links.id,
      url: row.links.url,
      name: row.links.name,
      description: row.links.description,
      semester: row.links.semester,
      session: row.links.session,
      category: row.links.category
    }));

    const [normalizedData] = data.map((row) => ({
      id: row.hubs.id,
      name: row.hubs.name,
      category: row.hubs.category,
      description: row.hubs.description,
      semester: row.hubs.semester,
      session: row.hubs.session,
      userId: row.hubs.userId,
      email: row.user.email,
      username: row.user.name,
      links: hubLinks
    }));

    res.json({
      data: normalizedData
    });
  },
  createHub: async (req, res) => {
    const { userId, hub } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    if (!hub) {
      return res.status(400).json({ message: "Missing hub" });
    }

    const [data] = await db
      .insert(hubs)
      .values({
        userId,
        ...hub
      })
      .returning();

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
    const { userId } = req.query;
    const { hubId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    if (!hubId) {
      return res.status(400).json({ message: "Missing hubId" });
    }

    const data = await db
      .delete(hubs)
      .where(eq(hubs.id, hubId), eq(hubs.userId, userId))
      .returning({
        id: hubs.id
      });

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
    const { userId, hub } = req.body;
    const { hubId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
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
          eq(hubs.userId, userId),
          eq(hubs.id, hubId), 
        ) 
      )
      .returning();

    if (!data || !data.length) {
      return res.status(500).json({
        message: "Error editing hub"
      });
    }

    res.json({
      data
    });
  }
};

export default hubsController;
