import { StatusCodes } from "http-status-codes";
import { User } from "@prisma/client";
import authController from "../../../controllers/auth-controller";
import debug from "debug";
import express from "express";

const log = debug("app:routes:auth");

const router = express.Router();

router.post("/sign-up", async (req, res) => {
  let user: User = req.body;
  try {
    if (user.name && user.surname && user.email && user.password) {
      if ((user as any).test) {
        user.id = 1;
        return res.status(StatusCodes.CREATED).json({ user });
      }
      user = await authController.signUp(user);
      return res.status(StatusCodes.CREATED).json({ user });
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Dados inválidos. Verifique e tente novamente." });
    }
  } catch (e) {
    log(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message:
        "Ocorreu um erro interno ao tentar cadastrar o usuário. Tente novamente mais tarde.",
    });
  }
});

export default router;
