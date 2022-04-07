import { StatusCodes } from "http-status-codes";
import express from "express";
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

router.post("/user/:page/:count", async (req, res) => {
  const userId = (req as any).authUserId;
  const { page, count } = req.params;
  const { searchTerm } = req.body;
  try {
    const users = await userController.search(
      userId,
      searchTerm,
      Number(page),
      Number(count)
    );
    return res.json({ users });
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Ocorreu um erro interno buscando usuários.",
    });
  }
});

export default router;
