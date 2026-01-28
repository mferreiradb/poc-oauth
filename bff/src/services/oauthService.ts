import { singleton, inject } from 'tsyringe';
import { HttpClient } from './httpClient.js';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
    };
    accessToken: string;
  };
}

@singleton()
export class OAuthService {
  constructor(
    @inject('HttpClient') private httpClient: HttpClient
  ) {}

  async signIn(credentials: SignInRequest): Promise<AuthResponse> {
    return this.httpClient.post<AuthResponse>('/auth/sign-in', credentials);
  }

  async signUp(userData: SignUpRequest): Promise<AuthResponse> {
    return this.httpClient.post<AuthResponse>('/auth/sign-up', userData);
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      this.httpClient.setAuthToken(token);
      const response = await this.httpClient.get<{ success: boolean }>('/auth/validate');
      return response.success;
    } catch (error) {
      return false;
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return this.httpClient.post<AuthResponse>('/auth/refresh', { refreshToken });
  }
}
