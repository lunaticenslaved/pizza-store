import { getPizzaData, getPizzaList } from '@/entities/pizza';

import Content from '../_components/content';

// TODO: Add skeleton for pizzas list

export default async function Home() {
  const data = await getPizzaData();
  console.log(await getPizzaList().catch());

  return <Content {...data} />;
}
