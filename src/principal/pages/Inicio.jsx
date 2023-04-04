import { Posts } from '../components/Posts'
import img from '../assets/perfilHombre.webp'
import {
  ModalPost,
  SkeletonPosts,
  ListBox,
  ModalEliminarPost,
} from '../components'
import { usePosts } from '../hooks/usePosts'
import { useAuth } from '../../auth/hooks/useAuth'
import { PrincipalLayout } from '../layouts/PrincipalLayout'
import io from 'socket.io-client'
import { useEffect } from 'react'

let socket

export const Inicio = () => {
  const {
    setModalPost,
    descripcion,
    posts,
    handleFiltros,
    submitPublicacion,
    publicacionEliminada,
    publicacionActualizada,
    likesAumentados,
    likesDisminuidos,
    disLikesAumentados,
    disLikesDisminuidos,
    loading,
  } = usePosts()
  const { auth } = useAuth()
  const skeletonArray = [1, 2, 3, 4]

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
      extraHeaders: {
        'Access-Control-Allow-Origin': '*',
      },
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    // socket io Publicaciones
    socket.on('publicacion agregada', (publicacion) => {
      submitPublicacion(publicacion)
    })
    socket.on('publicacion eliminada', (publicacion) => {
      publicacionEliminada(publicacion)
    })
    socket.on('publicacion actualizada', (publicacion) => {
      publicacionActualizada(publicacion)
    })
    // socket io Likes
    socket.on('likes aumentados', ({ data, id }) => {
      likesAumentados({ data, id })
    })
    socket.on('likes disminuidos', ({ data, id }) => {
      likesDisminuidos({ data, id })
    })
    socket.on('disLikes aumentados', ({ data, id }) => {
      disLikesAumentados({ data, id })
    })
    socket.on('disLikes disminuidos', ({ data, id }) => {
      disLikesDisminuidos({ data, id })
    })

    return () => {
      socket.off('publicacion agregada')
      socket.off('publicacion eliminada')
      socket.off('publicacion actualizada')
      socket.off('likes aumentados')
      socket.off('likes disminuidos')
      socket.off('disLikes aumentados')
      socket.off('disLikes disminuidos')
    }
  })

  return (
    <PrincipalLayout>
      <div className=' w-full sm:w-5/6 md:w-5/6 lg:w-full xl:w-11/12 2xl:w-9/12 mx-auto '>
        <p className='font-bold lg:fixed text-lg xl:left-36 md:text-1xl 2xl:left-52 3xl:left-72  mb-5 ml-3  xl:mb-0 xl:text-left'>
          Hola,{' '}
          <span className='text-xl md:text-xl text-blue'>
            {auth.nombre?.split(' ')[0]}
          </span>{' '}
        </p>

        <div className=' flex justify-center items-center mb-10 gap-2   '>
          <img
            src={img}
            alt='Imagen perfil'
            className='w-14 rounded-full inline '
          />
          <form>
            <textarea
              name='post'
              cols='50'
              rows='1'
              placeholder={`¿Que estas pensando, ${
                auth.nombre?.split(' ')[0]
              }?`}
              maxLength={250}
              onClick={() => setModalPost(true)}
              value={descripcion}
              readOnly
              className='w-full bg-gris-oscuro p-3 rounded-md text-white  overflow-hidden resize-none'
            ></textarea>
          </form>
          <ModalPost />
          <ModalEliminarPost />
        </div>

        <div className='lg:fixed 2xl:left-52 3xl:left-72 '>
          <ListBox />
        </div>
        <h3 className='text-center mb-8 md:mb-12   text-3xl xl:text-4xl text-blue'>
          Publicaciones
        </h3>
        {Object.keys(posts).length === 0 && loading ? (
          skeletonArray.map((array) => (
            <div className='mb-12' key={array}>
              <SkeletonPosts />
            </div>
          ))
        ) : (
          <div className='flex flex-col-reverse  '>
            {handleFiltros === 'todos' &&
              posts.map((post) => <Posts publicacion={post} key={post._id} />)}

            {handleFiltros === 'propios' &&
              posts.map(
                (post) =>
                  post.creador._id === auth._id && (
                    <Posts publicacion={post} key={post._id} />
                  )
              )}
            {handleFiltros === 'seguidos' &&
              posts.map(
                (post) =>
                  auth.seguidos?.includes(post.creador._id) && (
                    <Posts publicacion={post} key={post._id} />
                  )
              )}
          </div>
        )}
      </div>
    </PrincipalLayout>
  )
}
