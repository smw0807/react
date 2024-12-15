import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addAge, addCount, minusCount, removeItem } from '../store';
import { memo, useState } from 'react';
export default function Cart() {
  const cartStore = useSelector((state) => state.cartStore);
  const userStore = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  // dispatch(addName('minwoo'));
  const [count, setCount] = useState(0);
  return (
    <div>
      <h6>
        {userStore.name}({userStore.age})의 장바구니
      </h6>
      <Child count={count} />
      <button onClick={() => setCount(count + 1)}>++</button>
      <button onClick={() => dispatch(addAge())}>더하기</button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cartStore.map((v, i) => {
            return <CartItem key={i} item={v} />;
          })}
        </tbody>
      </Table>
    </div>
  );
}

function CartItem(props) {
  const dispatch = useDispatch();
  return (
    <tr>
      <td>{props.item.id}</td>
      <td>{props.item.name}</td>
      <td>{props.item.count}</td>
      <td>
        <button onClick={() => dispatch(addCount(props.item.id))}>+</button>
        <button onClick={() => dispatch(minusCount(props.item.id))}>-</button>
        <button onClick={() => dispatch(removeItem(props.item.id))}>
          삭제
        </button>
      </td>
    </tr>
  );
}

//props 변경시 재랜더링
const Child = memo(() => {
  console.log('재랜더링됨');
  return <div>자식임</div>;
});
