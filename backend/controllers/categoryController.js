import { CategoryService } from "../services/category_service.js";

const categoryController = {
  getCategory: async (req, res) => {
    const { categoryId } = req.params;
    const { user } = req;
    if (!user) return res.status(400).json({ message: "Missing userEmail" });
    if (!categoryId)
      return res.status(400).json({ message: "Missing categoryId" });

    const data = await CategoryService.getCategoryById(categoryId);
    if (!data) return res.status(404).json({ message: "Category not found" });

    res.json(data);
  },

  getCategories: async (req, res) => {
    const { user } = req;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const data = await CategoryService.getAllCategoriesWithCount();
    if (!data || data.length === 0)
      return res.status(404).json({ message: "No categories found" });

    res.json({ data });
  },

  getCategoriesByUser: async (req, res) => {
    const { user } = req;
    const { role } = req.params;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (!role) return res.status(400).json({ message: "Missing role" });

    const data = await CategoryService.getCategoriesByRole(role);
    res.json({ data });
  },

  createCategory: async (req, res) => {
    try {
      const { newCategory } = req.body;
      const { user } = req;
      if (!user) return res.status(400).json({ message: "Missing userEmail" });

      const data = await CategoryService.createCategory(newCategory);
      res.status(200).json({ data });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  editCategory: async (req, res) => {
    try {
      const { newCategory } = req.body;
      const { user } = req;
      if (!user) return res.status(400).json({ message: "Missing user email" });
      if (!newCategory.id)
        return res.status(400).json({ message: "Missing categoryId" });

      const data = await CategoryService.updateCategory(
        newCategory.id,
        newCategory.name
      );
      if (!data) return res.status(404).json({ message: "Category not found" });

      res.json(data);
    } catch {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteCategory: async (req, res) => {
    const { categoryId } = req.params;
    const { user } = req;
    if (!categoryId)
      return res.status(400).json({ message: "Missing categoryId" });
    if (!user) return res.status(400).json({ message: "Missing userEmail" });

    try {
      const data = await CategoryService.deleteCategory(categoryId);
      res.json({ data });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default categoryController;
