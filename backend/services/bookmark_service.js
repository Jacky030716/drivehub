import BookmarkRepository from "../repositories/bookmark_repository.js";

const BookmarkService = {
  getBookmarks: async (userEmail) => {
    if (!userEmail) {
      throw new Error("Missing email");
    }

    const data = await BookmarkRepository.getBookmarksByUser(userEmail);

    return data.map((row) => ({
      id: row.bookmarks.id,
      linkId: row.bookmarks.linkId,
      userEmail: row.bookmarks.userEmail,
      link: {
        id: row.links.id,
        url: row.links.url,
        name: row.links.ref_name,
        description: row.links.description,
        semester: row.links.semester,
        session: row.links.session,
        category: row.links.category,
        email: row.links.owner_email,
      },
    }));
  },

  createBookmark: async (userEmail, linkId) => {
    if (!userEmail || !linkId) {
      throw new Error("Missing required fields");
    }

    return await BookmarkRepository.createBookmark(userEmail, linkId);
  },

  deleteBookmark: async (bookmarkId) => {
    if (!bookmarkId) {
      throw new Error("Missing bookmarkId");
    }

    const deletedBookmark = await BookmarkRepository.deleteBookmark(bookmarkId);

    if (!deletedBookmark.length) {
      throw new Error("Bookmark not found");
    }

    return { message: "Bookmark deleted successfully" };
  },
};

export default BookmarkService;
