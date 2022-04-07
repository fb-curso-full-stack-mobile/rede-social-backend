import auth from "./auth";
import comment from "./comment";
import express from "express";
import friend from "./friend";
import { jwtMiddleware } from "../../middlewares/jwt-middleware";
import like from "./like";
import post from "./post";
import user from "./user";

const router = express.Router();

router.get("/", (_, res) => {
  res.json({ success: true });
});

// rotas públicas
router.use(auth);
// verifico se está autenticado
router.use(jwtMiddleware);
// rotas privadas
router.use(post);
router.use(comment);
router.use(like);
router.use(user);
router.use(friend);

export default router;
