import { category } from "../drizzle/schema.js";
import { db } from "../drizzle/drizzle.js";
import { desc } from "drizzle-orm";

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
  },
  createCategory: async (req, res) => {
    try {
      const { userEmail, newCategory } = req.body;
      const { io } = req;

      if (!userEmail) {
        return res.status(400).json({ message: "Missing userEmail" });
      }
  
      const [data] = await db
        .insert(category)
        .values({
          name: newCategory
        })
        .returning();
              
      // Notifcation
      if(data){
        try {
          io.emit("notification", {
            userEmail,
            message: `New category created: ${newCategory}`,
          });
        } catch (emitError) {
          console.error("Socket.IO Emit Error:", emitError);
        }
      }
      
      res.status(200).json({
        data
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error"
      });
    }

  }
}

export default categoryController;