import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../repositories/user.repository.js';
import { UpdateSettingsInput } from '../models/user.model.js';
import { NotFoundError } from '../../../shared/errors/AppError.js';
import { UserSettings } from '../../../services/database.js';

@injectable()
export class GetSettingsUseCase {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository
  ) {}

  execute(userId: string): UserSettings {
    const settings = this.userRepository.getSettings(userId);

    if (!settings) {
      throw new NotFoundError('Settings not found');
    }

    return settings;
  }
}

@injectable()
export class UpdateSettingsUseCase {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository
  ) {}

  execute(userId: string, input: UpdateSettingsInput): UserSettings {
    const settings = this.userRepository.updateSettings(userId, input);

    if (!settings) {
      throw new NotFoundError('Settings not found');
    }

    return settings;
  }
}
