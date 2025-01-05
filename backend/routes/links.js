import express from "express";
import linkController from "../controllers/linkController.js";
import requireAuth from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth); // This middleware will be executed for every route defined below

router.get('/:linkId', linkController.getLink); // http://localhost:3000/api/links/{linkId}
router.post('/', linkController.addLink);
router.delete('/:linkId', linkController.deleteLink); // http://localhost:3000/api/links/{linkId}
router.put('/:linkId', linkController.updateLink); // http://localhost:3000/api/links/{linkId}
router.get('/', linkController.getLinks)

export default router;