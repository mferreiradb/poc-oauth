import { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';

export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError | AxiosError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle Axios errors (from OAuth provider)
  if ('isAxiosError' in err && err.isAxiosError) {
    const axiosError = err as AxiosError;
    const statusCode = axiosError.response?.status || 500;
    const message = (axiosError.response?.data as any)?.error?.message || axiosError.message;

    console.error(`[BFF Error - OAuth Provider] ${statusCode}: ${message}`);

    return res.status(statusCode).json({
      success: false,
      error: {
        message,
        statusCode,
      },
    });
  }

  // Handle application errors
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[BFF Error] ${statusCode}: ${message}`);

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
    },
  });
};
