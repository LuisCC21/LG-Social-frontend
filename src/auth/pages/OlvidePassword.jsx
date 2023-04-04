import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import clienteAxios from '../../config/clienteAxios'
import { useState } from 'react'
import { Alerta } from '../../components/Alerta'

export const OlvidePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [alerta, setAlerta] = useState({})

  const onSubmit = async (datos) => {
    const { email } = datos
    try {
      const { data } = await clienteAxios.post('/users/recuperar-password', {
        email,
      })
      setAlerta({
        msg: data.msg,
        error: false,
      })
    } catch (error) {
      setAlerta({
        msg: error.response?.data.msg,
        error: false,
      })
    }
  }
  return (
    <div className='mx-auto w-full sm:w-10/12 md:w-9/12 lg:w-8/12 2xl:w-7/12'>
      <h1 className='text-center text-2xl md:text-4xl font-normal mb-7'>
        Recupera tu cuenta de{' '}
        <span className='text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue to-cyan-400 text-white shadow-sm shadow-blue p-1 rounded-md block w-1/2 xl:inline mx-auto mt-2'>
          {' '}
          LG Social
        </span>{' '}
      </h1>

      <form
        className='bg-white shadow rounded-lg p-1 sm:p-10'
        onSubmit={handleSubmit(onSubmit)}
      >
        {Object.keys(errors).length > 0 && (
          <span className='text-center text-xl bg-red-500 text-white font-bold p-2 rounded-md block'>
            El correo es obligatorio
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
            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
            {...register('email', { required: true })}
          />
        </div>

        <input
          type='submit'
          value={'Enviar Email'}
          className='mb-5 text-white uppercase font-bold bg-blue py-3 w-full rounded hover:cursor-pointer hover:bg-opacity-80 transition-colors '
        />
      </form>

      <nav className='text-center '>
        <Link
          to={'/registrar'}
          className='text-center block my-5  text-blue uppercase text-xs font-semibold'
        >
          ¿No tienes una cuenta? Registrate
        </Link>
      </nav>
    </div>
  )
}
