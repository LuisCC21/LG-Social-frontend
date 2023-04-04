import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../../config/clienteAxios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [followedUser, setfollowedUser] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setAuth({})
        setLoading(false)

        return
      }

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      try {
        const { data } = await clienteAxios('/users/perfil', config)
        setAuth(data)
        /* navigate('/') */
      } catch (error) {
        console.log(error.message)
        setAuth({})
        navigate('/auth')
      }
      setLoading(false)
    }

    autenticarUsuario()
  }, [])

  useEffect(() => {
    const listUsers = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      try {
        const { data } = await clienteAxios('/users/list-users', config)
        setUsers(data)
      } catch (error) {
        console.log(error.response)
      }
    }
    listUsers()
  }, [auth])

  const followUser = async (id) => {
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
      await clienteAxios.post('/users/follow-user', { id }, config)

      const usuarioAuthActualizado = { ...auth }
      usuarioAuthActualizado.seguidos = [
        ...usuarioAuthActualizado?.seguidos,
        id,
      ]
      setAuth(usuarioAuthActualizado)
      setfollowedUser('followed')

      setTimeout(() => {
        setfollowedUser('')
      }, 1500)
    } catch (error) {
      console.log(error.message)
    }
    setLoading(false)
  }
  const unfollowUser = async (id) => {
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
      await clienteAxios.post('/users/unfollow-user', { id }, config)

      const usuarioAuthActualizado = { ...auth }
      usuarioAuthActualizado.seguidos =
        usuarioAuthActualizado?.seguidos?.filter((usuario) => usuario !== id)
      setAuth(usuarioAuthActualizado)
      setfollowedUser('unFollowed')

      setTimeout(() => {
        setfollowedUser('')
      }, 1500)
    } catch (error) {
      console.log(error.message)
    }
    setLoading(false)
  }

  const logOut = () => {
    navigate('/')
    localStorage.removeItem('token')
    setAuth({})
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        setAuth,
        followUser,
        unfollowUser,
        users,
        setUsers,
        logOut,
        followedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }

export default AuthContext
