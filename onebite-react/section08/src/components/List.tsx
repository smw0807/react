import './List.css';
import { useState, useMemo } from 'react';
import TodoItem from './TodoItem';
import type { Todo } from './TodoItem';

interface ListProps {
  todos: Todo[];
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function List({ todos, onUpdate, onDelete }: ListProps) {
  const [search, setSearch] = useState('');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search.length === 0) return todos;
    return todos.filter((v) =>
      v.content?.toLowerCase().includes(search.toLowerCase())
    );
  };

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter((v) => v.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <div>
        <div>total : {totalCount}</div>
        <div>done : {doneCount}</div>
        <div>not done : {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {getFilteredData().map((v) => {
          return (
            <TodoItem
              key={v.id}
              {...v}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}
