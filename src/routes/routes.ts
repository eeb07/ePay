import express from "express";
import { authMiddleware } from "../middleware/user.middleware.js";
import { filterController, loginInController, signUpController, updateController } from "../controller/user.controller.js";
import { accountBalance, transferMoney } from "../controller/account.controller.js";

const app = express()

app.use(express.json());

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginInController);
router.put("/user", authMiddleware, updateController);
router.get("/user/bulk", authMiddleware, filterController);
router.get("/balance", authMiddleware, accountBalance);
router.post("/transfer", authMiddleware, transferMoney);


export default router;