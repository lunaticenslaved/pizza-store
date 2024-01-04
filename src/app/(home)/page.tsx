import { getData } from '@/entities/pizza';

import Content from './content';

export default async function Home() {
  const data = await getData();

  return <Content {...data} />;
}
