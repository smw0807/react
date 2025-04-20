import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAlertContext } from '@contexts/AlertContext'

import HomePage from '@pages/Home'
import CardPage from '@pages/Card'
import TestPage from '@pages/Test'
function App() {
  const { open } = useAlertContext()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route path="/test" Component={TestPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
