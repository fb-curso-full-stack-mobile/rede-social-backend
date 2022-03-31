import express from "express";
import { StatusCodes } from "http-status-codes";
import userController from "../../../controllers/user-controller";

const router = express.Router();

router.get("/user/me", async (req, res) => {
  const userId = (req as any).authUserId;
  const user = await userController.find(userId);
  if (user) {
    return res.json({ user });
  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Ocorreu um erro interno ao obter o usuário.",
    });
  }
});

export default router;
