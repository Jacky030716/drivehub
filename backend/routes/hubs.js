import express from 'express';
import hubsController from "../controllers/hubsController.js"

const router = express.Router();

router.get('/', hubsController.getHubs)
router.get('/:hubId', hubsController.getHubDetail)

export default router;