import { useContext } from 'react'
import ComentarioContext from '../context/ComentariosProvider'

export const useComentarios = () => {
  return useContext(ComentarioContext)
}
