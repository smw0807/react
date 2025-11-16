import "./App.css";
import { Button } from "@/components/ui/button";
import { cn } from "./lib/utils";

function App() {
  const isActive = true;
  return (
    <>
      <div>
        {/* 1. 타이포그래피 */}
        <div className="text-xs text-red-500">text-xs</div>
        <div className="text-sm text-[rgb(100,30,200)]">text-sm</div>
        <div className="text-base font-bold">text-base</div>
        <div className="text-lg font-extrabold">text-lg</div>
        <div className="text-xl font-black">text-xl</div>
        <div className="text-2xl">text-2xl</div>
        <div className="text-[13px]">text-[13px]</div>
        <div className="text-3xl">text-3xl</div>
        <div className="text-4xl">text-4xl</div>
        <div className="text-5xl">text-5xl</div>
        <div className="text-6xl">text-6xl</div>
        <div className="text-7xl">text-7xl</div>
        <div className="text-8xl">text-8xl</div>
        <div className="text-9xl">text-9xl</div>

        {/* 2. 백그라운드컬러 */}
        <div className="bg-amber-500">bg-amber-500</div>
        <div className="bg-red-500">bg-red-500</div>
        <div className="bg-blue-500">bg-blue-500</div>
        <div className="bg-green-500">bg-green-500</div>
        <div className="bg-yellow-500">bg-yellow-500</div>
        <div className="bg-purple-500">bg-purple-500</div>
        <div className="bg-pink-500">bg-pink-500</div>
        <div className="bg-gray-500">bg-gray-500</div>
        <div className="bg-black-500">bg-black-500</div>

        {/* 3. 사이즈 */}
        <div className="h-20 w-20 bg-black">box</div>
        <div className="w-40 bg-black">box</div>
        <div className="w-60 bg-black">box</div>
        <div className="w-80 bg-black">box</div>
        <div className="w-100 bg-black">box</div>
        <div className="w-120 bg-black">box</div>
        <div className="w-140 bg-black">box</div>
        <div className="w-160 bg-black">box</div>
        <div className="w-180 bg-black">box</div>
        <div className="w-200 bg-black">box</div>
        <div className="w-[20px] bg-black">box</div>
        <div className="w-full bg-black">box</div>

        {/* 4. 여백 */}
        <div className="m-5 h-50 w-50 bg-red-400 p-5">
          <div className="h-full w-full justify-center bg-blue-400">box</div>
        </div>

        {/* 5. 보더 */}
        <div className="m-5 p-5">
          <div className="border border-black">box</div>
          <div className="mb-5 border-2 border-black">box</div>
          <div className="border-x border-red-500">box</div>
          <div className="border-y border-green-500">box</div>
          <div className="border-t border-yellow-500">box</div>
          <div className="border-b border-purple-500">box</div>
          <div className="border-l border-orange-500">box</div>
          <div className="border-r border-blue-500">box</div>
          <div className="border-tl border-red-500">box</div>
          <div className="border-tr border-green-500">box</div>
        </div>

        {/* 6. 플렉스 컨테이터 */}
        <div className="flex items-center justify-evenly">
          <div className="h-10 w-10 flex-1 border">1</div>
          <div className="h-20 w-10 border">2</div>
          <div className="h-30 w-10 border">3</div>
          <div className="h-40 w-10 border">4</div>
        </div>
        <div className="flex flex-col items-center justify-evenly">
          <div className="h-10 w-10 border">1</div>
          <div className="h-20 w-10 border">2</div>
          <div className="h-30 w-10 border">3</div>
          <div className="h-40 w-10 border">4</div>
        </div>
      </div>

      <Button>Click me</Button>
      <Button variant="outline">Click me</Button>
      <Button variant="secondary">Click me</Button>
      <Button variant="ghost">Click me</Button>
      <Button variant="link">Click me</Button>
      <Button variant="destructive">Click me</Button>
      <Button variant="outline">Click me</Button>
      <Button variant="secondary">Click me</Button>
      <Button variant="ghost">Click me</Button>
      <Button variant="link">Click me</Button>

      <div>
        <div className={cn("text-primary", isActive && "animate-pulse")}>
          text-primary
        </div>
        <div className="text-secondary">text-secondary</div>
        <div className="text-accent">text-accent</div>
        <div className="text-destructive">text-destructive</div>
        <div className="text-foreground">text-foreground</div>
        <div className="text-muted">text-muted</div>
        <div className="text-muted-foreground">text-muted-foreground</div>
        <div className="text-card">text-card</div>
      </div>
    </>
  );
}

export default App;
