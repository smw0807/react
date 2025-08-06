import './TodoItem.css';
export interface Todo {
  id: number;
  isDone: boolean;
  content: string;
  date: number;
}

interface TodoItemProps extends Todo {
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({
  id,
  isDone,
  content,
  date,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  return (
    <div className="TodoItem">
      <input type="hidden" value={id} />
      <input
        readOnly
        type="checkbox"
        checked={isDone}
        onChange={() => onUpdate(id)}
      />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={() => onDelete(id)}>삭제</button>
    </div>
  );
}
