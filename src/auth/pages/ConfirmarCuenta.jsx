import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alerta } from '../../components/Alerta'
import clienteAxios from '../../config/clienteAxios'

export const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const confirmarUsuario = async () => {
      try {
        const { data } = await clienteAxios(`/users/confirmar/${id}`)
        setAlerta({
          msg: data.msg,
          error: false,
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response?.data.msg,
          error: true,
        })
        setCuentaConfirmada(false)
        /* setCuentaConfirmada(false) */
      }
    }
    confirmarUsuario()
  }, [])

  const { msg } = alerta

  return (
    <div className='w-full  md:w-8/12 lg:w-10/12  xl:w-7/12 mx-auto'>
      <h1 className='text-center text-2xl md:text-4xl font-normal'>
        Confirma tu cuenta en{' '}
        <span className='text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue to-cyan-400 text-white shadow-sm shadow-blue p-1 rounded-md block w-1/2 xl:inline mx-auto mt-2'>
          {' '}
          LG Social
        </span>{' '}
      </h1>

      <div className='text-center mt-10 '>
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            to={'/'}
            className='text-center block mt-10 text-blue uppercase text-lg'
          >
            {' '}
            Iniciar Sesion
          </Link>
        )}
      </div>
    </div>
  )
}
