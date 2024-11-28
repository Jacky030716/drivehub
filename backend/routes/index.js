import express from "express"

const router = express.Router();

// All routes
import userRoutes from "./users.js"
import hubRoutes from "./hubs.js"
import linkRoutes from "./links.js"

router.use('/users', userRoutes);
router.use('/hubs', hubRoutes);
router.use('/links', linkRoutes);

export default router;