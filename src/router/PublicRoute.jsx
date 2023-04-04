import { useAuth } from '../auth/hooks/useAuth'
import { Navigate } from 'react-router-dom'

export const PublicRoute = ({ children }) => {
  const { auth } = useAuth()
  return !auth._id ? children : <Navigate to={'/inicio'} />
}
