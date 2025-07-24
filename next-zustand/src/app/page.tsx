'use client';
import { useCountStore } from '@/store/count';
import { useStore } from 'zustand';

function IncrementButton() {
  const increment = useCountStore((state) => state.increment);
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={increment}
    >
      +
    </button>
  );
}

function DecrementButton() {
  const decrement = useCountStore((state) => state.decrement);
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={decrement}
    >
      -
    </button>
  );
}
export default function Home() {
  const count = useCountStore((state) => state.count);

  return (
    <div>
      <h1>Hello World : {count}</h1>
      <IncrementButton />
      <DecrementButton />
    </div>
  );
}
