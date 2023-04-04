import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import { Comentarios, PostComentarios } from '../components'
import { useComentarios } from '../hooks/useComentarios'
import { usePosts } from '../hooks/usePosts'
import { PrincipalLayout } from '../layouts/PrincipalLayout'
import { SkeletonPost } from '../components/SkeletonPost'

let socket

export const Publicacion = () => {
  const [descripcion, setDescripcion] = useState('')
  const { id } = useParams()

  const {
    addComment,
    loading,
    post,
    getPost,
    submitComentario,
    comentarioEliminado,
  } = useComentarios()
  const { posts } = usePosts() // Para renderizar las reacciones del Posts

  useEffect(() => {
    getPost(id)
  }, [id, posts])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
      extraHeaders: {
        'Access-Control-Allow-Origin': '*',
      },
    })
    socket.emit('abrir publicacion', id)

    return () => {
      socket.off('abrir publicacion', id)
    }
  }, [])

  useEffect(() => {
    socket.on('comentario agregado', (comentario) => {
      if (comentario.publicacion === id) {
        submitComentario(comentario)
      }
    })
    socket.on('comentario eliminado', (datos) => {
      if (datos.idPublicacion === id) {
        comentarioEliminado(datos.id)
      }
    })

    return () => {
      socket.off('comentario agregado')
      socket.off('comentario eliminado')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!descripcion) return
    addComment({ descripcion, id })

    setDescripcion('')
  }

  return (
    <PrincipalLayout>
      {!post?._id && loading ? (
        <SkeletonPost />
      ) : (
        <>
          <div className='mt-10'>
            <PostComentarios post={post} />
          </div>
          <h3 className='text-center mt-1 mb-3 text-blue font-semibold'>
            Comentarios
          </h3>
          <div className='w-full max-h-[28rem] sm:max-h-[30rem]   sm:w-3/5 md:w-7/12 lg:w-5/12 mx-auto border pt-1 overflow-auto  '>
            {!post?.comentarios && (
              <p className='text-center text-sm font-semibold my-2'>
                No hay comentarios
              </p>
            )}

            {post?.comentarios?.map((comentario) => (
              <Comentarios comentario={comentario} key={comentario._id} />
            ))}

            <form className='sticky bottom-0 flex gap-1 mr-2 sm:mr-0  '>
              <input
                type='text'
                className='w-10/12 h-10 border-t border-r border-slate-300 px-1 '
                placeholder='Agregar Comentario'
                maxLength={120}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <input
                type='submit'
                value={'Publicar'}
                className='text-blue hover:cursor-pointer active:border'
                onClick={handleSubmit}
                disabled={loading}
              />
            </form>
          </div>
        </>
      )}
    </PrincipalLayout>
  )
}
