import { Request, Response } from "express";
import { UserService } from "./user.service";
import { AuthenticatedRequest } from "../middlewares/auth";
import { CustomError } from "../errors/custom.error";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // getAllUsers = async (req: Request, res: Response) => {
  //   const id = req.user?.id;
  //   if (!id) {
  //     throw new CustomError("User Id not found", 400);
  //   }
  //   const user = await this.userService.findOne(id);

  //   res.status(200).json({ success: true, data: user });
  // };

  getProfile = async (req: AuthenticatedRequest, res: Response) => {
    const id = req.user?.id;
    if (!id) {
      throw new CustomError("User Id not found", 400);
    }
    const user = await this.userService.findOne(id);

    res.status(200).json({ success: true, data: user });
  };
}
