import { create } from 'zustand';



type StoreState = {
  count: number;
  increase: () => void;
  setCount: () => void;
};

type ManishStore = {
  countManish: number;
  setManish: () => void;
  increaseManish: () => void;
  
};

export const useStore = create<StoreState>((set) => ({
  count: 0,
  setCount: () => set({ count: 0 }),
  increase: () => set((state) => ({ count: state.count + 1 })),
}));

export const useManish = create<ManishStore>((set) => ({
  countManish: 0,
  setManish: () => set({ countManish: 0 }),
  increaseManish: () => set((state) => ({ countManish: state.countManish + 1 })),
}));