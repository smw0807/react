import './App.css';
import { useState, useEffect, useRef } from 'react';
import Viewer from './components/Viewer';
import Controller from './components/Controller';
import Even from './components/Even';

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
  const isMount = useRef(false);

  // 1. 마운트 : 탄생
  useEffect(() => {
    // 컴포넌트가 화면에 나타났을 때 실행
    console.log('mount');
  }, []);

  // 2. 업데이트 : 변화, 리렌더링
  useEffect(() => {
    // 컴포넌트가 리렌더링 될 때 실행
    //
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    console.log('update');
  });

  // 3. 언마운트 : 소멸

  useEffect(() => {
    console.log(`count changed : ${count} / input changed : ${input}`);
  }, [count, input]);

  return (
    <div className="App">
      <h1>Simple Counter</h1>

      <section>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
      </section>

      <section>
        <Viewer count={count} />
        {count % 2 === 0 ? <Even /> : null}
      </section>

      <section>
        <Controller count={count} setCount={setCount} />
      </section>
    </div>
  );
}

export default App;
