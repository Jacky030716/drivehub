import { eq } from "drizzle-orm";
import { db } from "../drizzle/drizzle.js";
import { hubs, users } from "../drizzle/schema.js";

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
      .where(eq(hubs.id, hubId));

    if (!data) {
      return res.status(404).json({
        message: "No hub found",
      });
    }

    const [normalizedData] = data.map((row) => ({
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
      data: normalizedData
    });
  }
};

export default hubsController;
