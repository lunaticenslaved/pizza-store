'use client';

import { useState } from 'react';

import Link from 'next/link';

import { useCurrentUser } from '@/entities/viewer';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

export function GoToCartPaymentButton() {
  const user = useCurrentUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (user) {
    return (
      <Button asChild>
        <Link href="/payment">Заказать</Link>
      </Button>
    );
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] z-[100]">
          <DialogHeader>
            <DialogTitle>Войдите в аккаунт</DialogTitle>
            <DialogDescription>Войдите в аккаунт, чтобы сделать заказ</DialogDescription>
          </DialogHeader>
          <DialogFooter className="!justify-between">
            <DialogClose>Отмена</DialogClose>
            <Button asChild>
              <Link href={`/sign-in?redirectTo=/payment`}>Войти</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button onClick={() => setIsDialogOpen(true)}>Заказать</Button>
    </>
  );
}
