import { createContext, useEffect, useState } from 'react'
import clienteAxios from '../../config/clienteAxios'
import { useAuth } from '../../auth/hooks/useAuth'
import io from 'socket.io-client'

let socket

const PostContext = createContext()

const PostProvider = ({ children }) => {
  const [modalPost, setModalPost] = useState(false)
  const [modalPostElimar, setModalPostElimar] = useState(false)
  const [descripcion, setDescripcion] = useState('')
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({})
  const [handleFiltros, setHandleFiltros] = useState('todos')
  const [loading, setLoading] = useState(false)
  const { auth } = useAuth()
  const [postDeleted, setPostDeleted] = useState(false)

  // Conectar Socket
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
  }, [])

  useEffect(() => {
    const getPosts = async () => {
      const token = localStorage.getItem('token')
      if (!token) return
      setLoading(true)

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      try {
        const { data } = await clienteAxios('/posts', config)
        setPosts(data)
      } catch (error) {
        console.log(error.response)
      }

      setLoading(false)
    }
    getPosts()
  }, [auth])

  const createPost = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    setLoading(true)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const { data } = await clienteAxios.post(
        '/posts',
        { descripcion },
        config
      )

      // SCOKET IO
      socket.emit('nueva publicacion', data)
    } catch (error) {
      console.log(error.response)
    }
  }
  const editPost = async () => {
    const token = localStorage.getItem('token')

    if (!token) return
    setLoading(true)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const { data } = await clienteAxios.put(
        `/posts/${post._id}`,
        { descripcion },
        config
      )

      // SOCKET
      socket.emit('editar publicacion', data)
      setPost({})
    } catch (error) {
      console.log(error.response)
    }
  }

  const deletePost = async () => {
    const token = localStorage.getItem('token')

    if (!token) return
    setLoading(true)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      await clienteAxios.delete(`/posts/${post}`, config)

      // SOCKET
      socket.emit('eliminar publicacion', post)

      setPostDeleted(true)
      setTimeout(() => {
        setPostDeleted(false)
      }, 2000)

      setPost({})
    } catch (error) {
      console.log(error.response)
    }
  }

  const handleModalEditarPost = (post) => {
    setPost(post)
    setModalPost(true)
  }
  const handleModalEliminarPost = (id) => {
    setPost(id)
    setModalPostElimar(true)
  }

  const aumentarLikes = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) return
    setLoading(true)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const { data } = await clienteAxios(`/posts/like/${id}`, config)

      // SOCKET io
      socket.emit('dar Like', { data, id })
    } catch (error) {
      console.log(error.response)
    }
  }
  const restarLikes = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) return
    setLoading(true)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const { data } = await clienteAxios(`/posts/restar-like/${id}`, config)

      // SOCKET io
      socket.emit('quitar Like', { data, id })
    } catch (error) {
      console.log(error.response)
    }
  }
  const aumentarDisLikes = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) return
    setLoading(true)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const { data } = await clienteAxios(`/posts/dislike/${id}`, config)

      // SOCKET io
      socket.emit('dar disLike', { data, id })
    } catch (error) {
      console.log(error.response)
    }
  }
  const restarDisLikes = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) return
    setLoading(true)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const { data } = await clienteAxios(`/posts/restar-dislike/${id}`, config)

      // SOCKET io
      socket.emit('quitar disLike', { data, id })
    } catch (error) {
      console.log(error.response)
    }
  }

  // Socket io posts

  const submitPublicacion = (publicacion) => {
    setPosts([...posts, publicacion])
    setLoading(false)

    /* 
        const publicacionRepetida =  posts.some((element)=>element._id === publicacion._id) */ // Para que no reenderize dos posts con mismo id
    /*  if(!publicacionRepetida){ 
           
           
        } */
  }
  const publicacionEliminada = (publicacionEliminada) => {
    const publicacionActualizada = posts.filter(
      (publicacion) => publicacion._id !== publicacionEliminada
    )
    setPosts(publicacionActualizada)
    setLoading(false)
  }
  const publicacionActualizada = (publicacionEditada) => {
    const publicacionActualizada = posts.map((publicacion) =>
      publicacion._id === publicacionEditada._id
        ? publicacionEditada
        : publicacion
    )
    setPosts(publicacionActualizada)
    setLoading(false)
  }

  // Socket io Likes
  const likesAumentados = ({ data, id }) => {
    const publicacionActualizada = posts.map((publicacion) =>
      publicacion._id === id ? data : publicacion
    )
    setPosts(publicacionActualizada)
    setLoading(false)
  }

  const likesDisminuidos = ({ data, id }) => {
    const publicacionActualizada = posts.map((publicacion) =>
      publicacion._id === id ? data : publicacion
    )
    setPosts(publicacionActualizada)
    setLoading(false)
  }
  const disLikesAumentados = ({ data, id }) => {
    const publicacionActualizada = posts.map((publicacion) =>
      publicacion._id === id ? data : publicacion
    )
    setPosts(publicacionActualizada)
    setLoading(false)
  }
  const disLikesDisminuidos = ({ data, id }) => {
    const publicacionActualizada = posts.map((publicacion) =>
      publicacion._id === id ? data : publicacion
    )
    setPosts(publicacionActualizada)
    setLoading(false)
  }

  return (
    <PostContext.Provider
      value={{
        modalPost,
        setModalPost,
        descripcion,
        setDescripcion,
        createPost,
        posts,
        handleFiltros,
        setHandleFiltros,
        aumentarLikes,
        restarLikes,
        aumentarDisLikes,
        restarDisLikes,
        editPost,
        handleModalEditarPost,
        post,
        setPost,
        handleModalEliminarPost,
        modalPostElimar,
        setModalPostElimar,
        deletePost,
        submitPublicacion,
        publicacionEliminada,
        publicacionActualizada,
        likesAumentados,
        likesDisminuidos,
        disLikesAumentados,
        disLikesDisminuidos,
        loading,
        postDeleted,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export { PostProvider }

export default PostContext
