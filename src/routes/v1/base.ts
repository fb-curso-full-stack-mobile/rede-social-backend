import auth from "./auth";
import post from "./post";
import comment from "./comment";
import like from "./like";
import express from "express";
import { jwtMiddleware } from "../../middlewares/jwt-middleware";

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

export default router;
