import * as jwt from "jsonwebtoken";

import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import userController from "./user-controller";

class AuthController {
  async signUp(user: User) {
    return await userController.create(user);
  }

  async signIn(email: string, password: string) {
    const user = await userController.getUserByEmail(email);
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET || "secret",
          {
            expiresIn: "1h",
          }
        );
        return token;
      }
    }
    return undefined;
  }
}

export default new AuthController();
