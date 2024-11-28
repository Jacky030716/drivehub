import express from "express";
import linkController from "../controllers/linkController.js";

const router = express.Router();

router.get('/', linkController.getLinks)
router.post('/', linkController.addLink);

export default router;