import { useCount } from "@/store/count";

export default function Viewer() {
  const count = useCount();
  return (
    <div>
      <h2>현재 카운트 : {count}</h2>
    </div>
  );
}
