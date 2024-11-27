import express from "express"

const router = express.Router();

// All routes
import userRoutes from "./users.js"
import hubRoutes from "./hubs.js"

router.use('/users', userRoutes);
router.use('/hubs', hubRoutes);

export default router;