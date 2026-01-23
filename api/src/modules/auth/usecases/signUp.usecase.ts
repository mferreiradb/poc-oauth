import { inject, injectable } from 'tsyringe';
import { AuthRepository } from '../repositories/auth.repository.js';
import { SignUpInput } from '../models/auth.model.js';
import { ConflictError } from '../../../shared/errors/AppError.js';
import { generateId, hashPassword } from '../../../shared/utils/index.js';

export interface SignUpResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

@injectable()
export class SignUpUseCase {
  constructor(
    @inject(AuthRepository) private authRepository: AuthRepository
  ) {}

  execute(input: SignUpInput): SignUpResponse {
    const existingUser = this.authRepository.findUserByEmail(input.email);

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const userId = generateId();
    const hashedPassword = hashPassword(input.password);

    const user = this.authRepository.createUser({
      id: userId,
      email: input.email,
      name: input.name,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

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
