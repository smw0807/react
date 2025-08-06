import './App.css';
import { useState, useRef } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
import type { Todo } from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const idRef = useRef(0);
  const onCreate = (content: string) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content,
      date: new Date().getTime(),
    };
    setTodos([...todos, newTodo]);
  };

  const onUpdate = (id: number) => {
    setTodos(todos.map((v) => (v.id === id ? { ...v, isDone: !v.isDone } : v)));
  };

  const onDelete = (id: number) => {
    setTodos(todos.filter((v) => v.id !== id));
  };
  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
