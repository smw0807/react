import { Button } from "../ui/button";
import { useDecreaseCount, useIncreaseCount } from "@/store/count";

export default function Controller() {
  // 불필요한 리렌더링 방지, 셀렉터 함수
  // const increase = useCountStore((store) => store.increase);
  // const decrease = useCountStore((store) => store.decrease);
  // const { increase, decrease } = useCountStore((store) => store.actions);
  const increase = useIncreaseCount();
  const decrease = useDecreaseCount();
  return (
    <div>
      <Button onClick={increase}>+</Button>
      <Button onClick={decrease}>-</Button>
    </div>
  );
}
