import { category, links } from "../drizzle/schema.js";
import { db } from "../drizzle/drizzle.js";
import { desc, eq } from "drizzle-orm";

const categoryController = {
  getCategory: async (req, res) => {
    const { categoryId } = req.params;
    const { user } = req;

    if (!user) {
      return res.status(400).json({ message: "Missing userEmail" });
    }

    if (!categoryId) {
      return res.status(400).json({ message: "Missing categoryId" });
    }

    const [data] = await db
      .select()
      .from(category)
      .where(
        eq(category.id, categoryId)
      );
        
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(data);
  },
  getCategories: async (req, res) => {
    const { user } = req;

    const data = await db.select().from(category).orderBy(desc(category.name));

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "No categories found",
      });
    }

    res.json({
      data,
    });
  },
  createCategory: async (req, res) => {
    try {
      const { newCategory } = req.body;
      const { user } = req;

      if (!user) {
        return res.status(400).json({ message: "Missing userEmail" });
      }

      const [data] = await db
        .insert(category)
        .values({
          name: newCategory,
        })
        .returning();

      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  editCategory: async (req, res) => {
    try {
      const { newCategory } = req.body;
      const { user } = req;

      if (!user) {
        return res.status(400).json({ message: "Missing user email" });
      }

      if (!newCategory.id) {
        return res.status(400).json({ message: "Missing categoryId" });
      }

      const [data] = await db
        .update(category)
        .set({
          name: newCategory.name,
        })
        .where(
          eq(category.id, newCategory.id)
        )
        .returning();

      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      res.json(data);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  deleteCategory: async (req, res) => {
    const { categoryId } = req.params;
    const { user } = req;

    if (!categoryId) {
      return res.status(400).json({ message: "Missing categoryId" });
    }

    if (!user) {
      return res.status(400).json({ message: "Missing userEmail" });
    }

    // Check if the category has associated with any links
    const linksData = await db
      .select()
      .from(links)
      .innerJoin(category, eq(links.category, category.name))
      .where(
        eq(category.id, categoryId)
      );
    
    if (linksData && linksData.length > 0) {
      return res.status(400).json({
        message: "This category cannot be deleted because it has associated links",
      });
    }
    
    const data = await db
      .delete(category)
      .where(
        eq(category.id, categoryId)
      )
      .returning();

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json({
      data,
    });
  },
};

export default categoryController;
