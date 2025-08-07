import './TodoItem.css';
import { memo } from 'react';
export interface Todo {
  id: number;
  isDone?: boolean;
  content?: string;
  date?: number;
}

interface TodoItemProps extends Todo {
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoItem({
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
      <div className="date">{new Date(date!).toLocaleDateString()}</div>
      <button onClick={() => onDelete(id)}>삭제</button>
    </div>
  );
}

export default memo(TodoItem, (prevProps, nextProps) => {
  if (prevProps.id !== nextProps.id) {
    return false;
  }
  if (prevProps.isDone !== nextProps.isDone) {
    return false;
  }
  if (prevProps.content !== nextProps.content) {
    return false;
  }
  if (prevProps.date !== nextProps.date) {
    return false;
  }
  return true;
});
