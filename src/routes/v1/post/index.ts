import { Post } from "@prisma/client";
import express from "express";
import { StatusCodes } from "http-status-codes";
import postController from "../../../controllers/post-controller";
import debug from "debug";

const log = debug("app:routes:post");

const router = express.Router();

router.post("/post", async (req, res) => {
  let post: Post = req.body;
  const userId = (req as any).authUserId;
  post.userId = userId;
  try {
    if ((post as any).test) {
      post.id = 1;
    } else {
      if ((post as any).test) {
        delete (post as any).test;
      }
      post = await postController.create(post);
    }
    return res.status(StatusCodes.CREATED).json({ post });
  } catch (e) {
    log(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message:
        "Ocorreu um erro interno ao tentar criar um post. Tente novamente mais tarde.",
    });
  }
});

export default router;
