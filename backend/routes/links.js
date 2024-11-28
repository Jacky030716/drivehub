import express from "express";
import linkController from "../controllers/linkController.js";

const router = express.Router();

router.get('/', linkController.getLinks)
router.get('/:linkId', linkController.getLink); // http://localhost:3000/api/links/{linkId}
router.post('/', linkController.addLink);
router.delete('/:linkId', linkController.deleteLink); // http://localhost:3000/api/links/{linkId}
router.put('/:linkId', linkController.updateLink); // http://localhost:3000/api/links/{linkId}

export default router;