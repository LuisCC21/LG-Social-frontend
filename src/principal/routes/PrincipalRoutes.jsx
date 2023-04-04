import { Navigate, Route, Routes } from 'react-router-dom'
import { Inicio, Perfil, Publicacion } from '../pages'
export const PrincipalRoutes = () => {
  return (
    <Routes>
      <Route path='inicio' element={<Inicio />} />
      <Route path='perfil/:id' element={<Perfil />} />
      <Route path='post/:id' element={<Publicacion />} />
      <Route path='/*' element={<Navigate to={'/inicio'} />} />
    </Routes>
  )
}
