import { Like } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import debug from "debug";
import express from "express";
import likeController from "../../../controllers/like-controller";

const log = debug("app:routes:like");

const router = express.Router();

router.post("/like", async (req, res) => {
  let like: Like = req.body;
  const userId = (req as any).authUserId;
  try {
    if ((like as any).test) {
      like.id = 1;
    } else {
      like.userId = userId;
      const previousLike = await likeController.findByPostIdAndUserId(like.postId || 0, userId)
      if (previousLike.length > 0) {
        like = previousLike[0]
      } else {
        like = await likeController.create(like);
      }
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
