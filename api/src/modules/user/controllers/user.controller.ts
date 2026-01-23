import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { GetDashboardUseCase } from '../usecases/getDashboard.usecase.js';
import { GetSettingsUseCase, UpdateSettingsUseCase } from '../usecases/settings.usecase.js';
import { updateSettingsSchema } from '../models/user.model.js';
import { ValidationError } from '../../../shared/errors/AppError.js';

export class UserController {
  static async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;

      const getDashboardUseCase = container.resolve(GetDashboardUseCase);
      const result = getDashboardUseCase.execute(userId);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;

      const getSettingsUseCase = container.resolve(GetSettingsUseCase);
      const result = getSettingsUseCase.execute(userId);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;

      const validation = updateSettingsSchema.safeParse(req.body);

      if (!validation.success) {
        throw new ValidationError(validation.error.errors[0].message);
      }

      const updateSettingsUseCase = container.resolve(UpdateSettingsUseCase);
      const result = updateSettingsUseCase.execute(userId, validation.data);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
