import BookmarkService from "../services/bookmark_service.js";

const bookmarkController = {
  getBookmarks: async (req, res) => {
    const { userEmail } = req.query;

    try {
      const data = await BookmarkService.getBookmarks(userEmail);
      res.json({ data });
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      res.status(400).json({ message: error.message });
    }
  },

  createBookmark: async (req, res) => {
    const { userEmail, linkId } = req.body;

    try {
      const data = await BookmarkService.createBookmark(userEmail, linkId);
      res.status(201).json({ data });
    } catch (error) {
      console.error("Error creating bookmark:", error);
      res.status(400).json({ message: error.message });
    }
  },

  deleteBookmark: async (req, res) => {
    const { bookmarkId } = req.params;

    try {
      const data = await BookmarkService.deleteBookmark(bookmarkId);
      res.json(data);
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      res.status(400).json({ message: error.message });
    }
  },
};

export default bookmarkController;
