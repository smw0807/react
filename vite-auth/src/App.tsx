import './App.css';
import { Routes, Route } from 'react-router';

import DefaultLayout from './layouts/default';
import Home from './pages/Home';
import Login from './pages/Login';
import Board from './pages/Board';

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
