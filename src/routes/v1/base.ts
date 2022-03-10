import auth from "./auth";
import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
  res.json({ success: true });
});

router.use(auth);

export default router;
