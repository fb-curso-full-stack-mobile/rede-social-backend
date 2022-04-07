import { StatusCodes } from "http-status-codes";
import debug from "debug";
import express from "express";
import friendController from "../../../controllers/friend-controller";

const log = debug("app:routes:friend");

const router = express.Router();

router.post("/friend/accept", async (req, res) => {
  const { friendId, accepted, test } = req.body;
  const userId = (req as any).authUserId;
  try {
    // if (test) {
    //   return res.json({ success: true, friend: {} });
    // }
    const result = await friendController.accept(userId, friendId, accepted);
    if (result) {
      return res.json({ success: true, friend: result });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Ocorreu um erro aceitando amizade.",
      });
    }
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Ocorreu um erro interno aceitando amizade.",
    });
  }
});

router.post("/friend", async (req, res) => {
  const { friendId, test } = req.body;
  const userId = (req as any).authUserId;
  try {
    if (test) {
      return res.json({ success: true, friend: {} });
    }
    const friend = await friendController.create(userId, friendId);
    if (friend) {
      return res.json({ success: true, friend });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Ocorreu um erro solicitando amizade.",
      });
    }
  } catch (e) {
    log(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Ocorreu um erro interno solicitando amizade.",
    });
  }
});

export default router;
