'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import { schema } from '../schema';
import { DeliveryInfoFormValues } from '../types';

interface DeliveryInfoFormDialogProps {
  onSubmitted(): void;
}

export function DeliveryInfoFormDialog({ onSubmitted }: DeliveryInfoFormDialogProps) {
  const form = useForm<DeliveryInfoFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      address: '',
      phone: '',
      comment: '',
    },
  });

  const { handleSubmit, control } = form;

  function onSubmit(values: DeliveryInfoFormValues) {
    console.log(values);

    onSubmitted();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Добавить адрес</Button>
      </DialogTrigger>
      <Form {...form}>
        <DialogContent className="sm:max-w-[600px] z-[100]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Новый адрес</DialogTitle>
            </DialogHeader>

            <div className="my-8 space-y-8">
              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-0">
                    <FormLabel>Адрес</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-0">
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-0">
                    <FormLabel>Комментарий</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="!justify-between">
              <DialogClose>Отмена</DialogClose>
              <Button>Сохранить</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
