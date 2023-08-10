import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <>
      <div className=' text-center p-5 md:p-6  bg-gradient-to-r from-blue to-cyan-400 '>
        <h1 className='  text-blanco text-6xl font-inter font-bold  '>
          LG Social
        </h1>
      </div>
      <p className='text-center mt-3 text-sm font-bold text-blue'>
        Si es tu primera peticion, espera minimo 2 minutos despues de la
        peticion a que el backend quite su modo descanso.
      </p>
      <main className='container mx-auto mt-5 md:mt-15 2xl:mt-20  md:flex md:justify-center '>
        <div className='w-full p-3 flex  items-center flex-col lg:flex-row gap-10 lg:w-9/12'>
          <Outlet />
        </div>
      </main>
    </>
  )
}
