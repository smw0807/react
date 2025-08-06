import './App.css';
import { useState, useRef } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
import type { Todo } from './components/TodoItem';

const mockData: Todo[] = [
  {
    id: 0,
    isDone: false,
    content: 'React Study',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: 'React Study2',
    date: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(2);
  const onCreate = (content: string) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content,
      date: new Date().getTime(),
    };
    setTodos([...todos, newTodo]);
  };
  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} />
    </div>
  );
}

export default App;
