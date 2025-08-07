import './App.css';
import { useRef, useReducer, useCallback } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
import type { Todo } from './components/TodoItem';

function reducer(state: Todo[], action: { type: string; payload: Todo }) {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.payload];
    case 'UPDATE':
      return state.map((v) =>
        v.id === action.payload.id ? { ...v, isDone: !v.isDone } : v
      );
    case 'DELETE':
      return state.filter((v) => v.id !== action.payload.id);
    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  const onCreate = useCallback((content: string) => {
    dispatch({
      type: 'CREATE',
      payload: {
        id: idRef.current++,
        isDone: false,
        content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((id: number) => {
    dispatch({
      type: 'UPDATE',
      payload: {
        id,
      },
    });
  }, []);

  const onDelete = useCallback((id: number) => {
    dispatch({
      type: 'DELETE',
      payload: {
        id,
      },
    });
  }, []);
  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
