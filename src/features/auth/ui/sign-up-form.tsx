'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { signUp } from '@/features/auth/server-actions';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { AuthCard } from './auth-card';

const SignUpSchema = z
  .object({
    email: z.string({ required_error: 'Введите e-mail' }).email('Неверный формат'),
    password: z.string().min(1, 'Введите пароль'),
    repeatPassword: z.string().min(1, 'Повторите пароль'),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.repeatPassword) {
      ctx.addIssue({
        path: ['repeatPassword'],
        code: z.ZodIssueCode.custom,
        message: `Пароли не совпадают`,
      });
      ctx.addIssue({
        path: ['password'],
        code: z.ZodIssueCode.custom,
        message: `Пароли не совпадают`,
      });
    }
  });

type Values = z.infer<typeof SignUpSchema>;

export function SignUpForm() {
  const form = useForm<Values>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });
  const { handleSubmit } = form;
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: Values) {
    startTransition(() => {
      signUp(values);
    });
  }

  return (
    <AuthCard
      title="Зарегистрироваться"
      redirectText="Уже есть аккаунт?"
      redirectLinkText="Войти"
      redirectLink="/sign-in">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="password" autoComplete="false" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Повторите пароль</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="password" autoComplete="false" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit" className="w-full">
            Зарегистрироваться
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
