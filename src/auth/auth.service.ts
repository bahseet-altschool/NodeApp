import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {User} from "../entities/user";
import {CustomError} from "../errors/custom.error";
import {tokenUser} from "../middlewares/auth";

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(email: string, password: string): Promise<{ token: string; refreshToken: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new CustomError('Invalid credentials', 401);
    }
    const payload: tokenUser = { id: user.id, email: user.email, role: user.role };
    return {token: await this.generateToken(payload), refreshToken: await this.generateRefreshToken(payload)}
  }

  async signup(name: string, email: string, password: string, role: string): Promise<User> {
    const isExistingEmail = await this.userService.findByEmail(email);

    if(isExistingEmail) {
      throw new CustomError('Email address already exists', 409);
    }

    return this.userService.createUser(name.toLowerCase(), email.toLowerCase(), password, role);
  }

  async generateToken(payload: tokenUser): Promise<string> {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET is not set in the environment variables');
    }

    return jwt.sign(payload, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
      algorithm: process.env.JWT_ALGORITHM as jwt.Algorithm || 'HS256',
    });
  }

  async generateRefreshToken(payload: object): Promise<string> {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET is not set in the environment variables');
    }

    return jwt.sign(payload, secret, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '1h',
      issuer: process.env.JWT_ISSUER,
      // subject: payload?.id,
      audience: process.env.JWT_AUDIENCE,
      algorithm: process.env.JWT_ALGORITHM as jwt.Algorithm || 'HS256',
    });
  }
}
