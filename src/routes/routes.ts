import express from "express";
import { authMiddleware } from "../middleware/user.middleware.js";
import { loginInController, signUpController, updateController } from "../controller/user.controller.js";

const app = express()

app.use(express.json());

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginInController);
router.put("/user", authMiddleware, updateController);

export default router;