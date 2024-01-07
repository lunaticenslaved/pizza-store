'use client';

import { useState } from 'react';

import { PizzaFilters } from '@/entities/pizza';
import { Button } from '@/shared/ui/button';
import { Sidebar } from '@/shared/ui/sidebar';

export function FiltersSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setIsOpen(true)}>
        Фильтры
      </Button>
      <Sidebar title="Фильтры" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <section>
          <h4 className="text-lg font-semibold mb-2">Пицца</h4>
          <PizzaFilters />
        </section>
      </Sidebar>
    </>
  );
}
