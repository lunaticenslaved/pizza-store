import { AddressList } from '@/features/delivery';

import { DeliveryInfoFormDialog } from './_client-components';

export default function AccountPage() {
  return (
    <div>
      <AddressList />
      <DeliveryInfoFormDialog />
    </div>
  );
}
