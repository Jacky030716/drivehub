import { category, users } from "../drizzle/schema.js";
import { db } from "../drizzle/drizzle.js";
import { desc, eq } from "drizzle-orm";

const categoryController = {
  getCategories: async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const data = await db
      .select()
      .from(category)
      .orderBy(desc(category.name))

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "No categories found",
      });
    }

    res.json({
      data
    });
  }
}

export default categoryController;