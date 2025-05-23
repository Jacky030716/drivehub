import express from "express"

const router = express.Router();

// All routes
import userRoutes from "./users.js"
import hubRoutes from "./hubs.js"
import linkRoutes from "./links.js"
import categoryRoutes from "./categories.js"
import bookmarkRoutes from "./bookmark.js"
import notificationRoutes from "./notification.js"
import adminRoutes from "./admin.js"

router.use('/users', userRoutes);
router.use('/hubs', hubRoutes);
router.use('/links', linkRoutes);
router.use('/categories', categoryRoutes);
router.use('/bookmarks',bookmarkRoutes)
router.use('/notifications', notificationRoutes)
router.use('/admin', adminRoutes)

export default router;