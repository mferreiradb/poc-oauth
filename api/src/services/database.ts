import { singleton } from 'tsyringe';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

@singleton()
export class InMemoryDatabase {
  private users: Map<string, User> = new Map();
  private userSettings: Map<string, UserSettings> = new Map();

  // User methods
  createUser(user: User): User {
    this.users.set(user.id, user);
    // Create default settings
    this.userSettings.set(user.id, {
      userId: user.id,
      theme: 'light',
      language: 'pt-BR',
      notifications: true,
    });
    return user;
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  updateUser(id: string, data: Partial<User>): User | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...data, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  deleteUser(id: string): boolean {
    this.userSettings.delete(id);
    return this.users.delete(id);
  }

  // Settings methods
  getSettings(userId: string): UserSettings | undefined {
    return this.userSettings.get(userId);
  }

  updateSettings(userId: string, data: Partial<UserSettings>): UserSettings | undefined {
    const settings = this.userSettings.get(userId);
    if (!settings) return undefined;

    const updatedSettings = { ...settings, ...data };
    this.userSettings.set(userId, updatedSettings);
    return updatedSettings;
  }

  // Utility methods
  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  clear(): void {
    this.users.clear();
    this.userSettings.clear();
  }
}
