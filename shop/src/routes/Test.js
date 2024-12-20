import { useEffect, useState } from 'react';

export default function Test() {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(20);

  useEffect(() => {
    if (count !== 0 && count < 3) {
      setAge(age + 1);
    }
  }, [count]);
  return (
    <div>
      <h1>테스트</h1>
      <div>
        안녕하세요 전 {age} / {count}
      </div>
      <button onClick={() => setCount(count + 1)}>더하기</button>
    </div>
  );
}
