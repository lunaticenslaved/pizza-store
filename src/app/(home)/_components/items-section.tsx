import { PropsWithChildren } from 'react';

interface ItemsSectionProps extends PropsWithChildren {
  id: string;
  title: string;
}

export function ItemsSection({ id, title, children }: ItemsSectionProps) {
  return (
    <section id={id} className="sm:px-10 px-6 mt-6 scroll-mt-10 mb-12 last:mb-0">
      <h3 className="font-bold text-xl">{title}</h3>
      <div className="flex flex-wrap justify-between py-8">{children}</div>
    </section>
  );
}
