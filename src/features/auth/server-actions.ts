'use server';

import { AuthError } from 'next-auth';
import { z } from 'zod';

import { signIn as authSignIn, signOut } from '@/auth';

import { SignInSchema } from './zod-schemas';

export type SignInRequest = z.infer<typeof SignInSchema>;

export async function signIn(data: SignInRequest, redirectTo?: string | null) {
  const { email, password } = data;

  try {
    await authSignIn('credentials', {
      email,
      password,
      redirectTo: redirectTo || '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Неверный логин или пароль' };
        default: {
          return { error: 'Что-то пошло не так' };
        }
      }
    }

    throw error;
  }

  return { success: true };
}

export async function signUp(data: unknown) {
  console.log('SIGN UP', JSON.stringify(data));
}

export async function logout() {
  await signOut();
}
