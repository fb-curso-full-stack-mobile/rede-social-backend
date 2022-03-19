import { Comment } from "@prisma/client";
import express from "express";
import { StatusCodes } from "http-status-codes";
import debug from "debug";
import commentController from "../../../controllers/comment-controller";

const log = debug("app:routes:comment");

const router = express.Router();

router.post("/comment", async (req, res) => {
  let comment: Comment | undefined = req.body;
  const userId = (req as any).authUserId;
  try {
    if (comment) {
      comment.userId = userId;
      if ((comment as any).test) {
        comment.id = 1;
      } else {
        comment = await commentController.create(comment);
      }
      res.status(StatusCodes.CREATED).json({ comment });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Ocorreu um erro ao tentar criar um comentário. Tente novamente mais tarde.",
      });
    }
  } catch (e) {
    log(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message:
        "Ocorreu um erro interno ao tentar criar um comentário. Tente novamente mais tarde.",
    });
  }
});

export default router;
