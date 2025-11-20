import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useCountStore = create(
  immer(
    combine(
      // 입력된 state를 기준으로 자동으로 타입을 추론해줌.
      {
        count: 0,
      },
      (set, get) => ({
        actions: {
          increase: () => {
            // set((state) => ({ count: state.count + 1 }));
            set((state) => {
              state.count += 1;
            });
          },
          decrease: () => {
            // set((state) => ({ count: state.count > 0 ? state.count - 1 : 0 }));
            set((state) => {
              state.count = state.count > 0 ? state.count - 1 : 0;
            });
          },
        },
      }),
    ),
  ),
);
// type Store = {
//   count: number;
//   actions: {
//     increase: () => void;
//     decrease: () => void;
//   };
// };

// export const useCountStore = create<Store>((set, get) => ({
//   count: 0,
//   actions: {
//     increase: () => {
//       // const count = get().count;
//       // set({ count: count + 1})
//       set((store) => ({ count: store.count + 1 }));
//     },
//     decrease: () => {
//       set((store) => ({ count: store.count - 1 }));
//     },
//   },
// }));

// 커스텀 훅
export const useCount = () => {
  const count = useCountStore((store) => store.count);
  return count;
};

export const useIncreaseCount = () => {
  const increase = useCountStore((store) => store.actions.increase);
  return increase;
};

export const useDecreaseCount = () => {
  const decrease = useCountStore((store) => store.actions.decrease);
  return decrease;
};
