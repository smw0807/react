import { useState } from 'react';

export default function useLike() {
  const [like, setLike] = useState(0);
  function addLike() {
    setLike((like) => like + 1);
  }
  return [like, addLike];
}
