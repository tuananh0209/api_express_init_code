import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/", userController.getUser);
router.post("/", userController.createUser);
router.patch("/", userController.updateUser);
router.delete("/", userController.deleteUser);

export default router