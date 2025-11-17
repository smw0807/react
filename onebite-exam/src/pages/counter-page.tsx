import { useCountStore } from "@/store/count";
import { Button } from "@/components/ui/button";
export default function CounterPage() {
  const { count, increase, decrease } = useCountStore();
  return (
    <div>
      <h1 className="text-2xl font-bold">Counter</h1>
      <h2>{count}</h2>
      <Button onClick={increase}>+</Button>
      <Button onClick={decrease}>-</Button>
    </div>
  );
}
