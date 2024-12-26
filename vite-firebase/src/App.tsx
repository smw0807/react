import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
