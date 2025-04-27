import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from '@pages/Home'
import CardPage from '@pages/Card'
import TestPage from '@pages/Test'
import SigninPage from '@pages/Signin'
import SignupPage from '@pages/Signup'
import ApplyPage from '@pages/Apply'
import ApplyDonePage from '@pages/ApplyDone'

import ScrollToTop from '@shared/ScrollToTop'
import NavBar from '@shared/NavBar'

import PrivateRoute from '@components/auth/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/signin" Component={SigninPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <ApplyPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDonePage />
            </PrivateRoute>
          }
        />
        <Route path="/test" Component={TestPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
