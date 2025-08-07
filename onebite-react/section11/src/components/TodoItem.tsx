import './TodoItem.css';
import { memo, useContext } from 'react';
import { TodoDispatchContext } from '../context/TodoContext';
export interface Todo {
  id: number;
  isDone?: boolean;
  content?: string;
  date?: number;
}

function TodoItem({ id, isDone, content, date }: Todo) {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);
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

export default memo(TodoItem);
