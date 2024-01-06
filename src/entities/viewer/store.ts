'use client';

import { create } from 'zustand';

import { User } from './types';

interface IViewerStore {
  user?: User;
  setUser(value?: User): void;
}

export const useViewerStore = create<IViewerStore>(set => ({
  user: undefined,
  setUser: user => set({ user }),
}));

export function useViewerIsAuthorized() {
  const viewer = useViewerStore(s => s.user);
  return !!viewer;
}
