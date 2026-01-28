import { inject, singleton } from 'tsyringe';
import { z } from 'zod';
import { OAuthService } from '../../../services/oauthService.js';
import { BadRequestError } from '../../../shared/errors/AppError.js';

const signUpSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

@singleton()
export class SignUpUseCase {
  constructor(
    @inject('OAuthService') private oauthService: OAuthService
  ) {}

  async execute(data: unknown) {
    const validation = signUpSchema.safeParse(data);

    if (!validation.success) {
      throw new BadRequestError(validation.error.errors[0].message);
    }

    const { email, password, name } = validation.data;

    try {
      const result = await this.oauthService.signUp({ email, password, name });
      
      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      throw error;
    }
  }
}
