import express from "express"
import userController from "../controllers/userController.js"

const router = express.Router();

router.get('/:email', userController.getUser)
router.post('/', userController.loginUser)

export default router;