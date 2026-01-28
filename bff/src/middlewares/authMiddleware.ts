import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { OAuthService } from '../services/oauthService.js';
import { UnauthorizedError } from '../shared/errors/AppError.js';

export interface AuthRequest extends Request {
  userId?: string;
  token?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError('No token provided');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedError('Invalid token format');
    }

    const oauthService = container.resolve(OAuthService);
    const isValid = await oauthService.validateToken(token);

    if (!isValid) {
      throw new UnauthorizedError('Invalid or expired token');
    }

    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};
