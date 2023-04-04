import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { useComentarios } from '../hooks/useComentarios'

export const Comentarios = ({ comentario }) => {
  const { deleteComment, loading, post } = useComentarios()
  const { auth } = useAuth()

  const navigate = useNavigate()
  const { creador } = comentario

  return (
    <div
      className=' bg-slate-100 border rounded-lg w-2/3 mb-1 px-1 py-0.5 ml-6 break-words'
      key={comentario._id}
    >
      <div
        className={`flex justify-between items-center ${
          auth._id === creador._id && 'flex-row-reverse'
        }`}
      >
        <span
          className={`${
            auth._id === creador._id ? 'text-blue' : 'text-black'
          } font-bold hover:cursor-pointer  `}
          onClick={() => navigate(`/perfil/${creador._id}`)}
        >
          {creador.nombre}
        </span>
        {(auth._id === creador._id || auth._id === post.creador._id) && (
          <div>
            <button
              className='text-sm text-red-700 hover:text-white hover:bg-red-500 hover:rounded-lg hover:px-1 hover:py-0'
              disabled={loading}
              onClick={() => deleteComment(comentario._id)}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
      <div>
        <p
          className={`text-sm font-semibold text-slate-700 ${
            auth._id === creador._id && 'text-right'
          }`}
        >
          {comentario.descripcion}
        </p>
      </div>
    </div>
  )
}
