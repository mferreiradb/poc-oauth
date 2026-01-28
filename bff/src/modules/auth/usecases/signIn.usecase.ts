import { inject, singleton } from 'tsyringe';
import { z } from 'zod';
import { OAuthService } from '../../../services/oauthService.js';
import { BadRequestError } from '../../../shared/errors/AppError.js';

const signInSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

@singleton()
export class SignInUseCase {
  constructor(
    @inject('OAuthService') private oauthService: OAuthService
  ) {}

  async execute(data: unknown) {
    const validation = signInSchema.safeParse(data);

    if (!validation.success) {
      throw new BadRequestError(validation.error.errors[0].message);
    }

    const { email, password } = validation.data;

    try {
      const result = await this.oauthService.signIn({ email, password });
      
      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      throw error;
    }
  }
}
