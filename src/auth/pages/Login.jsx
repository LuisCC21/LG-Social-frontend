import { Link, useNavigate, redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import clienteAxios from '../../config/clienteAxios'
import { useEffect, useState } from 'react'
import { Alerta } from '../../components/Alerta'
import { useAuth } from '../hooks/useAuth'

export const Login = () => {
  const [alerta, setAlerta] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setAuth, auth } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    auth?._id && redirect('/inicio')
  }, [auth])

  const onSubmit = async (datos) => {
    const { email, password } = datos

    try {
      setLoading(true)
      const { data } = await clienteAxios.post('/users/login', {
        email,
        password,
      })
      localStorage.setItem('token', data.token)
      delete data.token
      setAuth(data)
      navigate('/inicio', { replace: true })
    } catch (error) {
      setAlerta({
        msg: error.response?.data.msg,
        error: true,
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className='w-full lg:w-[30rem] '>
        <h3 className='font-semibold mb-2 text-center text-xl'>
          Conectate a <span className='text-blue'>LG Social</span>{' '}
        </h3>
        <p className='text-sm lg:text-lg text-center'>
          En LG Social podrás publicar lo que sea que tú pienses, sin
          restricción alguna.
        </p>
      </div>
      <div className='w-full md:w-[35rem] lg:w-[40rem]'>
        <form
          className='bg-white shadow rounded-lg p-10'
          onSubmit={handleSubmit(onSubmit)}
        >
          {Object.keys(errors).length > 0 && (
            <span className='text-center text-xl bg-red-500 text-white font-bold p-2 rounded-md block'>
              Todos los campos son obligatorios
            </span>
          )}
          {alerta.msg && <Alerta alerta={alerta} />}
          <div className='my-5'>
            <label
              htmlFor='email'
              className='uppercase text-gris-oscuro block text-xl font-bold'
            >
              Email
            </label>
            <input
              type='email'
              placeholder='Email de Registro'
              id='email'
              className='w-full mt-3 p-3 rounded-lg bg-gray-50 border   outline-none focus:border-blue'
              {...register('email', { required: true })}
            />
          </div>
          <div className='my-5 '>
            <label
              htmlFor='password'
              className='uppercase text-gris-oscuro block text-xl font-bold '
            >
              Password
            </label>
            <input
              type='password'
              placeholder='Ingrese Password'
              id='password'
              className='w-full mt-3 p-3 border rounded-lg bg-gray-50 outline-none focus:border-blue'
              {...register('password', { required: true })}
            />
          </div>

          <input
            type='submit'
            value={`${loading ? 'Inciando...' : 'Iniciar Sesion'}`}
            disabled={loading}
            className={`${
              loading && 'bg-opacity-50'
            } mb-5 text-white uppercase bg-blue font-bold  py-3 w-full rounded hover:cursor-pointer hover:bg-opacity-90 transition-colors `}
          />
        </form>

        <nav className='md:flex md:justify-between  '>
          <Link
            to={'registrar'}
            className='text-center block my-5 text-blue uppercase text-xs font-semibold'
          >
            ¿No tienes una cuenta? Registrate
          </Link>
          <Link
            to={'olvide-password'}
            className='text-center block my-5  text-blue uppercase text-xs font-semibold'
          >
            Olvide mi Password
          </Link>
        </nav>
      </div>
    </>
  )
}
