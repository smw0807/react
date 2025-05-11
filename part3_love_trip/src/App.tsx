import { BrowserRouter, Routes, Route } from 'react-router-dom'

import TestPage from '@pages/Test'
import HotelList from '@pages/HotelList'
import HotelPage from '@pages/Hotel'
import Signin from '@pages/Signin'
import My from '@pages/My'
import AuthGuard from '@components/auth/AuthGuard'
import NavBar from '@shared/NavBar'

import useLoadKakao from '@/hooks/useLoadKakao'

function App() {
  useLoadKakao()
  return (
    <BrowserRouter>
      <AuthGuard>
        <NavBar />
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/hotel/:id" element={<HotelPage />} />
          <Route path="/my" element={<My />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  )
}

export default App
