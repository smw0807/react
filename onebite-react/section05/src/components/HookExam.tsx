// Hooks
// 1. 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능
// 2. 조건부로 호출될 수 없다.
// 3. 커스텀 훅을 직접 만들 수 있다.

import useInput from '../hooks/useInput';

export default function HookExam() {
  const [input, onChangeHandler] = useInput();

  return (
    <div>
      <input onChange={onChangeHandler} value={input} />
    </div>
  );
}
