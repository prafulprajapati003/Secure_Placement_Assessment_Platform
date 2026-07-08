import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface ITokenPayload {
  userId: string;
  role: string;
}

/**

@param payload
@returns 
 */
export const generateToken = (payload: ITokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
};

/**
   @param token
   @returns 
 */
export const verifyToken = (token: string): ITokenPayload | null => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as ITokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
