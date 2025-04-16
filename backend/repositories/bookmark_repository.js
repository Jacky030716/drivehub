import { db } from "../drizzle/drizzle.js";
import { bookmarks, links } from "../drizzle/schema.js";
import { and, eq } from "drizzle-orm";

const BookmarkRepository = {
  getBookmarksByUser: async (userEmail) => {
    return await db
      .select()
      .from(bookmarks)
      .innerJoin(links, eq(bookmarks.linkId, links.id))
      .where(eq(bookmarks.userEmail, userEmail));
  },

  createBookmark: async (userEmail, linkId) => {
    const existingBookmark = await db
      .select()
      .from(bookmarks)
      .where(
        and(eq(bookmarks.userEmail, userEmail), eq(bookmarks.linkId, linkId))
      );

    if (existingBookmark.length) {
      throw new Error("Bookmark already exists");
    }

    return await db.insert(bookmarks).values({ userEmail, linkId }).returning();
  },

  deleteBookmark: async (bookmarkId) => {
    return await db
      .delete(bookmarks)
      .where(eq(bookmarks.id, bookmarkId))
      .returning();
  },
};

export default BookmarkRepository;
