import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import NotFound from './pages/NotFount';

import Header from './components/Header';
import Button from './components/Button';

function App() {
  return (
    <>
      {/* <Header
        title="Header"
        leftChild={
          <Button
            text="<"
            onClick={() => {
              console.log('123');
            }}
          />
        }
        rightChild={
          <Button
            text=">"
            onClick={() => {
              console.log('123');
            }}
          />
        }
      /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
