import express from 'express';
import hubsController from "../controllers/hubsController.js"

const router = express.Router();

router.get('/', hubsController.getHubs)

export default router;