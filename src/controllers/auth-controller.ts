import { User } from "@prisma/client";
import userController from "./user-controller";

class AuthController {
  async signUp(user: User) {
    return await userController.create(user);
  }
}

export default new AuthController();
