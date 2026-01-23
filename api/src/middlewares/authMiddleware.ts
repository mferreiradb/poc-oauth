import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Authorization header is required',
        statusCode: 401,
      },
    });
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Invalid authorization format. Use: Bearer <token>',
        statusCode: 401,
      },
    });
  }

  // TODO: Implement token validation with OAuth
  // For now, just pass through with mock user
  (req as any).user = { id: 'mock-user-id', token };

  next();
};
