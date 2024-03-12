import { create } from "zustand";
import { persist } from "zustand/middleware";
//persist是zustand提供的中间件用来将状态持久化存储

type UserInfo = {
  name: string;
};

type BearType = {
  bears: number;
  switch: boolean;
  user: UserInfo;
  increasePopulation: () => void;
  removeAllBears: () => void;
  changeSwitch: () => void;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
};

export const useBearStore = create<BearType>()(
  persist(
    (set, get) => ({
      bears: 0,
      switch: false,
      user: {} as UserInfo,
      // zustand的推荐写法，提供了更好的类型推断能力
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
      changeSwitch: () => set((state) => ({ switch: !state.switch })),
      setUser: (user: UserInfo) => set((state) => ({ ...state, user })),
      clearUser: () => set((state) => ({ ...state, user: { name: "" } })),
    }),
    { name: "bears" }
  )
);

/**
 *comment state的
1.(state) => ({ bears: state.bears + 1 }):
这种写法使用了对象字面量语法，并且整个对象字面量被包裹在圆括号中。在 zustand 的 set 函数中使用这种写法时，set 函数会接收到一个对象，这个对象描述了状态的更新。这种方式是 zustand 推荐的，因为它提供了更好的类型推断和不可变性。

2.(state) => { bears: state.bears + 1 }:
这种写法没有使用圆括号包裹对象字面量。在 zustand 中，如果你直接传递一个对象给 set 函数，zustand 会将其视为一个更新描述对象，这与第一种方式的意图相同。然而，如果没有圆括号，这可能会导致 TypeScript 无法正确推断出返回值的类型，从而可能需要显式类型注解。

在 zustand 的 set 函数中，通常推荐使用第一种方式，因为它提供了更清晰的意图和更好的类型推断。下面是一个在 zustand store 中使用第一种方式的例子：

import create from 'zustand';

interface BearState {
  bears: number;
}

const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));

export default useBearStore;
在这个例子中，increase 方法使用第一种方式来更新状态，这是 zustand 的标准做法。如果你尝试使用第二种方式，你可能会遇到类型推断的问题，除非你显式地指定了返回值的类型。 
*/
