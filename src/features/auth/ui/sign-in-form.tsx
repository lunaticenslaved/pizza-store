'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { SignInRequest, signIn } from '../server-actions';
import { SignInSchema } from '../zod-schemas';

import { AuthCard, Message } from './auth-card';

type Values = SignInRequest;

export function SignInForm() {
  const form = useForm<Values>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { handleSubmit } = form;
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<Message>();

  const onSubmit = (data: Values) => {
    startTransition(() => {
      signIn(data)
        .then(data => {
          if (data.error) {
            setMessage({
              type: 'error',
              message: data.error,
            });
          } else {
            setMessage({
              type: 'success',
              message: 'Вы авторизованы',
            });
          }
        })
        .catch(() => {
          setMessage({
            type: 'error',
            message: 'Что-то пошло не так',
          });
        });
    });
  };

  return (
    <AuthCard
      title="Войти"
      redirectText="Ещё нет аккаунта?"
      redirectLinkText="Зарегистрироваться"
      redirectLink="/sign-up"
      message={message}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                    type="password"
                    autoComplete="false"
                  />
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
