import express from "express"

const router = express.Router();

// All routes
import userRoutes from "./users.js"
import hubRoutes from "./hubs.js"
import linkRoutes from "./links.js"
import categoryRoutes from "./categories.js"
import bookmarkRoutes from "./bookmark.js"

router.use('/users', userRoutes);
router.use('/hubs', hubRoutes);
router.use('/links', linkRoutes);
router.use('/categories', categoryRoutes);
router.use('/bookmarks',bookmarkRoutes)

export default router;