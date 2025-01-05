import express from "express";
import linkController from "../controllers/linkController.js";
import requireAuth from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth); // This middleware will be executed for every route defined below

router.get('/links', linkController.getAllLinks); // http://localhost:3000/api/admin/links

export default router;