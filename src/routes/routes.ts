import express from "express";
import { authMiddleware } from "../middleware/user.middleware.js";
import { loginInController, signUpController } from "../controller/user.controller.js";

const app = express()

app.use(express.json());

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginInController)

export default router;