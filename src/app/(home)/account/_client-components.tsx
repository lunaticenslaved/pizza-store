import { useRouter } from 'next/navigation';

import { DeliveryInfoFormDialog as DeliveryInfoFormDialogBase } from '@/features/delivery';

export function DeliveryInfoFormDialog() {
  const router = useRouter();

  return <DeliveryInfoFormDialogBase onSubmitted={() => router.refresh()} />;
}
