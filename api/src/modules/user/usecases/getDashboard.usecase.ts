import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../repositories/user.repository.js';
import { NotFoundError } from '../../../shared/errors/AppError.js';

export interface DashboardResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  stats: {
    memberSince: Date;
    lastUpdated: Date;
  };
}

@injectable()
export class GetDashboardUseCase {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository
  ) {}

  execute(userId: string): DashboardResponse {
    const user = this.userRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      stats: {
        memberSince: user.createdAt,
        lastUpdated: user.updatedAt,
      },
    };
  }
}
