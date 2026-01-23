import { inject, injectable } from 'tsyringe';
import { InMemoryDatabase, User } from '../../../services/database.js';

export interface IAuthRepository {
  findUserByEmail(email: string): User | undefined;
  createUser(user: User): User;
}

@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @inject('Database') private database: InMemoryDatabase
  ) {}

  findUserByEmail(email: string): User | undefined {
    return this.database.getUserByEmail(email);
  }

  createUser(user: User): User {
    return this.database.createUser(user);
  }
}
