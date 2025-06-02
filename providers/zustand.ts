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

type CounterPropsTeam2 = {
  counterTeam2: number;
  setCounterTeam2: (value: number) => void;
  increaseCounterTeam2: () => void;
};

type ScorePropsTeam2 = {
  scoreTeam2: number;
  setScoreTeam2: (value: number) => void;
  increaseScoreTeam2: () => void;
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

export const useCounterTeam2 = create<CounterPropsTeam2>((set) => ({
  counterTeam2: 0,
  setCounterTeam2: (value: number) => set({ counterTeam2: value }),
  increaseCounterTeam2: () => set((state) => ({ counterTeam2: state.counterTeam2 + 1 })),
}));

export const useScoreTeam2 = create<ScorePropsTeam2>((set) => ({
  scoreTeam2: 0,
  setScoreTeam2: (value: number) => set({ scoreTeam2: value }),
  increaseScoreTeam2: () => set((state) => ({ scoreTeam2: state.scoreTeam2 + 1 })),
}));