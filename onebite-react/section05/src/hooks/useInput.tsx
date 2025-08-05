import { useState } from 'react';

export default function useInput() {
  const [input, setInput] = useState('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return [input, onChangeHandler] as const;
}
