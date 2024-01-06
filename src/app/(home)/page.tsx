import { getData } from '@/entities/pizza';

import Content from './_components/content';

// TODO: Add skeleton for pizzas list

export default async function Home() {
  const data = await getData();

  return <Content {...data} />;
}
