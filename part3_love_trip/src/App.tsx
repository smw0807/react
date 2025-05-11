import { BrowserRouter, Routes, Route } from 'react-router-dom'

import TestPage from '@pages/Test'
import HotelList from '@pages/HotelList'
import HotelPage from '@pages/Hotel'
import Signin from '@pages/Signin'
import My from '@pages/My'

import useLoadKakao from '@/hooks/useLoadKakao'

function App() {
  useLoadKakao()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/my" element={<My />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
