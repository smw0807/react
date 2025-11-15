import "./App.css";

function App() {
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
      </div>
    </>
  );
}

export default App;
