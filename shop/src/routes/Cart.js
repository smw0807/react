import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Cart() {
  const cartStore = useSelector((state) => state.cartStore);

  return (
    <div>
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
  return (
    <tr>
      <td>{props.item.id}</td>
      <td>{props.item.name}</td>
      <td>{props.item.count}</td>
      <td>
        <button>+</button>
        <button>-</button>
      </td>
    </tr>
  );
}
