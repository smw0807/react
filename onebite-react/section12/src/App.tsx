import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import NotFound from './pages/NotFount';

import Header from './components/Header';
import Button from './components/Button';

function App() {
  return (
    <>
      <Header
        title="Header"
        leftChild={
          <Button
            text="123"
            onClick={() => {
              console.log('123');
            }}
          />
        }
        rightChild={
          <Button
            text="123"
            onClick={() => {
              console.log('123');
            }}
          />
        }
      />

      <Button
        text="123"
        onClick={() => {
          console.log('123');
        }}
      />
      <Button
        text="123"
        type="POSITIVE"
        onClick={() => {
          console.log('123');
        }}
      />
      <Button
        text="123"
        type="NEGATIVE"
        onClick={() => {
          console.log('123');
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/new" element={<New />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
