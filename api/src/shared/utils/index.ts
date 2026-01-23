import { randomUUID } from 'crypto';

export const generateId = (): string => {
  return randomUUID();
};

export const hashPassword = (password: string): string => {
  // TODO: Implement proper password hashing with bcrypt
  // For now, just return the password as-is (NOT SECURE - only for POC)
  return `hashed_${password}`;
};

export const comparePassword = (password: string, hashedPassword: string): boolean => {
  // TODO: Implement proper password comparison with bcrypt
  return hashedPassword === `hashed_${password}`;
};
