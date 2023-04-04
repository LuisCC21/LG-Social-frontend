import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import clienteAxios from '../../config/clienteAxios'
import { Alerta } from '../../components/Alerta'

export const Registrar = () => {
  const [alerta, setAlerta] = useState({})
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleAlerta = ({ msg, error }) => {
    setAlerta({
      msg,
      error,
    })

    setTimeout(() => {
      setAlerta('')
    }, 3000)
  }

  const onSubmit = async (datos) => {
    if (datos.password !== datos.repetirPassword) {
      return handleAlerta({
        msg: 'Las contraseñas deben de ser iguales',
        error: true,
      })
    }

    // Crear Usuario en la API

    try {
      const { data } = await clienteAxios.post(`/users`, datos)
      handleAlerta({
        msg: data.msg,
        error: false,
      })
    } catch (error) {
      handleAlerta({
        msg: error.response?.data.msg,
        error: true,
      })
    }
  }

  const { msg } = alerta
  return (
    <div className=' mx-auto  w-full sm:w-9/12 md:w-8/12 lg:w-10/12 xl:w-8/12 2xl:w-6/12'>
      <h1 className='text-center text-2xl md:text-3xl font-normal mb-10'>
        Crea tu cuenta en{' '}
        <span className='text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue to-cyan-400 text-white shadow-sm shadow-blue p-1 rounded-md block w-1/2 xl:inline mx-auto mt-2'>
          {' '}
          LG Social
        </span>{' '}
      </h1>
      <form
        className='bg-white shadow rounded-lg px-5 py-1 '
        onSubmit={handleSubmit(onSubmit)}
      >
        {msg && <Alerta alerta={alerta} />}

        <div className='my-5 '>
          <label
            htmlFor='nombre'
            className='uppercase text-gris-oscuro block text-xl font-bold'
          >
            Nombre
          </label>
          <input
            type='text'
            placeholder='Nombre de Usuario'
            id='nombre'
            className={`${
              errors.nombre?.type === 'required' && 'border-red-600 border'
            } w-full mt-3 p-2 border rounded-lg bg-gray-50 outline-none focus:border-blue`}
            {...register('nombre', {
              required: true,
              minLength: 4,
              maxLength: 16,
            })}
          />
          {errors.nombre?.type === 'minLength' && (
            <span className='text-center text-md bg-red-500 text-white font-bold py-1 rounded-md block my-2'>
              El usuario debe de tener min 4 caracteres{' '}
            </span>
          )}
          {errors.nombre?.type === 'maxLength' && (
            <span className='text-center text-md bg-red-500 text-white font-bold py-1 rounded-md block my-2'>
              El usuario no debe mas de 16 caracteres{' '}
            </span>
          )}
        </div>
        <div className='my-5 '>
          <label className='uppercase text-gris-oscuro block text-xl font-bold'>
            Genero
          </label>
          <div
            className={` flex items-center justify-center gap-20 mt-2 ${
              errors.genero?.type === 'required' &&
              ' py-1 rounded-lg border-red-600 border '
            }`}
          >
            <label
              className=' flex items-center gap-2 font-medium border rounded-md p-2 border-pink-600 '
              htmlFor='femenino'
            >
              Femenino{' '}
              <input
                type='radio'
                name='genero'
                id='femenino'
                value={'F'}
                className='border rounded-lg bg-gray-50'
                {...register('genero', { required: true })}
              />
            </label>
            <label
              className=' flex items-center gap-2 font-medium border rounded-md p-2 border-blue '
              htmlFor='masculino'
            >
              Masculino{' '}
              <input
                type='radio'
                name='genero'
                id='masculino'
                value={'M'}
                className='border rounded-lg bg-gray-50'
                {...register('genero', { required: true })}
              />
            </label>
          </div>
        </div>
        <div className='my-5 '>
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
            className={`${
              errors.email?.type === 'required' && 'border-red-600 border'
            } w-full mt-3 p-2 border rounded-lg bg-gray-50 outline-none focus:border-blue`}
            {...register('email', { required: true })}
          />
        </div>
        <div className='my-5 '>
          <label
            htmlFor='password'
            className='uppercase text-gris-oscuro block text-xl font-bold'
          >
            Password
          </label>
          <input
            type='password'
            placeholder='Ingrese Password'
            id='password'
            className={`${
              errors.password?.type === 'required' && 'border-red-600 border'
            } w-full mt-3 p-2 border rounded-lg bg-gray-50 outline-none focus:border-blue`}
            {...register('password', { required: true, minLength: 8 })}
          />
          {errors.password?.type === 'minLength' && (
            <span className='text-center text-md bg-red-500 text-white font-bold py-1 rounded-md block my-2'>
              La contraseña debe de tener min 8 caracteres{' '}
            </span>
          )}
        </div>
        <div className='my-5 '>
          <label
            htmlFor='Repetirpassword'
            className='uppercase text-gris-oscuro block text-xl font-bold'
          >
            Password
          </label>
          <input
            type='password'
            placeholder='Repetir Password'
            id='Repetirpassword'
            className={`${
              errors.repetirPassword?.type === 'required' &&
              'border-red-600 border'
            } w-full mt-3 p-2 border rounded-lg bg-gray-50 outline-none focus:border-blue`}
            {...register('repetirPassword', { required: true })}
          />
        </div>

        <input
          type='submit'
          value={'Crear Cuenta'}
          className='mb-5 text-white uppercase font-bold bg-blue py-2 w-full rounded hover:cursor-pointer hover:bg-opacity-80 transition-colors '
        />
      </form>

      <nav className='md:flex md:justify-between  '>
        <Link
          to={'/'}
          className='text-center block my-5 text-blue uppercase text-xs font-semibold'
        >
          ¿Ya tienes una cuenta? Inicia Sesion
        </Link>
      </nav>
    </div>
  )
}
