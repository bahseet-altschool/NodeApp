import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import {JsonWebTokenError} from "jsonwebtoken";
export type tokenUser = {
  id: string,
  email: string,
  role: 'admin' | 'user' | string
}
export interface AuthenticatedRequest extends Request {
  user?: tokenUser;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({success: false, message: 'Access Denied'});
    return
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not set in the environment variables');
  }

  try {
    const user = jwt.verify(token, secret, {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
      algorithms: [process.env.JWT_ALGORITHM as jwt.Algorithm],
    })


    req.user = user as tokenUser
    next()
    return
  } catch (e: any) {
    if(e instanceof JsonWebTokenError) {
      res.status(401).json({success: false, message: `Error: ${e.message}`});
    }
    // res.status(401).json({success: false, message: 'Invalid Token'});
  }
};
