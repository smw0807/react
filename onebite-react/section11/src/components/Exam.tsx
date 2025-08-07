import { useReducer } from 'react';
function reducer(state: number, action: { type: string; payload: number }) {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.payload;
    case 'DECREMENT':
      return state - action.payload;
    default:
      return state;
  }
}
export default function Exam() {
  const [state, dispatch] = useReducer(reducer, 0);

  const onClickPlus = () => {
    dispatch({
      type: 'INCREMENT',
      payload: 1,
    });
  };
  const onClickMinus = () => {
    dispatch({
      type: 'DECREMENT',
      payload: 1,
    });
  };
  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
}
