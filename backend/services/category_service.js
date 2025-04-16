import { CategoryRepository } from "../repositories/category_repository.js";

export const CategoryService = {
  getCategoryById: async (categoryId) => {
    return await CategoryRepository.findById(categoryId);
  },

  getAllCategoriesWithCount: async () => {
    return await CategoryRepository.findAllWithLinkCount();
  },

  getCategoriesByRole: async (role) => {
    const all = await CategoryRepository.findAll();
    if (role.toLowerCase() === "student") {
      return all.filter(
        (c) => c.name !== "Course Files" && c.name !== "Course Coordination"
      );
    }
    return all;
  },

  createCategory: async (name) => {
    return await CategoryRepository.create(name);
  },

  updateCategory: async (id, name) => {
    return await CategoryRepository.update(id, name);
  },

  deleteCategory: async (id) => {
    const hasLinks = await CategoryRepository.hasAssociatedLinks(id);
    if (hasLinks) {
      throw new Error(
        "This category cannot be deleted because it has associated links"
      );
    }
    return await CategoryRepository.delete(id);
  },
};
