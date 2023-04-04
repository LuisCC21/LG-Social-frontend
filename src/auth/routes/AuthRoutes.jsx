import { Route, Routes } from 'react-router-dom'
import { AuthLayout } from '../layouts/AuthLayout'
import {
  ConfirmarCuenta,
  Login,
  NuevoPassword,
  OlvidePassword,
  Registrar,
} from '../pages'
export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path='registrar' element={<Registrar />} />
        <Route path='olvide-password' element={<OlvidePassword />} />
        <Route path='olvide-password/:token' element={<NuevoPassword />} />
        <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
      </Route>
    </Routes>
  )
}
