import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import perfilHombre from '../assets/perfilHombre.webp'
import perfilMujer from '../assets/perfilMujer.webp'
import { tiempoTranscurrido } from '../helpers/formatearFecha'
import { useAuth } from '../../auth/hooks/useAuth'
import { usePosts } from '../hooks/usePosts'
import { ToggleSeguir } from './ToggleSeguir'

export const Posts = ({ publicacion }) => {
  const [yaLike, setYaLike] = useState(false)
  const [yaDisLike, setYaDisLike] = useState(false)
  const navigate = useNavigate()
  const {
    descripcion,
    createdAt,
    updatedAt,
    _id,
    like,
    disLike,
    creador,
    comentarios,
  } = publicacion
  const { nombre, genero, _id: idCreador } = publicacion.creador
  const {
    aumentarLikes,
    aumentarDisLikes,
    restarLikes,
    restarDisLikes,
    handleModalEditarPost,
    handleModalEliminarPost,
    loading,
  } = usePosts()

  const { auth } = useAuth()

  useEffect(() => {
    if (like.includes(auth._id)) {
      setYaLike(true)
    }
    if (disLike.includes(auth._id)) {
      setYaDisLike(true)
    }
  }, [])

  const handleLike = () => {
    if (yaLike) {
      restarLikes(_id)
      setYaLike(false)
    } else {
      aumentarLikes(_id)
      setYaLike(true)
      setYaDisLike(false)
    }
  }
  const handleDisLike = () => {
    if (yaDisLike) {
      restarDisLikes(_id)
      setYaDisLike(false)
    } else {
      aumentarDisLikes(_id)
      setYaDisLike(true)
      setYaLike(false)
    }
  }

  const fecha = () => {
    const fechaPost = new Date(createdAt)
    const fechaActual = new Date(Date.now())

    const { dias, horas, minutos, segundos } = tiempoTranscurrido(
      fechaPost,
      fechaActual
    )

    return {
      dias,
      horas,
      minutos,
      segundos,
    }
  }

  const { dias, horas, minutos, segundos } = fecha()

  const handleComentarios = () => {
    navigate(`/post/${publicacion._id}`)
  }

  return (
    <div className=' w-full  sm:w-10/12 2md:w-8/12 lg:w-6/12 xl:w-6/12   2xl:w-6/12 bg-gris-oscuro mx-auto pt-5 px-5 pb-2 md:rounded-md text-white mb-7 first-of-type:mb-0  md:mb-10  shadow-md shadow-slate-500'>
      <div className='flex gap-2 justify-between items-center '>
        <div className='flex gap-7 items-center'>
          <div className='flex gap-2 items-center'>
            {genero === 'F' ? (
              <img
                src={perfilMujer}
                alt='Imagen perfil'
                className='w-10 rounded-full '
              />
            ) : (
              <img
                src={perfilHombre}
                alt='Imagen perfil'
                className='w-10 rounded-full '
              />
            )}

            <p
              className='capitalize font-semibold hover:cursor-pointer'
              onClick={() => navigate(`/perfil/${idCreador}`)}
            >
              {nombre}
            </p>
            {auth._id === creador._id && (
              <p className='text-xs font-semibold text-blue'>(Me)</p>
            )}
          </div>
          {auth._id !== creador._id && <ToggleSeguir creador={creador} />}
        </div>
        {createdAt !== updatedAt && <span className='text-xs '>Editado</span>}

        <div className='flex gap-2 items-center '>
          <p className='text-xs font-semibold font-inter'>
            {dias > 0 ? `${dias} d` : ''}
          </p>
          <p className='text-xs font-semibold font-inter'>
            {horas > 0 ? `${horas} h` : ''}
          </p>
          <p className='text-xs font-semibold font-inter'>
            {minutos > 0 && dias < 1 ? `${minutos} m` : ''}
          </p>
          <p className='text-xs font-semibold font-inter'>
            {segundos > 0 && horas < 1 ? `${segundos} s` : ''}
          </p>
        </div>
      </div>

      <p className='mt-2 break-words'>{descripcion}</p>

      <div className='flex  gap-7 mt-3 justify-between border-t border-slate-200 border-opacity-25 pt-1 items-center'>
        <div className='flex gap-4  '>
          <div className='flex items-center gap-2'>
            <button
              className={` ${
                yaLike ? 'bg-blue' : ''
              } border border-gris hover:cursor-pointer px-2 py-0.5  font-bold rounded-lg active:scale-110 active:-rotate-[20deg] transition-all`}
              onClick={handleLike}
              disabled={loading}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 md:w-6 h-5 md:h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z'
                />
              </svg>
            </button>
            <span>{like.length === 0 ? '' : like.length}</span>
          </div>

          <div className='flex items-center gap-2 '>
            <button
              className={` ${
                yaDisLike ? 'bg-blue' : ''
              } border border-gris hover:cursor-pointer px-2 py-0.5 font-bold rounded-lg active:scale-110 active:-rotate-[20deg] transition-all`}
              onClick={handleDisLike}
              disabled={loading}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 md:w-6 h-5 md:h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384'
                />
              </svg>
            </button>
            <span>{disLike.length === 0 ? '' : disLike.length}</span>
          </div>
        </div>

        <div className='flex gap-2 items-center'>
          <span className='font-semibold text-xs'>{comentarios.length}</span>
          <p
            className='text-xs border rounded-md py-0.5 px-1 hover:cursor-pointer'
            onClick={handleComentarios}
          >
            Comentarios
          </p>
        </div>
        {auth._id === publicacion.creador._id && (
          <div className='flex gap-4 xl:gap-3'>
            <button
              className='rounded-lg  py-0.5  px-1 md:py-1 md:px-3 bg-blue md:font-semibold hover:opacity-70'
              title='Editar Post'
              onClick={() => handleModalEditarPost(publicacion)}
              disabled={loading}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                />
              </svg>
            </button>
            <button
              className='rounded-lg  py-0.5 px-1 md:py-1 md:px-3 bg-red-600 md:font-semibold hover:opacity-70'
              title='Eliminar Post'
              onClick={() => handleModalEliminarPost(publicacion._id)}
              disabled={loading}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
