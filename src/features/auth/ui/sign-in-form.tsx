'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { signIn } from '../server-actions';

import { AuthCard } from './auth-card';

const SignInSchema = z.object({
  email: z.string({ required_error: 'Введите e-mail' }).email(),
  password: z.string({ required_error: 'Введите пароль' }),
});

type Values = z.infer<typeof SignInSchema>;

export function SignInForm() {
  const form = useForm<Values>({
    resolver: zodResolver(SignInSchema),
  });
  const { handleSubmit } = form;
  const [isPending, startTransition] = useTransition();

  return (
    <AuthCard
      title="Войти"
      redirectText="Ещё нет аккаунта?"
      redirectLinkText="Зарегистрироваться"
      redirectLink="/sign-up">
      <Form {...form}>
        <form onSubmit={handleSubmit(data => startTransition(() => signIn(data)))}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="ivan@mail.ru" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-12">
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="******" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit" className="w-full">
            Войти
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
