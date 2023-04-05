import { createContext, useEffect, useState } from 'react'
import clienteAxios from '../../config/clienteAxios'
import io from 'socket.io-client'

let socket

const ComentarioContext = createContext()

const ComentarioProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState({})

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
  }, [])

  const addComment = async (datos) => {
    const { id, descripcion } = datos
    const token = localStorage.getItem('token')

    if (!token) return

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    setLoading(true)

    try {
      const { data } = await clienteAxios.post(
        `/comments/${id}`,
        { descripcion },
        config
      )

      // SOCKET
      socket.emit('nuevo comentario', data)
    } catch (error) {
      console.log(error.response)
    }
  }

  const deleteComment = async (id) => {
    setLoading(true)
    const token = localStorage.getItem('token')

    if (!token) return

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      await clienteAxios.delete(`/comments/${id}`, config)

      socket.emit('eliminar comentario', { id, idPublicacion: post._id })
    } catch (error) {
      console.log(error.response)
    }
  }

  const getPost = async (id) => {
    const token = localStorage.getItem('token')

    if (!token) return
    setLoading(true)

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const { data } = await clienteAxios(`/posts/${id}`, config)
      setPost(data)
    } catch (error) {
      console.log(error.response)
    }
    setLoading(false)
  }

  // Socket io

  const submitComentario = (comment) => {
    if (Object.keys(post).length === 0) return

    const publicacionActializada = { ...post }
    publicacionActializada.comentarios = [
      ...publicacionActializada?.comentarios,
      comment,
    ]
    setPost(publicacionActializada)

    setLoading(false)
  }

  const comentarioEliminado = (idcomment) => {
    const comentarioActualizado = post.comentarios?.filter(
      (comment) => comment._id !== idcomment
    )
    setPost({ ...post, comentarios: comentarioActualizado })
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }
  return (
    <ComentarioContext.Provider
      value={{
        addComment,
        deleteComment,
        loading,
        getPost,
        post,
        submitComentario,
        comentarioEliminado,
      }}
    >
      {children}
    </ComentarioContext.Provider>
  )
}

export { ComentarioProvider }

export default ComentarioContext
