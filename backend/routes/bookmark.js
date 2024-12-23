import express from 'express';
import bookmarkController from "../controllers/bookmarkController.js";
import requireAuth from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);

router.get('/', bookmarkController.getBookmarks); // Get all bookmarks for a user
router.post('/', bookmarkController.createBookmark); // Add a new bookmark
router.delete('/:bookmarkId', bookmarkController.deleteBookmark); // Delete a specific bookmark

export default router;
