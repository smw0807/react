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
        {/* 인증이 필요하지 않은 페이지 */}
        <Route path="/login" element={<Login />} />

        {/* 인증이 필요한 페이지들 */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
