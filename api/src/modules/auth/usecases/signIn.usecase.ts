import { inject, injectable } from 'tsyringe';
import { AuthRepository } from '../repositories/auth.repository.js';
import { SignInInput } from '../models/auth.model.js';
import { UnauthorizedError } from '../../../shared/errors/AppError.js';
import { comparePassword } from '../../../shared/utils/index.js';

export interface SignInResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

@injectable()
export class SignInUseCase {
  constructor(
    @inject(AuthRepository) private authRepository: AuthRepository
  ) {}

  execute(input: SignInInput): SignInResponse {
    const user = this.authRepository.findUserByEmail(input.email);

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isValidPassword = comparePassword(input.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // TODO: Implement proper JWT token generation with OAuth
    const token = `mock_token_${user.id}_${Date.now()}`;

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
}
