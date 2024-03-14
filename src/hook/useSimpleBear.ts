import { create } from "zustand";

type MyState = {
  bears: number;
  addABear: () => void;
};

export const useSimpleBearStore = create<MyState>((set, get) => ({
  bears: 0,
  addABear: () => set({ bears: get().bears + 1 }),
}));
