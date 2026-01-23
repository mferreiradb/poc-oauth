import { inject, injectable } from 'tsyringe';
import { InMemoryDatabase, User, UserSettings } from '../../../services/database.js';

export interface IUserRepository {
  findUserById(id: string): User | undefined;
  updateUser(id: string, data: Partial<User>): User | undefined;
  getSettings(userId: string): UserSettings | undefined;
  updateSettings(userId: string, data: Partial<UserSettings>): UserSettings | undefined;
}

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject('Database') private database: InMemoryDatabase
  ) {}

  findUserById(id: string): User | undefined {
    return this.database.getUserById(id);
  }

  updateUser(id: string, data: Partial<User>): User | undefined {
    return this.database.updateUser(id, data);
  }

  getSettings(userId: string): UserSettings | undefined {
    return this.database.getSettings(userId);
  }

  updateSettings(userId: string, data: Partial<UserSettings>): UserSettings | undefined {
    return this.database.updateSettings(userId, data);
  }
}
