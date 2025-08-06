import './App.css';
import { useState, useRef } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';

interface Todo {
  id: number;
  isDone: boolean;
  content: string;
  date: number;
}

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
      <List />
    </div>
  );
}

export default App;
