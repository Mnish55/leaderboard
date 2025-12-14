import { create } from 'zustand';

type CounterPropsTeam1 = {
  counterTeam1: number;
  setCounterTeam1: (value: number) => void;
  increaseCounterTeam1: () => void;
};

type ScorePropsTeam1 = {
  scoreTeam1: number;
  setScoreTeam1: (value: number) => void;
  increaseScoreTeam1: () => void;
  
};

export const useCounterTeam1 = create<CounterPropsTeam1>((set) => ({
  counterTeam1: 0,
  setCounterTeam1: (value: number) => set({ counterTeam1: value }),
  increaseCounterTeam1: () => set((state) => ({ counterTeam1: state.counterTeam1 + 1 })),
}));

export const useScoreTeam1 = create<ScorePropsTeam1>((set) => ({
  scoreTeam1: 0,
  setScoreTeam1: (value: number) => set({ scoreTeam1: value }),
  increaseScoreTeam1: () => set((state) => ({ scoreTeam1: state.scoreTeam1 + 1 })),
}));