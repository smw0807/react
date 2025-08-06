import './TodoItem.css';
export interface Todo {
  id: number;
  isDone: boolean;
  content: string;
  date: number;
}

export default function TodoItem({ id, isDone, content, date }: Todo) {
  return (
    <div className="TodoItem">
      <input type="hidden" value={id} />
      <input readOnly type="checkbox" checked={isDone} />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button>삭제</button>
    </div>
  );
}
