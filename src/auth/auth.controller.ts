import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const tokens = await this.authService.login(email, password);
      res.status(200).json({ success: true, data: tokens });
  };


  signup = async (req: Request, res: Response) => {
      const { name, email, password, role } = req.body;
      const user = await this.authService.signup(name,email, password, role);
      res.status(201).json({success: true, data:user});

  };
}
