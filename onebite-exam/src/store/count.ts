import { create } from "zustand";
import {
  combine,
  subscribeWithSelector,
  persist,
  createJSONStorage,
  devtools,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useCountStore = create(
  devtools(
    persist(
      // 구독 기능
      subscribeWithSelector(
        // 불변성 유지
        immer(
          // 입력된 state를 기준으로 자동으로 타입을 추론해줌.
          combine(
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
      ),
      {
        name: "count",
        partialize: (state) => ({ count: state.count }),
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    {
      name: "count",
    },
  ),
);

useCountStore.subscribe(
  (state) => state.count,
  (count, prevCount) => {
    console.log("count changed : ", count, "prevCount : ", prevCount);
    // 현재 스토어 상태 가져오기
    const store = useCountStore.getState();
    // 스토어 상태 업데이트
    // useCountStore.setState({ count: store.count + 1 });
  },
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
