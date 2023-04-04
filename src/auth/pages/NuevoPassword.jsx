import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import clienteAxios from '../../config/clienteAxios'
import { useEffect, useState } from 'react'
import { Alerta } from '../../components/Alerta'

export const NuevoPassword = () => {
  const [alerta, setAlerta] = useState({})
  const [tokenConfirmado, setTokenConfirmado] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)
  const { token } = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const { data } = await clienteAxios(`/users/olvide-password/${token}`)
        setAlerta({
          msg: data.msg,
          error: false,
        })
        setTokenConfirmado(true)
        setTimeout(() => {
          setAlerta({})
        }, 1000)
      } catch (error) {
        setTokenConfirmado(false)
        setAlerta({
          msg: error.response?.data.msg,
          error: true,
        })
      }
    }
    comprobarToken()
  }, [])

  const onSubmit = async (datos) => {
    const { password } = datos

    try {
      const { data } = await clienteAxios.post(
        `/users/olvide-password/${token}`,
        { password }
      )
      setAlerta({
        msg: data.msg,
        error: false,
      })
      setPasswordModificado(true)

      setTimeout(() => {
        setAlerta({})
      }, 4000)
    } catch (error) {
      setAlerta({
        msg: error.response?.data.msg,
        error: true,
      })
      setPasswordModificado(false)
      setTimeout(() => {
        setAlerta({})
      }, 6000)
    }
  }
  return (
    <div className='w-full  md:w-8/12 lg:w-10/12  xl:w-7/12 mx-auto'>
      <h1 className='text-center text-2xl md:text-3xl font-normal px-2'>
        Reestablece tu password en{' '}
        <span className='text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue to-cyan-400 text-white shadow-sm shadow-blue p-1 rounded-md block w-1/2 2xl:inline mx-auto my-3'>
          {' '}
          LG Social
        </span>{' '}
      </h1>

      <form
        className='bg-white shadow rounded-lg p-10 w-full'
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors?.password?.type === 'minLength' && (
          <span className='text-center text-xl bg-red-500 text-white font-bold p-2 rounded-md block '>
            La contraseña tiene que tener minimo 8 caracterres
          </span>
        )}

        {alerta.msg && <Alerta alerta={alerta} />}

        {tokenConfirmado && (
          <>
            <div className='my-5 '>
              <label
                htmlFor='password'
                className='uppercase text-gris-oscuro block text-xl font-bold'
              >
                Nuevo Password
              </label>
              <input
                type='password'
                placeholder='Nuevo Password'
                id='password'
                className={`${
                  errors.password?.type === 'required' &&
                  'border-red-600 border'
                } w-full mt-3 p-3 border rounded-lg bg-gray-50 outline-none focus:border-blue`}
                {...register('password', { required: true, minLength: 8 })}
              />
            </div>

            <input
              type='submit'
              value={'Reestablecer Password'}
              className='mb-5 text-white uppercase font-bold bg-blue py-3 w-full rounded hover:cursor-pointer hover:bg-opacity-80 transition-colors '
            />
          </>
        )}

        {passwordModificado && (
          <Link
            to={'/'}
            className='text-center block my-5 text-sky-500 uppercase text-xl font-bold mt-10  '
          >
            Inicia Sesion
          </Link>
        )}
      </form>
    </div>
  )
}
