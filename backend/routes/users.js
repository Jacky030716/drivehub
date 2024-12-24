import express from "express"
import userController from "../controllers/userController.js"

const router = express.Router();

router.get('/', userController.getAllUsers)
router.get('/:email', userController.login)
router.post('/', userController.loginCreateUser)

export default router;