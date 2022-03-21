import { Like } from "@prisma/client";
import express from "express";
import { StatusCodes } from "http-status-codes";
import debug from "debug";
import likeController from "../../../controllers/like-controller";

const log = debug("app:routes:like");

const router = express.Router();

router.post("/like", async (req, res) => {
  let like: Like = req.body;
  try {
    if ((like as any).test) {
      like.id = 1;
    } else {
      like = await likeController.create(like);
    }
    return res.status(201).json({ like });
  } catch (e) {
    log(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message:
        "Ocorreu um erro interno ao tentar adicionar um like. Tente novamente mais tarde.",
    });
  }
});

export default router;
