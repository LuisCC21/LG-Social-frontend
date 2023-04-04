import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'

export const Busqueda = () => {
  const [search, setSearch] = useState('')
  const { auth } = useAuth()
  const [resultSearch, setresultSearch] = useState([])
  const { users } = useAuth()

  useEffect(() => {
    const filterUser = users.filter((user) => {
      if (search.length === 0 || search.trim().length === 0) return

      return user.nombre
        .toLowerCase()
        .trim()
        .includes(search.toLocaleLowerCase().trim())
    })
    const result = filterUser.map((user) => {
      if (user.nombre === auth.nombre) {
        return { ...user, nombre: user.nombre.concat(' (me)') }
      } else {
        return user
      }
    })

    setresultSearch(result)
  }, [search])

  return (
    <div className='flex flex-col md:w-3/12'>
      <input
        type='text'
        className='text-black p-1 rounded-lg'
        placeholder='Buscar Usuario'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {(resultSearch.length > 0 || search.trim().length > 0) && (
        <div className='absolute top-[84px] md:top-14 w-52  border  rounded-lg bg-gris-oscuro '>
          <ul>
            {resultSearch.length === 0 ? (
              <li className='hover:bg-slate-600 hover:rounded-md capitalize block  text-sm'>
                No hay resultados
              </li>
            ) : (
              resultSearch.map((user) => (
                <Link
                  to={`/perfil/${user._id}`}
                  key={user._id}
                  className='hover:bg-slate-600 hover:rounded-md capitalize block'
                  onClick={() => setSearch('')}
                >
                  {user.nombre}
                </Link>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
