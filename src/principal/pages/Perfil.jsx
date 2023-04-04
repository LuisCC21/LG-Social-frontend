import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import clienteAxios from '../../config/clienteAxios'
import perfilHombre from '../assets/perfilHombre.webp'
import perfilMujer from '../assets/perfilMujer.webp'
import {
  ToggleSeguir,
  PostsPerfil,
  ModalEliminarPost,
  SkeletonPosts,
  ModalPost,
} from '../components'
import { useAuth } from '../../auth/hooks/useAuth'
import { usePosts } from '../hooks/usePosts'
import { formatearFecha } from '../helpers/formatearFecha'
import { PrincipalLayout } from '../layouts/PrincipalLayout'

import io from 'socket.io-client'

let socket

export const Perfil = () => {
  const [user, setUser] = useState({})
  const { id } = useParams()
  const {
    posts,
    loading,
    publicacionEliminada,
    publicacionActualizada,
    submitPublicacion,
  } = usePosts()
  const { auth } = useAuth()
  const { nombre, genero, _id, createdAt } = user
  const skeletonArray = [1, 2, 3, 4]
  // Conexion Socket
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
    const getUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      try {
        const { data } = await clienteAxios(`/users/get-user/${id}`, config)
        setUser(data)
      } catch (error) {
        console.log(error.response)
      }
    }
    getUser()
  }, [id, auth])

  // socket io Publicaciones
  useEffect(() => {
    socket.on('publicacion agregada', (publicacion) => {
      submitPublicacion(publicacion)
    })
    socket.on('publicacion eliminada', (publicacion) => {
      publicacionEliminada(publicacion)
    })
    socket.on('publicacion actualizada', (publicacion) => {
      publicacionActualizada(publicacion)
    })
  })

  return (
    <PrincipalLayout>
      <ModalPost />
      <ModalEliminarPost />

      <main className='bg-fondo sm:w-2/2  lg:max-w-5xl xl:max-w-6xl 2xl:max-w-5xl md:max-w-xl sm:max-w-lg sm:mx-auto min-h-screen md:p-10'>
        <p className='text-center text-sm mb-1'>
          Se unio a <span className='text-blue font-semibold'>LGSocial</span> el{' '}
          <span className='font-semibold'>
            {Object.keys(user).length > 0 && formatearFecha(createdAt)}
          </span>{' '}
        </p>
        <div className='flex  items-center gap-5 md:gap-0 md:justify-around mb-8 md:mb-15'>
          <div className='flex gap-5 sm:gap-10 items-center '>
            <img
              src={genero === 'F' ? perfilMujer : perfilHombre}
              alt='imagen perfil'
              className='w-32 '
            />
            <p className='font-bold capitalize'>{nombre}</p>
          </div>

          <div>{auth._id !== _id && <ToggleSeguir creador={user} />}</div>
          <div>
            <p className='text-sm text-blue font-semibold'>
              <span className='align-baseline mr-4 text-black'>
                {auth.seguidos?.length}
              </span>{' '}
              Seguidores
            </p>
          </div>
        </div>
        <h3 className='text-center mb-5 text-lg text-blue '>Publicaciones</h3>
        {Object.keys(posts).length === 0 && loading ? (
          skeletonArray.map((array) => (
            <div className='mb-12' key={array}>
              <SkeletonPosts />
            </div>
          ))
        ) : (
          <div className='flex flex-col-reverse'>
            {auth.seguidos?.includes(_id) && // Muestra publicaciones del usuario buscado
              posts.map((publicacion) => {
                return (
                  publicacion.creador._id === _id && (
                    <PostsPerfil
                      key={publicacion._id}
                      publicacion={publicacion}
                    />
                  )
                )
              })}

            {auth._id === _id && // Muestra publicaciones del usuario buscado cuando es el mismo autenticado
              posts.map((publicacion) => {
                return (
                  publicacion.creador._id === auth._id && (
                    <PostsPerfil
                      key={publicacion._id}
                      publicacion={publicacion}
                    />
                  )
                )
              })}

            {auth.seguidos?.includes(_id) === false && auth._id !== _id && (
              <p className='text-center mt-10 font-semibold'>
                Para ver las publicaciones de este pefil, debes de seguirlo.
              </p>
            )}
          </div>
        )}
      </main>
    </PrincipalLayout>
  )
}
