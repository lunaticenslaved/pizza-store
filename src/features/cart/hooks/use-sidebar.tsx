'use client';

import { create } from 'zustand';

interface ICardSidebarStore {
  isSidebarOpen: boolean;
  openSidebar(): void;
  closeSidebar(): void;
}

export const useCartSidebar = create<ICardSidebarStore>(set => ({
  isSidebarOpen: false,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));
