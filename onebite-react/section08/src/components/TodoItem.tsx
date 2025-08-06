import './TodoItem.css';

export default function TodoItem() {
  return (
    <div className="TodoItem">
      <input type="checkbox" />
      <div className="content">Todo...</div>
      <div className="date">2025.08.06</div>
      <button>삭제</button>
    </div>
  );
}
