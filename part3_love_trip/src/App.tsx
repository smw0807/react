import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import AuthGuard from '@components/auth/AuthGuard'
import NavBar from '@shared/NavBar'

import useLoadKakao from '@/hooks/useLoadKakao'

const PrivateRoute = lazy(() => import('@components/auth/PrivateRoute'))
const TestPage = lazy(() => import('@pages/Test'))
const HotelList = lazy(() => import('@pages/HotelList'))
const HotelPage = lazy(() => import('@pages/Hotel'))
const My = lazy(() => import('@pages/My'))
const Signin = lazy(() => import('@pages/Signin'))
const SettingsPage = lazy(() => import('@pages/settings'))
const LikePage = lazy(() => import('@pages/settings/like'))
const SchedulePage = lazy(() => import('@pages/Schedule'))
const ReservationPage = lazy(() => import('@pages/Reservation'))
const ReservationDonePage = lazy(() => import('@pages/ReservationDone'))
const ReservationListPage = lazy(() => import('@pages/ReservationList'))

function App() {
  useLoadKakao()
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthGuard>
          <NavBar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HotelList />} />
              <Route path="/hotel/:id" element={<HotelPage />} />
              <Route
                path="/my"
                element={
                  <PrivateRoute>
                    <My />
                  </PrivateRoute>
                }
              />
              <Route path="/signin" element={<Signin />} />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <SettingsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings/like"
                element={
                  <PrivateRoute>
                    <LikePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/schedule"
                element={
                  <PrivateRoute>
                    <SchedulePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation"
                element={
                  <PrivateRoute>
                    <ReservationPage />
                  </PrivateRoute>
                }
              />
              <Route path="/test" element={<TestPage />} />
              <Route
                path="/reservation/done"
                element={
                  <PrivateRoute>
                    <ReservationDonePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/reservation/list"
                element={
                  <PrivateRoute>
                    <ReservationListPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </AuthGuard>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
