import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { SignInUseCase } from '../usecases/signIn.usecase.js';
import { SignUpUseCase } from '../usecases/signUp.usecase.js';
import { signInSchema, signUpSchema } from '../models/auth.model.js';
import { ValidationError } from '../../../shared/errors/AppError.js';

export class AuthController {
  static async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = signInSchema.safeParse(req.body);

      if (!validation.success) {
        throw new ValidationError(validation.error.errors[0].message);
      }

      const signInUseCase = container.resolve(SignInUseCase);
      const result = signInUseCase.execute(validation.data);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const validation = signUpSchema.safeParse(req.body);

      if (!validation.success) {
        throw new ValidationError(validation.error.errors[0].message);
      }

      const signUpUseCase = container.resolve(SignUpUseCase);
      const result = signUpUseCase.execute(validation.data);

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
