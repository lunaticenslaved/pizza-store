import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string({ required_error: 'Введите e-mail' }).email(),
  password: z.string({ required_error: 'Введите пароль' }),
});
