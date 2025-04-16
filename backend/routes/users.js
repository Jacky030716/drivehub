import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/authentication", userController.authenticateUser);
router.post("/", userController.loginCreateUser);
router.get("/:email", userController.login);

export default router;
