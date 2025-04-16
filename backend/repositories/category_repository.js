import { category, links } from "../drizzle/schema.js";
import { db } from "../drizzle/drizzle.js";
import { eq, desc, sql } from "drizzle-orm";

export const CategoryRepository = {
  findById: async (categoryId) => {
    const [data] = await db
      .select()
      .from(category)
      .where(eq(category.id, categoryId));
    return data;
  },

  findAllWithLinkCount: async () => {
    return await db
      .select({
        id: category.id,
        categoryName: category.name,
        linkCount: sql`count(${links.id})`.as("linkCount"),
      })
      .from(category)
      .leftJoin(links, eq(links.category, category.name))
      .groupBy(category.name, category.id)
      .orderBy(desc(category.name));
  },

  findAll: async () => {
    return await db.select().from(category).orderBy(desc(category.name));
  },

  create: async (name) => {
    const [data] = await db.insert(category).values({ name }).returning();
    return data;
  },

  update: async (id, name) => {
    const [data] = await db
      .update(category)
      .set({ name })
      .where(eq(category.id, id))
      .returning();
    return data;
  },

  delete: async (id) => {
    return await db.delete(category).where(eq(category.id, id)).returning();
  },

  hasAssociatedLinks: async (categoryId) => {
    const linksData = await db
      .select()
      .from(links)
      .innerJoin(category, eq(links.category, category.name))
      .where(eq(category.id, categoryId));
    return linksData.length > 0;
  },
};
