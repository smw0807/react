import { createContext } from 'react';
import type { Todo } from '../components/TodoItem';

export const TodoStateContext = createContext<Todo[]>([]);
export const TodoDispatchContext = createContext<{
  onCreate: (content: string) => void;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}>({
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
});
