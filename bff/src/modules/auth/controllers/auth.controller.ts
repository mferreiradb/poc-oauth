import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { SignInUseCase } from '../usecases/signIn.usecase.js';
import { SignUpUseCase } from '../usecases/signUp.usecase.js';

export class AuthController {
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const signInUseCase = container.resolve(SignInUseCase);
      const result = await signInUseCase.execute(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const signUpUseCase = container.resolve(SignUpUseCase);
      const result = await signUpUseCase.execute(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
