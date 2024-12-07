import express from 'express';
import hubsController from "../controllers/hubsController.js"
import requireAuth from "../middleware/auth.js"

const router = express.Router();

router.use(requireAuth)

router.get('/', hubsController.getHubs)
router.get('/:hubId', hubsController.getHubDetail)
router.post('/', hubsController.createHub)
router.delete('/:hubId', hubsController.deleteHub)
router.put('/:hubId', hubsController.editHub)

export default router;