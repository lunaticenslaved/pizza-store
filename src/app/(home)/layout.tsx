import { PropsWithChildren } from 'react';

import { getPizzaData } from '@/entities/pizza';
import { TheHeader } from '@/widgets/the-header';
import { TheLayout } from '@/widgets/the-layout';

import { DataKeeper } from './_components/data-keeper';

export default async function HomeLayout({ children }: PropsWithChildren) {
  const pizzaData = await getPizzaData();

  return (
    <TheLayout
      header={
        <>
          <TheHeader withActions />
        </>
      }>
      <div className="bg-white h-full flex flex-col relative overflow-y-auto">
        <DataKeeper {...pizzaData}>{children}</DataKeeper>
      </div>
    </TheLayout>
  );
}
