import * as jwt from "jsonwebtoken";

import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import userController from "./user-controller";
import { jwtGenerateToken } from "../middlewares/jwt-middleware";

class AuthController {
  async signUp(user: User) {
    return await userController.create(user);
  }

  async signIn(email: string, password: string) {
    const user = await userController.getUserByEmail(email);
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return jwtGenerateToken(user.id);
      }
    }
    return undefined;
  }
}

export default new AuthController();
