import create from 'zustand';

export type State = {
  queryName: string;
  setQueryName: (queryName: string) => void;
};

export const useStore = create<State>()((set) => ({
  queryName: '',
  setQueryName: (queryName: string) => set((state) => ({ queryName })),
}));
