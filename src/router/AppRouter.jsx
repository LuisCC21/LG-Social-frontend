import { Routes, Route } from 'react-router-dom'

import { useAuth } from '../auth/hooks/useAuth'
import { Loader } from '../components/Loader'
import { PublicRoute } from './PublicRoute'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PrincipalRoutes } from '../principal/routes/PrincipalRoutes'

export const AppRouter = () => {
  const { auth } = useAuth()
  const token = localStorage.getItem('token')

  if (!auth._id && token) return <Loader />

  return (
    <Routes>
      <Route
        path='/auth/*'
        element={
          <PublicRoute>
            <AuthRoutes />
          </PublicRoute>
        }
      />
      <Route
        path='/*'
        element={
          <PrivateRoute>
            <PrincipalRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
