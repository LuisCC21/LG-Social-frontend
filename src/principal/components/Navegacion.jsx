import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import { Busqueda } from './Busqueda'

export const Navegacion = () => {
  const { logOut } = useAuth()

  return (
    <div className='pt-2 pb-4 flex flex-col  gap-2  sm:p-5 bg-blue mb-4 text-white md:rounded-br-md md:rounded-bl-md sm:flex-row sm:justify-evenly md:justify-evenly items-center'>
      <div>
        <Link to='/inicio' className='font-black text-2xl color-white '>
          LG Social
        </Link>
      </div>

      <Busqueda />
      <div className='flex justify-between gap-10 md:gap-12 xl:gap-16'>
        <Link to='/inicio' className='border rounded py-1 px-3 font-bold '>
          Inicio
        </Link>

        <button
          className='px-4 py-1 rounded bg-gris-oscuro hover:bg-black transition-colors text-red-600 font-bold '
          onClick={logOut}
        >
          Salir
        </button>
      </div>
    </div>
  )
}
