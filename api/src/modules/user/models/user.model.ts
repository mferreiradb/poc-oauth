import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
});

export const updateSettingsSchema = z.object({
  theme: z.enum(['light', 'dark']).optional(),
  language: z.string().min(2).optional(),
  notifications: z.boolean().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
