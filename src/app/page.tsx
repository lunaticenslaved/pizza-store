'use server';

import { getData } from './actions';
import Content from './content';

export default async function Home() {
  const data = await getData();

  return <Content {...data} />;
}
